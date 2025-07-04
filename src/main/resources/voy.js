let wasm;
export function __wbg_set_wasm(val) {
    wasm = val;
}


const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let WASM_VECTOR_LEN = 0;

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

const lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length) >>> 0;
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len) >>> 0;

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3) >>> 0;
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

let cachedFloat32Memory0 = null;

function getFloat32Memory0() {
    if (cachedFloat32Memory0 === null || cachedFloat32Memory0.byteLength === 0) {
        cachedFloat32Memory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachedFloat32Memory0;
}

function passArrayF32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4) >>> 0;
    getFloat32Memory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}
/**
* @param {Resource} resource
* @returns {string}
*/
export function index(resource) {
    let deferred1_0;
    let deferred1_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.index(retptr, addHeapObject(resource));
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        deferred1_0 = r0;
        deferred1_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_free(deferred1_0, deferred1_1);
    }
}

/**
* @param {string} index
* @param {Float32Array} query
* @param {number} k
* @returns {SearchResult}
*/
export function search(index, query, k) {
    const ptr0 = passStringToWasm0(index, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passArrayF32ToWasm0(query, wasm.__wbindgen_malloc);
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.search(ptr0, len0, ptr1, len1, k);
    return takeObject(ret);
}

/**
* @param {string} index
* @param {Resource} resource
* @returns {string}
*/
export function add(index, resource) {
    let deferred2_0;
    let deferred2_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(index, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.add(retptr, ptr0, len0, addHeapObject(resource));
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        deferred2_0 = r0;
        deferred2_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_free(deferred2_0, deferred2_1);
    }
}

/**
* @param {string} index
* @param {Resource} resource
* @returns {string}
*/
export function remove(index, resource) {
    let deferred2_0;
    let deferred2_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(index, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.remove(retptr, ptr0, len0, addHeapObject(resource));
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        deferred2_0 = r0;
        deferred2_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_free(deferred2_0, deferred2_1);
    }
}

/**
* @param {string} index
* @returns {string}
*/
export function clear(index) {
    let deferred2_0;
    let deferred2_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(index, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.clear(retptr, ptr0, len0);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        deferred2_0 = r0;
        deferred2_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_free(deferred2_0, deferred2_1);
    }
}

/**
* @param {string} index
* @returns {number}
*/
export function size(index) {
    const ptr0 = passStringToWasm0(index, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.size(ptr0, len0);
    return ret >>> 0;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}
/**
*/
export class Voy {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Voy.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_voy_free(ptr);
    }
    /**
    * @param {Resource | undefined} resource
    */
    constructor(resource) {
        const ret = wasm.voy_new(isLikeNone(resource) ? 0 : addHeapObject(resource));
        return Voy.__wrap(ret);
    }
    /**
    * @returns {string}
    */
    serialize() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.voy_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1);
        }
    }
    /**
    * @param {string} serialized_index
    * @returns {Voy}
    */
    static deserialize(serialized_index) {
        const ptr0 = passStringToWasm0(serialized_index, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.voy_deserialize(ptr0, len0);
        return Voy.__wrap(ret);
    }
    /**
    * @param {Resource} resource
    */
    index(resource) {
        wasm.voy_index(this.__wbg_ptr, addHeapObject(resource));
    }
    /**
    * @param {Float32Array} query
    * @param {number} k
    * @returns {SearchResult}
    */
    search(query, k) {
        const ptr0 = passArrayF32ToWasm0(query, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.voy_search(this.__wbg_ptr, ptr0, len0, k);
        return takeObject(ret);
    }
    /**
    * @param {Resource} resource
    */
    add(resource) {
        wasm.voy_add(this.__wbg_ptr, addHeapObject(resource));
    }
    /**
    * @param {Resource} resource
    */
    remove(resource) {
        wasm.voy_remove(this.__wbg_ptr, addHeapObject(resource));
    }
    /**
    */
    clear() {
        wasm.voy_clear(this.__wbg_ptr);
    }
    /**
    * @returns {number}
    */
    size() {
        const ret = wasm.voy_size(this.__wbg_ptr);
        return ret >>> 0;
    }
}

export function __wbindgen_object_clone_ref(arg0) {
    const ret = getObject(arg0);
    return addHeapObject(ret);
};

export function __wbindgen_is_undefined(arg0) {
    const ret = getObject(arg0) === undefined;
    return ret;
};

export function __wbindgen_object_drop_ref(arg0) {
    takeObject(arg0);
};

export function __wbg_new_abda76e883ba8a5f() {
    const ret = new Error();
    return addHeapObject(ret);
};

export function __wbg_stack_658279fe44541cf6(arg0, arg1) {
    const ret = getObject(arg1).stack;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len1;
    getInt32Memory0()[arg0 / 4 + 0] = ptr1;
};

export function __wbg_error_f851667af71bcfc6(arg0, arg1) {
    let deferred0_0;
    let deferred0_1;
    try {
        deferred0_0 = arg0;
        deferred0_1 = arg1;
        console.error(getStringFromWasm0(arg0, arg1));
    } finally {
        wasm.__wbindgen_free(deferred0_0, deferred0_1);
    }
};

export function __wbg_parse_76a8a18ca3f8730b() { return handleError(function (arg0, arg1) {
    const ret = JSON.parse(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
}, arguments) };

export function __wbg_stringify_d06ad2addc54d51e() { return handleError(function (arg0) {
    const ret = JSON.stringify(getObject(arg0));
    return addHeapObject(ret);
}, arguments) };

export function __wbindgen_string_get(arg0, arg1) {
    const obj = getObject(arg1);
    const ret = typeof(obj) === 'string' ? obj : undefined;
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len1;
    getInt32Memory0()[arg0 / 4 + 0] = ptr1;
};

export function __wbindgen_throw(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};


const bg = {
    __wbg_set_wasm,
    __wbindgen_object_clone_ref,
    __wbindgen_is_undefined,
    __wbindgen_object_drop_ref,
    __wbg_new_abda76e883ba8a5f,
    __wbg_stack_658279fe44541cf6,
    __wbg_error_f851667af71bcfc6,
    __wbg_parse_76a8a18ca3f8730b,
    __wbg_stringify_d06ad2addc54d51e,
    __wbindgen_string_get,
    __wbindgen_throw,
    Voy
  };

async function initWasm() {

    const imports = {
        "./voy_search_bg.js": bg,
        env: {
            memory: new WebAssembly.Memory({ initial: 512 })
        }
    };

    const wasmModule = await WebAssembly.instantiate(new Uint8Array(wasmfile), imports);
    bg.__wbg_set_wasm(wasmModule.instance.exports);
    return wasmModule.instance;
}

// ----- Basic Tokenizer and Embedding -----
function tokenize(text) {
    return text.toLowerCase().split(/\W+/).filter(Boolean);
}

function buildVocabulary(docs) {
    const allTokens = docs.flatMap(doc => tokenize(doc.text));
    return Array.from(new Set(allTokens));
}

function termFreqVector(tokens, vocabulary) {
    const vec = new Array(vocabulary.length).fill(0);
    tokens.forEach(token => {
        const idx = vocabulary.indexOf(token);
        if (idx !== -1) vec[idx]++;
    });
    return vec;
}
let wasmInstance = null;







const scrappedData = [
    {
        id: 1,
        title: "AI Trends in 2025",
        text: "This article covers the latest advancements and trends in artificial intelligence, including deep learning and neural networks.",
        url: "https://company.com/articles/ai-trends-2025"
    },
    {
        id: 2,
        title: "Performance Optimization Techniques",
        text: "Tips and best practices for optimizing the performance of web applications and backend services.",
        url: "https://company.com/articles/performance-optimization"
    },
    {
        id: 3,
        title: "Introduction to Quantum Computing",
        text: "A beginner's guide to the concepts of quantum computing and its potential impact on various industries.",
        url: "https://company.com/articles/quantum-computing-intro"
    }
];

// Your user query
const userQuery = "AI and neural networks";

// Run the search with your function





// ----- MAIN -----
globalThis.runVoySearch = async function(scrappedData,queryy){
        wasmInstance = await initWasm();
   
        const texts = scrappedData;

        const validTexts = texts.filter(t => t.text && t.text.trim().length > 0);

        const vocabulary = buildVocabulary(validTexts);
        const data = validTexts.map(doc => ({
            id: doc.id,
            title: doc.title,
            url: doc.url,
            embeddings: termFreqVector(tokenize(doc.text), vocabulary)
        }));

        // Create Voy index
        const index = new bg.Voy({ embeddings: data });

        // Query processing
        const queryText = queryy;
        const queryEmbedding = termFreqVector(tokenize(queryText), vocabulary);

        const results = index.search(queryEmbedding, 1);
        results.neighbors.forEach(result => {
            const fullData = texts.find(t => t.id === result.id);
            if (fullData) {
                //console.log(`- Match ${fullData.id}: ${fullData.title}`);
                //console.log(`  Text: ${fullData.text}`);
                //console.log(`  Text: ${fullData.title}`); uncomment this if you want to use see the scrapped data from python library
            } else {
                console.log(`- Match ${result.id}: (no full data found)`);
            }
        });

}


//runVoySearch(scrappedData, userQuery);
