'use strict';

let arrayObjNoProto = [];

arrayObjNoProto = new Proxy(arrayObjNoProto, {
    set(target, prop, value) {

        if (typeof value !== 'object' || Object.getPrototypeOf(value)) {
            console.warn(`There is no way to add non-object type data
                               or object with prototype to an array.`);

            return {
                errDescription: `There is no way to add non-object type data
                                 or object with prototype to an array..`,
            };
        }

        target[prop] = JSON.stringify(value);
        return true;
    }
})

console.log(arrayObjNoProto);

arrayObjNoProto.push(
    {
        name: `Oneplus 8 Pro`,
        processor: `Snapdragon 865`
    }
);

arrayObjNoProto.push(Object.create(null));
arrayObjNoProto.push(Object.create(null));
arrayObjNoProto.push(Object.create(null));

arrayObjNoProto.push({});
arrayObjNoProto.push(Object.create({}));
arrayObjNoProto.push(52);
arrayObjNoProto.push([0, 1, 2]);

console.log(arrayObjNoProto[0]);
console.log(arrayObjNoProto);


