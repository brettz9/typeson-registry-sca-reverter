import sparseUndefined from 'typeson-registry/dist/presets/sparse-undefined';

const newTypeNamesToLegacy = {
    IntlCollator: 'Intl.Collator',
    IntlDateTimeFormat: 'Intl.DateTimeFormat',
    IntlNumberFormat: 'Intl.NumberFormat',
    userObject: 'userObjects',
    undef: 'undefined',
    negativeInfinity: 'NegativeInfinity',
    nonbuiltinIgnore: 'nonBuiltInIgnore',
    arraybuffer: 'ArrayBuffer',
    blob: 'Blob',
    dataview: 'DataView',
    date: 'Date',
    error: 'Error',
    file: 'File',
    filelist: 'FileList',
    imagebitmap: 'ImageBitmap',
    imagedata: 'ImageData',
    infinity: 'Infinity',
    map: 'Map',
    nan: 'NaN',
    regexp: 'RegExp',
    set: 'Set',
    int8array: 'Int8Array',
    uint8array: 'Uint8Array',
    uint8clampedarray: 'Uint8ClampedArray',
    int16array: 'Int16Array',
    uint16array: 'Uint16Array',
    int32array: 'Int32Array',
    uint32array: 'Uint32Array',
    float32array: 'Float32Array',
    float64array: 'Float64Array'
};

export const typesonRegistrySCAReverter = function traverseMapToRevertToLegacyTypeNames (obj) {
    if (Array.isArray(obj)) {
        // Structured Cloning and Builtins had been using `sparseUndefined`
        //   previously (through the `undef` preset) instead of
        //   `arrayNonindexKeys`.
        obj.some((type, i) => {
            if ('arrayNonindexKeys' in type) {
                const j = i + 1;
                const nextObject = obj[j];
                if (nextObject && typeof nextObject === 'object' &&
                    'sparseUndefined' in nextObject
                ) {
                    // Remove `sparseUndefined` if also present
                    //   (latest version has both), so we can
                    //   add back with full preset in next step
                    obj.splice(j, 1);
                }
                obj.splice(i, 1, ...sparseUndefined);
                return true;
            }
            return false;
        });
        return obj.forEach(traverseMapToRevertToLegacyTypeNames);
    }
    if (obj && typeof obj === 'object') { // Should be all
        Object.entries(obj).forEach(([prop, val]) => {
            if (prop in newTypeNamesToLegacy) {
                const legacyProp = newTypeNamesToLegacy[prop];
                delete obj[prop];
                obj[legacyProp] = val;
            }
        });
    }
};
