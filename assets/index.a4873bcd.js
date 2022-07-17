const io = function () {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
    new MutationObserver(s => {
        for (const o of s) if (o.type === "childList") for (const i of o.addedNodes) i.tagName === "LINK" && i.rel === "modulepreload" && r(i)
    }).observe(document, {childList: !0, subtree: !0});

    function n(s) {
        const o = {};
        return s.integrity && (o.integrity = s.integrity), s.referrerpolicy && (o.referrerPolicy = s.referrerpolicy), s.crossorigin === "use-credentials" ? o.credentials = "include" : s.crossorigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin", o
    }

    function r(s) {
        if (s.ep) return;
        s.ep = !0;
        const o = n(s);
        fetch(s.href, o)
    }
};
io();

function Rn(e, t) {
    const n = Object.create(null), r = e.split(",");
    for (let s = 0; s < r.length; s++) n[r[s]] = !0;
    return t ? s => !!n[s.toLowerCase()] : s => !!n[s]
}

const lo = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", co = Rn(lo);

function Qr(e) {
    return !!e || e === ""
}

function xt(e) {
    if (F(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const r = e[n], s = G(r) ? ao(r) : xt(r);
            if (s) for (const o in s) t[o] = s[o]
        }
        return t
    } else {
        if (G(e)) return e;
        if (ee(e)) return e
    }
}

const fo = /;(?![^(]*\))/g, uo = /:(.+)/;

function ao(e) {
    const t = {};
    return e.split(fo).forEach(n => {
        if (n) {
            const r = n.split(uo);
            r.length > 1 && (t[r[0].trim()] = r[1].trim())
        }
    }), t
}

function $n(e) {
    let t = "";
    if (G(e)) t = e; else if (F(e)) for (let n = 0; n < e.length; n++) {
        const r = $n(e[n]);
        r && (t += r + " ")
    } else if (ee(e)) for (const n in e) e[n] && (t += n + " ");
    return t.trim()
}

const ur = e => G(e) ? e : e == null ? "" : F(e) || ee(e) && (e.toString === ns || !M(e.toString)) ? JSON.stringify(e, Gr, 2) : String(e),
    Gr = (e, t) => t && t.__v_isRef ? Gr(e, t.value) : it(t) ? {[`Map(${t.size})`]: [...t.entries()].reduce((n, [r, s]) => (n[`${r} =>`] = s, n), {})} : es(t) ? {[`Set(${t.size})`]: [...t.values()]} : ee(t) && !F(t) && !rs(t) ? String(t) : t,
    k = {}, ot = [], we = () => {
    }, po = () => !1, ho = /^on[^a-z]/, Jt = e => ho.test(e), Dn = e => e.startsWith("onUpdate:"), se = Object.assign,
    Hn = (e, t) => {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1)
    }, go = Object.prototype.hasOwnProperty, N = (e, t) => go.call(e, t), F = Array.isArray,
    it = e => Zt(e) === "[object Map]", es = e => Zt(e) === "[object Set]", M = e => typeof e == "function",
    G = e => typeof e == "string", Un = e => typeof e == "symbol", ee = e => e !== null && typeof e == "object",
    ts = e => ee(e) && M(e.then) && M(e.catch), ns = Object.prototype.toString, Zt = e => ns.call(e),
    _o = e => Zt(e).slice(8, -1), rs = e => Zt(e) === "[object Object]",
    Vn = e => G(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
    Rt = Rn(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
    Yt = e => {
        const t = Object.create(null);
        return n => t[n] || (t[n] = e(n))
    }, mo = /-(\w)/g, ft = Yt(e => e.replace(mo, (t, n) => n ? n.toUpperCase() : "")), bo = /\B([A-Z])/g,
    pt = Yt(e => e.replace(bo, "-$1").toLowerCase()), ss = Yt(e => e.charAt(0).toUpperCase() + e.slice(1)),
    dn = Yt(e => e ? `on${ss(e)}` : ""), Ot = (e, t) => !Object.is(e, t), $t = (e, t) => {
        for (let n = 0; n < e.length; n++) e[n](t)
    }, Vt = (e, t, n) => {
        Object.defineProperty(e, t, {configurable: !0, enumerable: !1, value: n})
    }, bn = e => {
        const t = parseFloat(e);
        return isNaN(t) ? e : t
    };
let ar;
const vo = () => ar || (ar = typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : typeof window != "undefined" ? window : typeof global != "undefined" ? global : {});
let ue;

class yo {
    constructor(t = !1) {
        this.active = !0, this.effects = [], this.cleanups = [], !t && ue && (this.parent = ue, this.index = (ue.scopes || (ue.scopes = [])).push(this) - 1)
    }

    run(t) {
        if (this.active) {
            const n = ue;
            try {
                return ue = this, t()
            } finally {
                ue = n
            }
        }
    }

    on() {
        ue = this
    }

    off() {
        ue = this.parent
    }

    stop(t) {
        if (this.active) {
            let n, r;
            for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
            for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
            if (this.scopes) for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
            if (this.parent && !t) {
                const s = this.parent.scopes.pop();
                s && s !== this && (this.parent.scopes[this.index] = s, s.index = this.index)
            }
            this.active = !1
        }
    }
}

function Eo(e, t = ue) {
    t && t.active && t.effects.push(e)
}

function wo() {
    return ue
}

function xo(e) {
    ue && ue.cleanups.push(e)
}

const kn = e => {
    const t = new Set(e);
    return t.w = 0, t.n = 0, t
}, os = e => (e.w & Ue) > 0, is = e => (e.n & Ue) > 0, Oo = ({deps: e}) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Ue
}, Ao = e => {
    const {deps: t} = e;
    if (t.length) {
        let n = 0;
        for (let r = 0; r < t.length; r++) {
            const s = t[r];
            os(s) && !is(s) ? s.delete(e) : t[n++] = s, s.w &= ~Ue, s.n &= ~Ue
        }
        t.length = n
    }
}, vn = new WeakMap;
let bt = 0, Ue = 1;
const yn = 30;
let ve;
const Ze = Symbol(""), En = Symbol("");

class Kn {
    constructor(t, n = null, r) {
        this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Eo(this, r)
    }

    run() {
        if (!this.active) return this.fn();
        let t = ve, n = De;
        for (; t;) {
            if (t === this) return;
            t = t.parent
        }
        try {
            return this.parent = ve, ve = this, De = !0, Ue = 1 << ++bt, bt <= yn ? Oo(this) : dr(this), this.fn()
        } finally {
            bt <= yn && Ao(this), Ue = 1 << --bt, ve = this.parent, De = n, this.parent = void 0, this.deferStop && this.stop()
        }
    }

    stop() {
        ve === this ? this.deferStop = !0 : this.active && (dr(this), this.onStop && this.onStop(), this.active = !1)
    }
}

function dr(e) {
    const {deps: t} = e;
    if (t.length) {
        for (let n = 0; n < t.length; n++) t[n].delete(e);
        t.length = 0
    }
}

let De = !0;
const ls = [];

function ht() {
    ls.push(De), De = !1
}

function gt() {
    const e = ls.pop();
    De = e === void 0 ? !0 : e
}

function pe(e, t, n) {
    if (De && ve) {
        let r = vn.get(e);
        r || vn.set(e, r = new Map);
        let s = r.get(n);
        s || r.set(n, s = kn()), cs(s)
    }
}

function cs(e, t) {
    let n = !1;
    bt <= yn ? is(e) || (e.n |= Ue, n = !os(e)) : n = !e.has(ve), n && (e.add(ve), ve.deps.push(e))
}

function Se(e, t, n, r, s, o) {
    const i = vn.get(e);
    if (!i) return;
    let l = [];
    if (t === "clear") l = [...i.values()]; else if (n === "length" && F(e)) i.forEach((f, a) => {
        (a === "length" || a >= r) && l.push(f)
    }); else switch (n !== void 0 && l.push(i.get(n)), t) {
        case"add":
            F(e) ? Vn(n) && l.push(i.get("length")) : (l.push(i.get(Ze)), it(e) && l.push(i.get(En)));
            break;
        case"delete":
            F(e) || (l.push(i.get(Ze)), it(e) && l.push(i.get(En)));
            break;
        case"set":
            it(e) && l.push(i.get(Ze));
            break
    }
    if (l.length === 1) l[0] && wn(l[0]); else {
        const f = [];
        for (const a of l) a && f.push(...a);
        wn(kn(f))
    }
}

function wn(e, t) {
    const n = F(e) ? e : [...e];
    for (const r of n) r.computed && pr(r);
    for (const r of n) r.computed || pr(r)
}

function pr(e, t) {
    (e !== ve || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run())
}

const Co = Rn("__proto__,__v_isRef,__isVue"),
    fs = new Set(Object.getOwnPropertyNames(Symbol).filter(e => e !== "arguments" && e !== "caller").map(e => Symbol[e]).filter(Un)),
    Po = Wn(), To = Wn(!1, !0), Io = Wn(!0), hr = Fo();

function Fo() {
    const e = {};
    return ["includes", "indexOf", "lastIndexOf"].forEach(t => {
        e[t] = function (...n) {
            const r = $(this);
            for (let o = 0, i = this.length; o < i; o++) pe(r, "get", o + "");
            const s = r[t](...n);
            return s === -1 || s === !1 ? r[t](...n.map($)) : s
        }
    }), ["push", "pop", "shift", "unshift", "splice"].forEach(t => {
        e[t] = function (...n) {
            ht();
            const r = $(this)[t].apply(this, n);
            return gt(), r
        }
    }), e
}

function Wn(e = !1, t = !1) {
    return function (r, s, o) {
        if (s === "__v_isReactive") return !e;
        if (s === "__v_isReadonly") return e;
        if (s === "__v_isShallow") return t;
        if (s === "__v_raw" && o === (e ? t ? zo : hs : t ? ps : ds).get(r)) return r;
        const i = F(r);
        if (!e && i && N(hr, s)) return Reflect.get(hr, s, o);
        const l = Reflect.get(r, s, o);
        return (Un(s) ? fs.has(s) : Co(s)) || (e || pe(r, "get", s), t) ? l : ne(l) ? i && Vn(s) ? l : l.value : ee(l) ? e ? gs(l) : Jn(l) : l
    }
}

const Mo = us(), Lo = us(!0);

function us(e = !1) {
    return function (n, r, s, o) {
        let i = n[r];
        if (At(i) && ne(i) && !ne(s)) return !1;
        if (!e && !At(s) && (xn(s) || (s = $(s), i = $(i)), !F(n) && ne(i) && !ne(s))) return i.value = s, !0;
        const l = F(n) && Vn(r) ? Number(r) < n.length : N(n, r), f = Reflect.set(n, r, s, o);
        return n === $(o) && (l ? Ot(s, i) && Se(n, "set", r, s) : Se(n, "add", r, s)), f
    }
}

function So(e, t) {
    const n = N(e, t);
    e[t];
    const r = Reflect.deleteProperty(e, t);
    return r && n && Se(e, "delete", t, void 0), r
}

function No(e, t) {
    const n = Reflect.has(e, t);
    return (!Un(t) || !fs.has(t)) && pe(e, "has", t), n
}

function jo(e) {
    return pe(e, "iterate", F(e) ? "length" : Ze), Reflect.ownKeys(e)
}

const as = {get: Po, set: Mo, deleteProperty: So, has: No, ownKeys: jo}, Bo = {
    get: Io, set(e, t) {
        return !0
    }, deleteProperty(e, t) {
        return !0
    }
}, Ro = se({}, as, {get: To, set: Lo}), zn = e => e, Xt = e => Reflect.getPrototypeOf(e);

function Lt(e, t, n = !1, r = !1) {
    e = e.__v_raw;
    const s = $(e), o = $(t);
    n || (t !== o && pe(s, "get", t), pe(s, "get", o));
    const {has: i} = Xt(s), l = r ? zn : n ? Yn : Ct;
    if (i.call(s, t)) return l(e.get(t));
    if (i.call(s, o)) return l(e.get(o));
    e !== s && e.get(t)
}

function St(e, t = !1) {
    const n = this.__v_raw, r = $(n), s = $(e);
    return t || (e !== s && pe(r, "has", e), pe(r, "has", s)), e === s ? n.has(e) : n.has(e) || n.has(s)
}

function Nt(e, t = !1) {
    return e = e.__v_raw, !t && pe($(e), "iterate", Ze), Reflect.get(e, "size", e)
}

function gr(e) {
    e = $(e);
    const t = $(this);
    return Xt(t).has.call(t, e) || (t.add(e), Se(t, "add", e, e)), this
}

function _r(e, t) {
    t = $(t);
    const n = $(this), {has: r, get: s} = Xt(n);
    let o = r.call(n, e);
    o || (e = $(e), o = r.call(n, e));
    const i = s.call(n, e);
    return n.set(e, t), o ? Ot(t, i) && Se(n, "set", e, t) : Se(n, "add", e, t), this
}

function mr(e) {
    const t = $(this), {has: n, get: r} = Xt(t);
    let s = n.call(t, e);
    s || (e = $(e), s = n.call(t, e)), r && r.call(t, e);
    const o = t.delete(e);
    return s && Se(t, "delete", e, void 0), o
}

function br() {
    const e = $(this), t = e.size !== 0, n = e.clear();
    return t && Se(e, "clear", void 0, void 0), n
}

function jt(e, t) {
    return function (r, s) {
        const o = this, i = o.__v_raw, l = $(i), f = t ? zn : e ? Yn : Ct;
        return !e && pe(l, "iterate", Ze), i.forEach((a, g) => r.call(s, f(a), f(g), o))
    }
}

function Bt(e, t, n) {
    return function (...r) {
        const s = this.__v_raw, o = $(s), i = it(o), l = e === "entries" || e === Symbol.iterator && i,
            f = e === "keys" && i, a = s[e](...r), g = n ? zn : t ? Yn : Ct;
        return !t && pe(o, "iterate", f ? En : Ze), {
            next() {
                const {value: b, done: m} = a.next();
                return m ? {value: b, done: m} : {value: l ? [g(b[0]), g(b[1])] : g(b), done: m}
            }, [Symbol.iterator]() {
                return this
            }
        }
    }
}

function Be(e) {
    return function (...t) {
        return e === "delete" ? !1 : this
    }
}

function $o() {
    const e = {
        get(o) {
            return Lt(this, o)
        }, get size() {
            return Nt(this)
        }, has: St, add: gr, set: _r, delete: mr, clear: br, forEach: jt(!1, !1)
    }, t = {
        get(o) {
            return Lt(this, o, !1, !0)
        }, get size() {
            return Nt(this)
        }, has: St, add: gr, set: _r, delete: mr, clear: br, forEach: jt(!1, !0)
    }, n = {
        get(o) {
            return Lt(this, o, !0)
        }, get size() {
            return Nt(this, !0)
        }, has(o) {
            return St.call(this, o, !0)
        }, add: Be("add"), set: Be("set"), delete: Be("delete"), clear: Be("clear"), forEach: jt(!0, !1)
    }, r = {
        get(o) {
            return Lt(this, o, !0, !0)
        }, get size() {
            return Nt(this, !0)
        }, has(o) {
            return St.call(this, o, !0)
        }, add: Be("add"), set: Be("set"), delete: Be("delete"), clear: Be("clear"), forEach: jt(!0, !0)
    };
    return ["keys", "values", "entries", Symbol.iterator].forEach(o => {
        e[o] = Bt(o, !1, !1), n[o] = Bt(o, !0, !1), t[o] = Bt(o, !1, !0), r[o] = Bt(o, !0, !0)
    }), [e, n, t, r]
}

const [Do, Ho, Uo, Vo] = $o();

function qn(e, t) {
    const n = t ? e ? Vo : Uo : e ? Ho : Do;
    return (r, s, o) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? r : Reflect.get(N(n, s) && s in r ? n : r, s, o)
}

const ko = {get: qn(!1, !1)}, Ko = {get: qn(!1, !0)}, Wo = {get: qn(!0, !1)}, ds = new WeakMap, ps = new WeakMap,
    hs = new WeakMap, zo = new WeakMap;

function qo(e) {
    switch (e) {
        case"Object":
        case"Array":
            return 1;
        case"Map":
        case"Set":
        case"WeakMap":
        case"WeakSet":
            return 2;
        default:
            return 0
    }
}

function Jo(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : qo(_o(e))
}

function Jn(e) {
    return At(e) ? e : Zn(e, !1, as, ko, ds)
}

function Zo(e) {
    return Zn(e, !1, Ro, Ko, ps)
}

function gs(e) {
    return Zn(e, !0, Bo, Wo, hs)
}

function Zn(e, t, n, r, s) {
    if (!ee(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
    const o = s.get(e);
    if (o) return o;
    const i = Jo(e);
    if (i === 0) return e;
    const l = new Proxy(e, i === 2 ? r : n);
    return s.set(e, l), l
}

function lt(e) {
    return At(e) ? lt(e.__v_raw) : !!(e && e.__v_isReactive)
}

function At(e) {
    return !!(e && e.__v_isReadonly)
}

function xn(e) {
    return !!(e && e.__v_isShallow)
}

function _s(e) {
    return lt(e) || At(e)
}

function $(e) {
    const t = e && e.__v_raw;
    return t ? $(t) : e
}

function ms(e) {
    return Vt(e, "__v_skip", !0), e
}

const Ct = e => ee(e) ? Jn(e) : e, Yn = e => ee(e) ? gs(e) : e;

function bs(e) {
    De && ve && (e = $(e), cs(e.dep || (e.dep = kn())))
}

function vs(e, t) {
    e = $(e), e.dep && wn(e.dep)
}

function ne(e) {
    return !!(e && e.__v_isRef === !0)
}

function Me(e) {
    return ys(e, !1)
}

function Yo(e) {
    return ys(e, !0)
}

function ys(e, t) {
    return ne(e) ? e : new Xo(e, t)
}

class Xo {
    constructor(t, n) {
        this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : $(t), this._value = n ? t : Ct(t)
    }

    get value() {
        return bs(this), this._value
    }

    set value(t) {
        t = this.__v_isShallow ? t : $(t), Ot(t, this._rawValue) && (this._rawValue = t, this._value = this.__v_isShallow ? t : Ct(t), vs(this))
    }
}

function de(e) {
    return ne(e) ? e.value : e
}

const Qo = {
    get: (e, t, n) => de(Reflect.get(e, t, n)), set: (e, t, n, r) => {
        const s = e[t];
        return ne(s) && !ne(n) ? (s.value = n, !0) : Reflect.set(e, t, n, r)
    }
};

function Es(e) {
    return lt(e) ? e : new Proxy(e, Qo)
}

class Go {
    constructor(t, n, r, s) {
        this._setter = n, this.dep = void 0, this.__v_isRef = !0, this._dirty = !0, this.effect = new Kn(t, () => {
            this._dirty || (this._dirty = !0, vs(this))
        }), this.effect.computed = this, this.effect.active = this._cacheable = !s, this.__v_isReadonly = r
    }

    get value() {
        const t = $(this);
        return bs(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value
    }

    set value(t) {
        this._setter(t)
    }
}

function ei(e, t, n = !1) {
    let r, s;
    const o = M(e);
    return o ? (r = e, s = we) : (r = e.get, s = e.set), new Go(r, s, o || !s, n)
}

function He(e, t, n, r) {
    let s;
    try {
        s = r ? e(...r) : e()
    } catch (o) {
        Qt(o, t, n)
    }
    return s
}

function _e(e, t, n, r) {
    if (M(e)) {
        const o = He(e, t, n, r);
        return o && ts(o) && o.catch(i => {
            Qt(i, t, n)
        }), o
    }
    const s = [];
    for (let o = 0; o < e.length; o++) s.push(_e(e[o], t, n, r));
    return s
}

function Qt(e, t, n, r = !0) {
    const s = t ? t.vnode : null;
    if (t) {
        let o = t.parent;
        const i = t.proxy, l = n;
        for (; o;) {
            const a = o.ec;
            if (a) {
                for (let g = 0; g < a.length; g++) if (a[g](e, i, l) === !1) return
            }
            o = o.parent
        }
        const f = t.appContext.config.errorHandler;
        if (f) {
            He(f, null, 10, [e, i, l]);
            return
        }
    }
    ti(e, n, s, r)
}

function ti(e, t, n, r = !0) {
    console.error(e)
}

let kt = !1, On = !1;
const ae = [];
let Fe = 0;
const yt = [];
let vt = null, nt = 0;
const Et = [];
let Re = null, rt = 0;
const ws = Promise.resolve();
let Xn = null, An = null;

function Qn(e) {
    const t = Xn || ws;
    return e ? t.then(this ? e.bind(this) : e) : t
}

function ni(e) {
    let t = Fe + 1, n = ae.length;
    for (; t < n;) {
        const r = t + n >>> 1;
        Pt(ae[r]) < e ? t = r + 1 : n = r
    }
    return t
}

function xs(e) {
    (!ae.length || !ae.includes(e, kt && e.allowRecurse ? Fe + 1 : Fe)) && e !== An && (e.id == null ? ae.push(e) : ae.splice(ni(e.id), 0, e), Os())
}

function Os() {
    !kt && !On && (On = !0, Xn = ws.then(Ps))
}

function ri(e) {
    const t = ae.indexOf(e);
    t > Fe && ae.splice(t, 1)
}

function As(e, t, n, r) {
    F(e) ? n.push(...e) : (!t || !t.includes(e, e.allowRecurse ? r + 1 : r)) && n.push(e), Os()
}

function si(e) {
    As(e, vt, yt, nt)
}

function oi(e) {
    As(e, Re, Et, rt)
}

function Gt(e, t = null) {
    if (yt.length) {
        for (An = t, vt = [...new Set(yt)], yt.length = 0, nt = 0; nt < vt.length; nt++) vt[nt]();
        vt = null, nt = 0, An = null, Gt(e, t)
    }
}

function Cs(e) {
    if (Gt(), Et.length) {
        const t = [...new Set(Et)];
        if (Et.length = 0, Re) {
            Re.push(...t);
            return
        }
        for (Re = t, Re.sort((n, r) => Pt(n) - Pt(r)), rt = 0; rt < Re.length; rt++) Re[rt]();
        Re = null, rt = 0
    }
}

const Pt = e => e.id == null ? 1 / 0 : e.id;

function Ps(e) {
    On = !1, kt = !0, Gt(e), ae.sort((n, r) => Pt(n) - Pt(r));
    const t = we;
    try {
        for (Fe = 0; Fe < ae.length; Fe++) {
            const n = ae[Fe];
            n && n.active !== !1 && He(n, null, 14)
        }
    } finally {
        Fe = 0, ae.length = 0, Cs(), kt = !1, Xn = null, (ae.length || yt.length || Et.length) && Ps(e)
    }
}

function ii(e, t, ...n) {
    if (e.isUnmounted) return;
    const r = e.vnode.props || k;
    let s = n;
    const o = t.startsWith("update:"), i = o && t.slice(7);
    if (i && i in r) {
        const g = `${i === "modelValue" ? "model" : i}Modifiers`, {number: b, trim: m} = r[g] || k;
        m && (s = n.map(x => x.trim())), b && (s = n.map(bn))
    }
    let l, f = r[l = dn(t)] || r[l = dn(ft(t))];
    !f && o && (f = r[l = dn(pt(t))]), f && _e(f, e, 6, s);
    const a = r[l + "Once"];
    if (a) {
        if (!e.emitted) e.emitted = {}; else if (e.emitted[l]) return;
        e.emitted[l] = !0, _e(a, e, 6, s)
    }
}

function Ts(e, t, n = !1) {
    const r = t.emitsCache, s = r.get(e);
    if (s !== void 0) return s;
    const o = e.emits;
    let i = {}, l = !1;
    if (!M(e)) {
        const f = a => {
            const g = Ts(a, t, !0);
            g && (l = !0, se(i, g))
        };
        !n && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f)
    }
    return !o && !l ? (r.set(e, null), null) : (F(o) ? o.forEach(f => i[f] = null) : se(i, o), r.set(e, i), i)
}

function en(e, t) {
    return !e || !Jt(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), N(e, t[0].toLowerCase() + t.slice(1)) || N(e, pt(t)) || N(e, t))
}

let ye = null, tn = null;

function Kt(e) {
    const t = ye;
    return ye = e, tn = e && e.type.__scopeId || null, t
}

function li(e) {
    tn = e
}

function ci() {
    tn = null
}

function fi(e, t = ye, n) {
    if (!t || e._n) return e;
    const r = (...s) => {
        r._d && Ir(-1);
        const o = Kt(t), i = e(...s);
        return Kt(o), r._d && Ir(1), i
    };
    return r._n = !0, r._c = !0, r._d = !0, r
}

function pn(e) {
    const {
        type: t,
        vnode: n,
        proxy: r,
        withProxy: s,
        props: o,
        propsOptions: [i],
        slots: l,
        attrs: f,
        emit: a,
        render: g,
        renderCache: b,
        data: m,
        setupState: x,
        ctx: S,
        inheritAttrs: L
    } = e;
    let T, P;
    const Z = Kt(e);
    try {
        if (n.shapeFlag & 4) {
            const H = s || r;
            T = Ae(g.call(H, H, b, o, x, m, S)), P = f
        } else {
            const H = t;
            T = Ae(H.length > 1 ? H(o, {attrs: f, slots: l, emit: a}) : H(o, null)), P = t.props ? f : ui(f)
        }
    } catch (H) {
        wt.length = 0, Qt(H, e, 1), T = Ce(Le)
    }
    let D = T;
    if (P && L !== !1) {
        const H = Object.keys(P), {shapeFlag: Q} = D;
        H.length && Q & 7 && (i && H.some(Dn) && (P = ai(P, i)), D = Ve(D, P))
    }
    return n.dirs && (D = Ve(D), D.dirs = D.dirs ? D.dirs.concat(n.dirs) : n.dirs), n.transition && (D.transition = n.transition), T = D, Kt(Z), T
}

const ui = e => {
    let t;
    for (const n in e) (n === "class" || n === "style" || Jt(n)) && ((t || (t = {}))[n] = e[n]);
    return t
}, ai = (e, t) => {
    const n = {};
    for (const r in e) (!Dn(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
    return n
};

function di(e, t, n) {
    const {props: r, children: s, component: o} = e, {props: i, children: l, patchFlag: f} = t, a = o.emitsOptions;
    if (t.dirs || t.transition) return !0;
    if (n && f >= 0) {
        if (f & 1024) return !0;
        if (f & 16) return r ? vr(r, i, a) : !!i;
        if (f & 8) {
            const g = t.dynamicProps;
            for (let b = 0; b < g.length; b++) {
                const m = g[b];
                if (i[m] !== r[m] && !en(a, m)) return !0
            }
        }
    } else return (s || l) && (!l || !l.$stable) ? !0 : r === i ? !1 : r ? i ? vr(r, i, a) : !0 : !!i;
    return !1
}

function vr(e, t, n) {
    const r = Object.keys(t);
    if (r.length !== Object.keys(e).length) return !0;
    for (let s = 0; s < r.length; s++) {
        const o = r[s];
        if (t[o] !== e[o] && !en(n, o)) return !0
    }
    return !1
}

function pi({vnode: e, parent: t}, n) {
    for (; t && t.subTree === e;) (e = t.vnode).el = n, t = t.parent
}

const hi = e => e.__isSuspense;

function gi(e, t) {
    t && t.pendingBranch ? F(e) ? t.effects.push(...e) : t.effects.push(e) : oi(e)
}

function _i(e, t) {
    if (te) {
        let n = te.provides;
        const r = te.parent && te.parent.provides;
        r === n && (n = te.provides = Object.create(r)), n[e] = t
    }
}

function hn(e, t, n = !1) {
    const r = te || ye;
    if (r) {
        const s = r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides;
        if (s && e in s) return s[e];
        if (arguments.length > 1) return n && M(t) ? t.call(r.proxy) : t
    }
}

const yr = {};

function ct(e, t, n) {
    return Is(e, t, n)
}

function Is(e, t, {immediate: n, deep: r, flush: s, onTrack: o, onTrigger: i} = k) {
    const l = te;
    let f, a = !1, g = !1;
    if (ne(e) ? (f = () => e.value, a = xn(e)) : lt(e) ? (f = () => e, r = !0) : F(e) ? (g = !0, a = e.some(P => lt(P) || xn(P)), f = () => e.map(P => {
        if (ne(P)) return P.value;
        if (lt(P)) return Je(P);
        if (M(P)) return He(P, l, 2)
    })) : M(e) ? t ? f = () => He(e, l, 2) : f = () => {
        if (!(l && l.isUnmounted)) return b && b(), _e(e, l, 3, [m])
    } : f = we, t && r) {
        const P = f;
        f = () => Je(P())
    }
    let b, m = P => {
        b = T.onStop = () => {
            He(P, l, 4)
        }
    };
    if (It) return m = we, t ? n && _e(t, l, 3, [f(), g ? [] : void 0, m]) : f(), we;
    let x = g ? [] : yr;
    const S = () => {
        if (!!T.active) if (t) {
            const P = T.run();
            (r || a || (g ? P.some((Z, D) => Ot(Z, x[D])) : Ot(P, x))) && (b && b(), _e(t, l, 3, [P, x === yr ? void 0 : x, m]), x = P)
        } else T.run()
    };
    S.allowRecurse = !!t;
    let L;
    s === "sync" ? L = S : s === "post" ? L = () => ce(S, l && l.suspense) : L = () => si(S);
    const T = new Kn(f, L);
    return t ? n ? S() : x = T.run() : s === "post" ? ce(T.run.bind(T), l && l.suspense) : T.run(), () => {
        T.stop(), l && l.scope && Hn(l.scope.effects, T)
    }
}

function mi(e, t, n) {
    const r = this.proxy, s = G(e) ? e.includes(".") ? Fs(r, e) : () => r[e] : e.bind(r, r);
    let o;
    M(t) ? o = t : (o = t.handler, n = t);
    const i = te;
    ut(this);
    const l = Is(s, o.bind(r), n);
    return i ? ut(i) : Qe(), l
}

function Fs(e, t) {
    const n = t.split(".");
    return () => {
        let r = e;
        for (let s = 0; s < n.length && r; s++) r = r[n[s]];
        return r
    }
}

function Je(e, t) {
    if (!ee(e) || e.__v_skip || (t = t || new Set, t.has(e))) return e;
    if (t.add(e), ne(e)) Je(e.value, t); else if (F(e)) for (let n = 0; n < e.length; n++) Je(e[n], t); else if (es(e) || it(e)) e.forEach(n => {
        Je(n, t)
    }); else if (rs(e)) for (const n in e) Je(e[n], t);
    return e
}

function bi() {
    const e = {isMounted: !1, isLeaving: !1, isUnmounting: !1, leavingVNodes: new Map};
    return sn(() => {
        e.isMounted = !0
    }), Bs(() => {
        e.isUnmounting = !0
    }), e
}

const he = [Function, Array], vi = {
    name: "BaseTransition",
    props: {
        mode: String,
        appear: Boolean,
        persisted: Boolean,
        onBeforeEnter: he,
        onEnter: he,
        onAfterEnter: he,
        onEnterCancelled: he,
        onBeforeLeave: he,
        onLeave: he,
        onAfterLeave: he,
        onLeaveCancelled: he,
        onBeforeAppear: he,
        onAppear: he,
        onAfterAppear: he,
        onAppearCancelled: he
    },
    setup(e, {slots: t}) {
        const n = rr(), r = bi();
        let s;
        return () => {
            const o = t.default && Ls(t.default(), !0);
            if (!o || !o.length) return;
            let i = o[0];
            if (o.length > 1) {
                for (const L of o) if (L.type !== Le) {
                    i = L;
                    break
                }
            }
            const l = $(e), {mode: f} = l;
            if (r.isLeaving) return gn(i);
            const a = Er(i);
            if (!a) return gn(i);
            const g = Cn(a, l, r, n);
            Pn(a, g);
            const b = n.subTree, m = b && Er(b);
            let x = !1;
            const {getTransitionKey: S} = a.type;
            if (S) {
                const L = S();
                s === void 0 ? s = L : L !== s && (s = L, x = !0)
            }
            if (m && m.type !== Le && (!ze(a, m) || x)) {
                const L = Cn(m, l, r, n);
                if (Pn(m, L), f === "out-in") return r.isLeaving = !0, L.afterLeave = () => {
                    r.isLeaving = !1, n.update()
                }, gn(i);
                f === "in-out" && a.type !== Le && (L.delayLeave = (T, P, Z) => {
                    const D = Ms(r, m);
                    D[String(m.key)] = m, T._leaveCb = () => {
                        P(), T._leaveCb = void 0, delete g.delayedLeave
                    }, g.delayedLeave = Z
                })
            }
            return i
        }
    }
}, yi = vi;

function Ms(e, t) {
    const {leavingVNodes: n} = e;
    let r = n.get(t.type);
    return r || (r = Object.create(null), n.set(t.type, r)), r
}

function Cn(e, t, n, r) {
    const {
        appear: s,
        mode: o,
        persisted: i = !1,
        onBeforeEnter: l,
        onEnter: f,
        onAfterEnter: a,
        onEnterCancelled: g,
        onBeforeLeave: b,
        onLeave: m,
        onAfterLeave: x,
        onLeaveCancelled: S,
        onBeforeAppear: L,
        onAppear: T,
        onAfterAppear: P,
        onAppearCancelled: Z
    } = t, D = String(e.key), H = Ms(n, e), Q = (j, z) => {
        j && _e(j, r, 9, z)
    }, R = (j, z) => {
        const Y = z[1];
        Q(j, z), F(j) ? j.every(ie => ie.length <= 1) && Y() : j.length <= 1 && Y()
    }, re = {
        mode: o, persisted: i, beforeEnter(j) {
            let z = l;
            if (!n.isMounted) if (s) z = L || l; else return;
            j._leaveCb && j._leaveCb(!0);
            const Y = H[D];
            Y && ze(e, Y) && Y.el._leaveCb && Y.el._leaveCb(), Q(z, [j])
        }, enter(j) {
            let z = f, Y = a, ie = g;
            if (!n.isMounted) if (s) z = T || f, Y = P || a, ie = Z || g; else return;
            let me = !1;
            const Pe = j._enterCb = Ft => {
                me || (me = !0, Ft ? Q(ie, [j]) : Q(Y, [j]), re.delayedLeave && re.delayedLeave(), j._enterCb = void 0)
            };
            z ? R(z, [j, Pe]) : Pe()
        }, leave(j, z) {
            const Y = String(e.key);
            if (j._enterCb && j._enterCb(!0), n.isUnmounting) return z();
            Q(b, [j]);
            let ie = !1;
            const me = j._leaveCb = Pe => {
                ie || (ie = !0, z(), Pe ? Q(S, [j]) : Q(x, [j]), j._leaveCb = void 0, H[Y] === e && delete H[Y])
            };
            H[Y] = e, m ? R(m, [j, me]) : me()
        }, clone(j) {
            return Cn(j, t, n, r)
        }
    };
    return re
}

function gn(e) {
    if (nn(e)) return e = Ve(e), e.children = null, e
}

function Er(e) {
    return nn(e) ? e.children ? e.children[0] : void 0 : e
}

function Pn(e, t) {
    e.shapeFlag & 6 && e.component ? Pn(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t
}

function Ls(e, t = !1, n) {
    let r = [], s = 0;
    for (let o = 0; o < e.length; o++) {
        let i = e[o];
        const l = n == null ? i.key : String(n) + String(i.key != null ? i.key : o);
        i.type === ge ? (i.patchFlag & 128 && s++, r = r.concat(Ls(i.children, t, l))) : (t || i.type !== Le) && r.push(l != null ? Ve(i, {key: l}) : i)
    }
    if (s > 1) for (let o = 0; o < r.length; o++) r[o].patchFlag = -2;
    return r
}

function Ss(e) {
    return M(e) ? {setup: e, name: e.name} : e
}

const Dt = e => !!e.type.__asyncLoader, nn = e => e.type.__isKeepAlive;

function Ei(e, t) {
    Ns(e, "a", t)
}

function wi(e, t) {
    Ns(e, "da", t)
}

function Ns(e, t, n = te) {
    const r = e.__wdc || (e.__wdc = () => {
        let s = n;
        for (; s;) {
            if (s.isDeactivated) return;
            s = s.parent
        }
        return e()
    });
    if (rn(t, r, n), n) {
        let s = n.parent;
        for (; s && s.parent;) nn(s.parent.vnode) && xi(r, t, n, s), s = s.parent
    }
}

function xi(e, t, n, r) {
    const s = rn(t, e, r, !0);
    Rs(() => {
        Hn(r[t], s)
    }, n)
}

function rn(e, t, n = te, r = !1) {
    if (n) {
        const s = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...i) => {
            if (n.isUnmounted) return;
            ht(), ut(n);
            const l = _e(t, n, e, i);
            return Qe(), gt(), l
        });
        return r ? s.unshift(o) : s.push(o), o
    }
}

const Ne = e => (t, n = te) => (!It || e === "sp") && rn(e, t, n), js = Ne("bm"), sn = Ne("m"), Oi = Ne("bu"),
    Ai = Ne("u"), Bs = Ne("bum"), Rs = Ne("um"), Ci = Ne("sp"), Pi = Ne("rtg"), Ti = Ne("rtc");

function Ii(e, t = te) {
    rn("ec", e, t)
}

function wr(e, t) {
    const n = ye;
    if (n === null) return e;
    const r = ln(n) || n.proxy, s = e.dirs || (e.dirs = []);
    for (let o = 0; o < t.length; o++) {
        let [i, l, f, a = k] = t[o];
        M(i) && (i = {mounted: i, updated: i}), i.deep && Je(l), s.push({
            dir: i,
            instance: r,
            value: l,
            oldValue: void 0,
            arg: f,
            modifiers: a
        })
    }
    return e
}

function ke(e, t, n, r) {
    const s = e.dirs, o = t && t.dirs;
    for (let i = 0; i < s.length; i++) {
        const l = s[i];
        o && (l.oldValue = o[i].value);
        let f = l.dir[r];
        f && (ht(), _e(f, n, 8, [e.el, l, e, t]), gt())
    }
}

const Fi = Symbol();

function Mi(e, t, n, r) {
    let s;
    const o = n && n[r];
    if (F(e) || G(e)) {
        s = new Array(e.length);
        for (let i = 0, l = e.length; i < l; i++) s[i] = t(e[i], i, void 0, o && o[i])
    } else if (typeof e == "number") {
        s = new Array(e);
        for (let i = 0; i < e; i++) s[i] = t(i + 1, i, void 0, o && o[i])
    } else if (ee(e)) if (e[Symbol.iterator]) s = Array.from(e, (i, l) => t(i, l, void 0, o && o[l])); else {
        const i = Object.keys(e);
        s = new Array(i.length);
        for (let l = 0, f = i.length; l < f; l++) {
            const a = i[l];
            s[l] = t(e[a], a, l, o && o[l])
        }
    } else s = [];
    return n && (n[r] = s), s
}

const Tn = e => e ? Js(e) ? ln(e) || e.proxy : Tn(e.parent) : null, Wt = se(Object.create(null), {
    $: e => e,
    $el: e => e.vnode.el,
    $data: e => e.data,
    $props: e => e.props,
    $attrs: e => e.attrs,
    $slots: e => e.slots,
    $refs: e => e.refs,
    $parent: e => Tn(e.parent),
    $root: e => Tn(e.root),
    $emit: e => e.emit,
    $options: e => Ds(e),
    $forceUpdate: e => e.f || (e.f = () => xs(e.update)),
    $nextTick: e => e.n || (e.n = Qn.bind(e.proxy)),
    $watch: e => mi.bind(e)
}), Li = {
    get({_: e}, t) {
        const {ctx: n, setupState: r, data: s, props: o, accessCache: i, type: l, appContext: f} = e;
        let a;
        if (t[0] !== "$") {
            const x = i[t];
            if (x !== void 0) switch (x) {
                case 1:
                    return r[t];
                case 2:
                    return s[t];
                case 4:
                    return n[t];
                case 3:
                    return o[t]
            } else {
                if (r !== k && N(r, t)) return i[t] = 1, r[t];
                if (s !== k && N(s, t)) return i[t] = 2, s[t];
                if ((a = e.propsOptions[0]) && N(a, t)) return i[t] = 3, o[t];
                if (n !== k && N(n, t)) return i[t] = 4, n[t];
                In && (i[t] = 0)
            }
        }
        const g = Wt[t];
        let b, m;
        if (g) return t === "$attrs" && pe(e, "get", t), g(e);
        if ((b = l.__cssModules) && (b = b[t])) return b;
        if (n !== k && N(n, t)) return i[t] = 4, n[t];
        if (m = f.config.globalProperties, N(m, t)) return m[t]
    }, set({_: e}, t, n) {
        const {data: r, setupState: s, ctx: o} = e;
        return s !== k && N(s, t) ? (s[t] = n, !0) : r !== k && N(r, t) ? (r[t] = n, !0) : N(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = n, !0)
    }, has({_: {data: e, setupState: t, accessCache: n, ctx: r, appContext: s, propsOptions: o}}, i) {
        let l;
        return !!n[i] || e !== k && N(e, i) || t !== k && N(t, i) || (l = o[0]) && N(l, i) || N(r, i) || N(Wt, i) || N(s.config.globalProperties, i)
    }, defineProperty(e, t, n) {
        return n.get != null ? e._.accessCache[t] = 0 : N(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n)
    }
};
let In = !0;

function Si(e) {
    const t = Ds(e), n = e.proxy, r = e.ctx;
    In = !1, t.beforeCreate && xr(t.beforeCreate, e, "bc");
    const {
        data: s,
        computed: o,
        methods: i,
        watch: l,
        provide: f,
        inject: a,
        created: g,
        beforeMount: b,
        mounted: m,
        beforeUpdate: x,
        updated: S,
        activated: L,
        deactivated: T,
        beforeDestroy: P,
        beforeUnmount: Z,
        destroyed: D,
        unmounted: H,
        render: Q,
        renderTracked: R,
        renderTriggered: re,
        errorCaptured: j,
        serverPrefetch: z,
        expose: Y,
        inheritAttrs: ie,
        components: me,
        directives: Pe,
        filters: Ft
    } = t;
    if (a && Ni(a, r, null, e.appContext.config.unwrapInjectedRef), i) for (const q in i) {
        const K = i[q];
        M(K) && (r[q] = K.bind(n))
    }
    if (s) {
        const q = s.call(n, n);
        ee(q) && (e.data = Jn(q))
    }
    if (In = !0, o) for (const q in o) {
        const K = o[q], Te = M(K) ? K.bind(n, n) : M(K.get) ? K.get.bind(n, n) : we,
            fn = !M(K) && M(K.set) ? K.set.bind(n) : we, _t = at({get: Te, set: fn});
        Object.defineProperty(r, q, {enumerable: !0, configurable: !0, get: () => _t.value, set: Ge => _t.value = Ge})
    }
    if (l) for (const q in l) $s(l[q], r, n, q);
    if (f) {
        const q = M(f) ? f.call(n) : f;
        Reflect.ownKeys(q).forEach(K => {
            _i(K, q[K])
        })
    }
    g && xr(g, e, "c");

    function le(q, K) {
        F(K) ? K.forEach(Te => q(Te.bind(n))) : K && q(K.bind(n))
    }

    if (le(js, b), le(sn, m), le(Oi, x), le(Ai, S), le(Ei, L), le(wi, T), le(Ii, j), le(Ti, R), le(Pi, re), le(Bs, Z), le(Rs, H), le(Ci, z), F(Y)) if (Y.length) {
        const q = e.exposed || (e.exposed = {});
        Y.forEach(K => {
            Object.defineProperty(q, K, {get: () => n[K], set: Te => n[K] = Te})
        })
    } else e.exposed || (e.exposed = {});
    Q && e.render === we && (e.render = Q), ie != null && (e.inheritAttrs = ie), me && (e.components = me), Pe && (e.directives = Pe)
}

function Ni(e, t, n = we, r = !1) {
    F(e) && (e = Fn(e));
    for (const s in e) {
        const o = e[s];
        let i;
        ee(o) ? "default" in o ? i = hn(o.from || s, o.default, !0) : i = hn(o.from || s) : i = hn(o), ne(i) && r ? Object.defineProperty(t, s, {
            enumerable: !0,
            configurable: !0,
            get: () => i.value,
            set: l => i.value = l
        }) : t[s] = i
    }
}

function xr(e, t, n) {
    _e(F(e) ? e.map(r => r.bind(t.proxy)) : e.bind(t.proxy), t, n)
}

function $s(e, t, n, r) {
    const s = r.includes(".") ? Fs(n, r) : () => n[r];
    if (G(e)) {
        const o = t[e];
        M(o) && ct(s, o)
    } else if (M(e)) ct(s, e.bind(n)); else if (ee(e)) if (F(e)) e.forEach(o => $s(o, t, n, r)); else {
        const o = M(e.handler) ? e.handler.bind(n) : t[e.handler];
        M(o) && ct(s, o, e)
    }
}

function Ds(e) {
    const t = e.type, {mixins: n, extends: r} = t, {
        mixins: s,
        optionsCache: o,
        config: {optionMergeStrategies: i}
    } = e.appContext, l = o.get(t);
    let f;
    return l ? f = l : !s.length && !n && !r ? f = t : (f = {}, s.length && s.forEach(a => zt(f, a, i, !0)), zt(f, t, i)), o.set(t, f), f
}

function zt(e, t, n, r = !1) {
    const {mixins: s, extends: o} = t;
    o && zt(e, o, n, !0), s && s.forEach(i => zt(e, i, n, !0));
    for (const i in t) if (!(r && i === "expose")) {
        const l = ji[i] || n && n[i];
        e[i] = l ? l(e[i], t[i]) : t[i]
    }
    return e
}

const ji = {
    data: Or,
    props: We,
    emits: We,
    methods: We,
    computed: We,
    beforeCreate: oe,
    created: oe,
    beforeMount: oe,
    mounted: oe,
    beforeUpdate: oe,
    updated: oe,
    beforeDestroy: oe,
    beforeUnmount: oe,
    destroyed: oe,
    unmounted: oe,
    activated: oe,
    deactivated: oe,
    errorCaptured: oe,
    serverPrefetch: oe,
    components: We,
    directives: We,
    watch: Ri,
    provide: Or,
    inject: Bi
};

function Or(e, t) {
    return t ? e ? function () {
        return se(M(e) ? e.call(this, this) : e, M(t) ? t.call(this, this) : t)
    } : t : e
}

function Bi(e, t) {
    return We(Fn(e), Fn(t))
}

function Fn(e) {
    if (F(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
        return t
    }
    return e
}

function oe(e, t) {
    return e ? [...new Set([].concat(e, t))] : t
}

function We(e, t) {
    return e ? se(se(Object.create(null), e), t) : t
}

function Ri(e, t) {
    if (!e) return t;
    if (!t) return e;
    const n = se(Object.create(null), e);
    for (const r in t) n[r] = oe(e[r], t[r]);
    return n
}

function $i(e, t, n, r = !1) {
    const s = {}, o = {};
    Vt(o, on, 1), e.propsDefaults = Object.create(null), Hs(e, t, s, o);
    for (const i in e.propsOptions[0]) i in s || (s[i] = void 0);
    n ? e.props = r ? s : Zo(s) : e.type.props ? e.props = s : e.props = o, e.attrs = o
}

function Di(e, t, n, r) {
    const {props: s, attrs: o, vnode: {patchFlag: i}} = e, l = $(s), [f] = e.propsOptions;
    let a = !1;
    if ((r || i > 0) && !(i & 16)) {
        if (i & 8) {
            const g = e.vnode.dynamicProps;
            for (let b = 0; b < g.length; b++) {
                let m = g[b];
                if (en(e.emitsOptions, m)) continue;
                const x = t[m];
                if (f) if (N(o, m)) x !== o[m] && (o[m] = x, a = !0); else {
                    const S = ft(m);
                    s[S] = Mn(f, l, S, x, e, !1)
                } else x !== o[m] && (o[m] = x, a = !0)
            }
        }
    } else {
        Hs(e, t, s, o) && (a = !0);
        let g;
        for (const b in l) (!t || !N(t, b) && ((g = pt(b)) === b || !N(t, g))) && (f ? n && (n[b] !== void 0 || n[g] !== void 0) && (s[b] = Mn(f, l, b, void 0, e, !0)) : delete s[b]);
        if (o !== l) for (const b in o) (!t || !N(t, b) && !0) && (delete o[b], a = !0)
    }
    a && Se(e, "set", "$attrs")
}

function Hs(e, t, n, r) {
    const [s, o] = e.propsOptions;
    let i = !1, l;
    if (t) for (let f in t) {
        if (Rt(f)) continue;
        const a = t[f];
        let g;
        s && N(s, g = ft(f)) ? !o || !o.includes(g) ? n[g] = a : (l || (l = {}))[g] = a : en(e.emitsOptions, f) || (!(f in r) || a !== r[f]) && (r[f] = a, i = !0)
    }
    if (o) {
        const f = $(n), a = l || k;
        for (let g = 0; g < o.length; g++) {
            const b = o[g];
            n[b] = Mn(s, f, b, a[b], e, !N(a, b))
        }
    }
    return i
}

function Mn(e, t, n, r, s, o) {
    const i = e[n];
    if (i != null) {
        const l = N(i, "default");
        if (l && r === void 0) {
            const f = i.default;
            if (i.type !== Function && M(f)) {
                const {propsDefaults: a} = s;
                n in a ? r = a[n] : (ut(s), r = a[n] = f.call(null, t), Qe())
            } else r = f
        }
        i[0] && (o && !l ? r = !1 : i[1] && (r === "" || r === pt(n)) && (r = !0))
    }
    return r
}

function Us(e, t, n = !1) {
    const r = t.propsCache, s = r.get(e);
    if (s) return s;
    const o = e.props, i = {}, l = [];
    let f = !1;
    if (!M(e)) {
        const g = b => {
            f = !0;
            const [m, x] = Us(b, t, !0);
            se(i, m), x && l.push(...x)
        };
        !n && t.mixins.length && t.mixins.forEach(g), e.extends && g(e.extends), e.mixins && e.mixins.forEach(g)
    }
    if (!o && !f) return r.set(e, ot), ot;
    if (F(o)) for (let g = 0; g < o.length; g++) {
        const b = ft(o[g]);
        Ar(b) && (i[b] = k)
    } else if (o) for (const g in o) {
        const b = ft(g);
        if (Ar(b)) {
            const m = o[g], x = i[b] = F(m) || M(m) ? {type: m} : m;
            if (x) {
                const S = Tr(Boolean, x.type), L = Tr(String, x.type);
                x[0] = S > -1, x[1] = L < 0 || S < L, (S > -1 || N(x, "default")) && l.push(b)
            }
        }
    }
    const a = [i, l];
    return r.set(e, a), a
}

function Ar(e) {
    return e[0] !== "$"
}

function Cr(e) {
    const t = e && e.toString().match(/^\s*function (\w+)/);
    return t ? t[1] : e === null ? "null" : ""
}

function Pr(e, t) {
    return Cr(e) === Cr(t)
}

function Tr(e, t) {
    return F(t) ? t.findIndex(n => Pr(n, e)) : M(t) && Pr(t, e) ? 0 : -1
}

const Vs = e => e[0] === "_" || e === "$stable", Gn = e => F(e) ? e.map(Ae) : [Ae(e)], Hi = (e, t, n) => {
    if (t._n) return t;
    const r = fi((...s) => Gn(t(...s)), n);
    return r._c = !1, r
}, ks = (e, t, n) => {
    const r = e._ctx;
    for (const s in e) {
        if (Vs(s)) continue;
        const o = e[s];
        if (M(o)) t[s] = Hi(s, o, r); else if (o != null) {
            const i = Gn(o);
            t[s] = () => i
        }
    }
}, Ks = (e, t) => {
    const n = Gn(t);
    e.slots.default = () => n
}, Ui = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
        const n = t._;
        n ? (e.slots = $(t), Vt(t, "_", n)) : ks(t, e.slots = {})
    } else e.slots = {}, t && Ks(e, t);
    Vt(e.slots, on, 1)
}, Vi = (e, t, n) => {
    const {vnode: r, slots: s} = e;
    let o = !0, i = k;
    if (r.shapeFlag & 32) {
        const l = t._;
        l ? n && l === 1 ? o = !1 : (se(s, t), !n && l === 1 && delete s._) : (o = !t.$stable, ks(t, s)), i = t
    } else t && (Ks(e, t), i = {default: 1});
    if (o) for (const l in s) !Vs(l) && !(l in i) && delete s[l]
};

function Ws() {
    return {
        app: null,
        config: {
            isNativeTag: po,
            performance: !1,
            globalProperties: {},
            optionMergeStrategies: {},
            errorHandler: void 0,
            warnHandler: void 0,
            compilerOptions: {}
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap,
        propsCache: new WeakMap,
        emitsCache: new WeakMap
    }
}

let ki = 0;

function Ki(e, t) {
    return function (r, s = null) {
        M(r) || (r = Object.assign({}, r)), s != null && !ee(s) && (s = null);
        const o = Ws(), i = new Set;
        let l = !1;
        const f = o.app = {
            _uid: ki++,
            _component: r,
            _props: s,
            _container: null,
            _context: o,
            _instance: null,
            version: ul,
            get config() {
                return o.config
            },
            set config(a) {
            },
            use(a, ...g) {
                return i.has(a) || (a && M(a.install) ? (i.add(a), a.install(f, ...g)) : M(a) && (i.add(a), a(f, ...g))), f
            },
            mixin(a) {
                return o.mixins.includes(a) || o.mixins.push(a), f
            },
            component(a, g) {
                return g ? (o.components[a] = g, f) : o.components[a]
            },
            directive(a, g) {
                return g ? (o.directives[a] = g, f) : o.directives[a]
            },
            mount(a, g, b) {
                if (!l) {
                    const m = Ce(r, s);
                    return m.appContext = o, g && t ? t(m, a) : e(m, a, b), l = !0, f._container = a, a.__vue_app__ = f, ln(m.component) || m.component.proxy
                }
            },
            unmount() {
                l && (e(null, f._container), delete f._container.__vue_app__)
            },
            provide(a, g) {
                return o.provides[a] = g, f
            }
        };
        return f
    }
}

function Ln(e, t, n, r, s = !1) {
    if (F(e)) {
        e.forEach((m, x) => Ln(m, t && (F(t) ? t[x] : t), n, r, s));
        return
    }
    if (Dt(r) && !s) return;
    const o = r.shapeFlag & 4 ? ln(r.component) || r.component.proxy : r.el, i = s ? null : o, {i: l, r: f} = e,
        a = t && t.r, g = l.refs === k ? l.refs = {} : l.refs, b = l.setupState;
    if (a != null && a !== f && (G(a) ? (g[a] = null, N(b, a) && (b[a] = null)) : ne(a) && (a.value = null)), M(f)) He(f, l, 12, [i, g]); else {
        const m = G(f), x = ne(f);
        if (m || x) {
            const S = () => {
                if (e.f) {
                    const L = m ? g[f] : f.value;
                    s ? F(L) && Hn(L, o) : F(L) ? L.includes(o) || L.push(o) : m ? (g[f] = [o], N(b, f) && (b[f] = g[f])) : (f.value = [o], e.k && (g[e.k] = f.value))
                } else m ? (g[f] = i, N(b, f) && (b[f] = i)) : x && (f.value = i, e.k && (g[e.k] = i))
            };
            i ? (S.id = -1, ce(S, n)) : S()
        }
    }
}

const ce = gi;

function Wi(e) {
    return zi(e)
}

function zi(e, t) {
    const n = vo();
    n.__VUE__ = !0;
    const {
            insert: r,
            remove: s,
            patchProp: o,
            createElement: i,
            createText: l,
            createComment: f,
            setText: a,
            setElementText: g,
            parentNode: b,
            nextSibling: m,
            setScopeId: x = we,
            cloneNode: S,
            insertStaticContent: L
        } = e, T = (c, u, d, h = null, p = null, y = null, w = !1, v = null, E = !!u.dynamicChildren) => {
            if (c === u) return;
            c && !ze(c, u) && (h = Mt(c), je(c, p, y, !0), c = null), u.patchFlag === -2 && (E = !1, u.dynamicChildren = null);
            const {type: _, ref: A, shapeFlag: O} = u;
            switch (_) {
                case er:
                    P(c, u, d, h);
                    break;
                case Le:
                    Z(c, u, d, h);
                    break;
                case Ht:
                    c == null && D(u, d, h, w);
                    break;
                case ge:
                    Pe(c, u, d, h, p, y, w, v, E);
                    break;
                default:
                    O & 1 ? R(c, u, d, h, p, y, w, v, E) : O & 6 ? Ft(c, u, d, h, p, y, w, v, E) : (O & 64 || O & 128) && _.process(c, u, d, h, p, y, w, v, E, et)
            }
            A != null && p && Ln(A, c && c.ref, y, u || c, !u)
        }, P = (c, u, d, h) => {
            if (c == null) r(u.el = l(u.children), d, h); else {
                const p = u.el = c.el;
                u.children !== c.children && a(p, u.children)
            }
        }, Z = (c, u, d, h) => {
            c == null ? r(u.el = f(u.children || ""), d, h) : u.el = c.el
        }, D = (c, u, d, h) => {
            [c.el, c.anchor] = L(c.children, u, d, h, c.el, c.anchor)
        }, H = ({el: c, anchor: u}, d, h) => {
            let p;
            for (; c && c !== u;) p = m(c), r(c, d, h), c = p;
            r(u, d, h)
        }, Q = ({el: c, anchor: u}) => {
            let d;
            for (; c && c !== u;) d = m(c), s(c), c = d;
            s(u)
        }, R = (c, u, d, h, p, y, w, v, E) => {
            w = w || u.type === "svg", c == null ? re(u, d, h, p, y, w, v, E) : Y(c, u, p, y, w, v, E)
        }, re = (c, u, d, h, p, y, w, v) => {
            let E, _;
            const {type: A, props: O, shapeFlag: C, transition: I, patchFlag: B, dirs: U} = c;
            if (c.el && S !== void 0 && B === -1) E = c.el = S(c.el); else {
                if (E = c.el = i(c.type, y, O && O.is, O), C & 8 ? g(E, c.children) : C & 16 && z(c.children, E, null, h, p, y && A !== "foreignObject", w, v), U && ke(c, null, h, "created"), O) {
                    for (const W in O) W !== "value" && !Rt(W) && o(E, W, null, O[W], y, c.children, h, p, Ie);
                    "value" in O && o(E, "value", null, O.value), (_ = O.onVnodeBeforeMount) && Oe(_, h, c)
                }
                j(E, c, c.scopeId, w, h)
            }
            U && ke(c, null, h, "beforeMount");
            const V = (!p || p && !p.pendingBranch) && I && !I.persisted;
            V && I.beforeEnter(E), r(E, u, d), ((_ = O && O.onVnodeMounted) || V || U) && ce(() => {
                _ && Oe(_, h, c), V && I.enter(E), U && ke(c, null, h, "mounted")
            }, p)
        }, j = (c, u, d, h, p) => {
            if (d && x(c, d), h) for (let y = 0; y < h.length; y++) x(c, h[y]);
            if (p) {
                let y = p.subTree;
                if (u === y) {
                    const w = p.vnode;
                    j(c, w, w.scopeId, w.slotScopeIds, p.parent)
                }
            }
        }, z = (c, u, d, h, p, y, w, v, E = 0) => {
            for (let _ = E; _ < c.length; _++) {
                const A = c[_] = v ? $e(c[_]) : Ae(c[_]);
                T(null, A, u, d, h, p, y, w, v)
            }
        }, Y = (c, u, d, h, p, y, w) => {
            const v = u.el = c.el;
            let {patchFlag: E, dynamicChildren: _, dirs: A} = u;
            E |= c.patchFlag & 16;
            const O = c.props || k, C = u.props || k;
            let I;
            d && Ke(d, !1), (I = C.onVnodeBeforeUpdate) && Oe(I, d, u, c), A && ke(u, c, d, "beforeUpdate"), d && Ke(d, !0);
            const B = p && u.type !== "foreignObject";
            if (_ ? ie(c.dynamicChildren, _, v, d, h, B, y) : w || Te(c, u, v, null, d, h, B, y, !1), E > 0) {
                if (E & 16) me(v, u, O, C, d, h, p); else if (E & 2 && O.class !== C.class && o(v, "class", null, C.class, p), E & 4 && o(v, "style", O.style, C.style, p), E & 8) {
                    const U = u.dynamicProps;
                    for (let V = 0; V < U.length; V++) {
                        const W = U[V], be = O[W], tt = C[W];
                        (tt !== be || W === "value") && o(v, W, be, tt, p, c.children, d, h, Ie)
                    }
                }
                E & 1 && c.children !== u.children && g(v, u.children)
            } else !w && _ == null && me(v, u, O, C, d, h, p);
            ((I = C.onVnodeUpdated) || A) && ce(() => {
                I && Oe(I, d, u, c), A && ke(u, c, d, "updated")
            }, h)
        }, ie = (c, u, d, h, p, y, w) => {
            for (let v = 0; v < u.length; v++) {
                const E = c[v], _ = u[v], A = E.el && (E.type === ge || !ze(E, _) || E.shapeFlag & 70) ? b(E.el) : d;
                T(E, _, A, null, h, p, y, w, !0)
            }
        }, me = (c, u, d, h, p, y, w) => {
            if (d !== h) {
                for (const v in h) {
                    if (Rt(v)) continue;
                    const E = h[v], _ = d[v];
                    E !== _ && v !== "value" && o(c, v, _, E, w, u.children, p, y, Ie)
                }
                if (d !== k) for (const v in d) !Rt(v) && !(v in h) && o(c, v, d[v], null, w, u.children, p, y, Ie);
                "value" in h && o(c, "value", d.value, h.value)
            }
        }, Pe = (c, u, d, h, p, y, w, v, E) => {
            const _ = u.el = c ? c.el : l(""), A = u.anchor = c ? c.anchor : l("");
            let {patchFlag: O, dynamicChildren: C, slotScopeIds: I} = u;
            I && (v = v ? v.concat(I) : I), c == null ? (r(_, d, h), r(A, d, h), z(u.children, d, A, p, y, w, v, E)) : O > 0 && O & 64 && C && c.dynamicChildren ? (ie(c.dynamicChildren, C, d, p, y, w, v), (u.key != null || p && u === p.subTree) && zs(c, u, !0)) : Te(c, u, d, A, p, y, w, v, E)
        }, Ft = (c, u, d, h, p, y, w, v, E) => {
            u.slotScopeIds = v, c == null ? u.shapeFlag & 512 ? p.ctx.activate(u, d, h, w, E) : cn(u, d, h, p, y, w, E) : le(c, u, E)
        }, cn = (c, u, d, h, p, y, w) => {
            const v = c.component = sl(c, h, p);
            if (nn(c) && (v.ctx.renderer = et), ol(v), v.asyncDep) {
                if (p && p.registerDep(v, q), !c.el) {
                    const E = v.subTree = Ce(Le);
                    Z(null, E, u, d)
                }
                return
            }
            q(v, c, u, d, p, y, w)
        }, le = (c, u, d) => {
            const h = u.component = c.component;
            if (di(c, u, d)) if (h.asyncDep && !h.asyncResolved) {
                K(h, u, d);
                return
            } else h.next = u, ri(h.update), h.update(); else u.el = c.el, h.vnode = u
        }, q = (c, u, d, h, p, y, w) => {
            const v = () => {
                if (c.isMounted) {
                    let {next: A, bu: O, u: C, parent: I, vnode: B} = c, U = A, V;
                    Ke(c, !1), A ? (A.el = B.el, K(c, A, w)) : A = B, O && $t(O), (V = A.props && A.props.onVnodeBeforeUpdate) && Oe(V, I, A, B), Ke(c, !0);
                    const W = pn(c), be = c.subTree;
                    c.subTree = W, T(be, W, b(be.el), Mt(be), c, p, y), A.el = W.el, U === null && pi(c, W.el), C && ce(C, p), (V = A.props && A.props.onVnodeUpdated) && ce(() => Oe(V, I, A, B), p)
                } else {
                    let A;
                    const {el: O, props: C} = u, {bm: I, m: B, parent: U} = c, V = Dt(u);
                    if (Ke(c, !1), I && $t(I), !V && (A = C && C.onVnodeBeforeMount) && Oe(A, U, u), Ke(c, !0), O && an) {
                        const W = () => {
                            c.subTree = pn(c), an(O, c.subTree, c, p, null)
                        };
                        V ? u.type.__asyncLoader().then(() => !c.isUnmounted && W()) : W()
                    } else {
                        const W = c.subTree = pn(c);
                        T(null, W, d, h, c, p, y), u.el = W.el
                    }
                    if (B && ce(B, p), !V && (A = C && C.onVnodeMounted)) {
                        const W = u;
                        ce(() => Oe(A, U, W), p)
                    }
                    (u.shapeFlag & 256 || U && Dt(U.vnode) && U.vnode.shapeFlag & 256) && c.a && ce(c.a, p), c.isMounted = !0, u = d = h = null
                }
            }, E = c.effect = new Kn(v, () => xs(_), c.scope), _ = c.update = () => E.run();
            _.id = c.uid, Ke(c, !0), _()
        }, K = (c, u, d) => {
            u.component = c;
            const h = c.vnode.props;
            c.vnode = u, c.next = null, Di(c, u.props, h, d), Vi(c, u.children, d), ht(), Gt(void 0, c.update), gt()
        }, Te = (c, u, d, h, p, y, w, v, E = !1) => {
            const _ = c && c.children, A = c ? c.shapeFlag : 0, O = u.children, {patchFlag: C, shapeFlag: I} = u;
            if (C > 0) {
                if (C & 128) {
                    _t(_, O, d, h, p, y, w, v, E);
                    return
                } else if (C & 256) {
                    fn(_, O, d, h, p, y, w, v, E);
                    return
                }
            }
            I & 8 ? (A & 16 && Ie(_, p, y), O !== _ && g(d, O)) : A & 16 ? I & 16 ? _t(_, O, d, h, p, y, w, v, E) : Ie(_, p, y, !0) : (A & 8 && g(d, ""), I & 16 && z(O, d, h, p, y, w, v, E))
        }, fn = (c, u, d, h, p, y, w, v, E) => {
            c = c || ot, u = u || ot;
            const _ = c.length, A = u.length, O = Math.min(_, A);
            let C;
            for (C = 0; C < O; C++) {
                const I = u[C] = E ? $e(u[C]) : Ae(u[C]);
                T(c[C], I, d, null, p, y, w, v, E)
            }
            _ > A ? Ie(c, p, y, !0, !1, O) : z(u, d, h, p, y, w, v, E, O)
        }, _t = (c, u, d, h, p, y, w, v, E) => {
            let _ = 0;
            const A = u.length;
            let O = c.length - 1, C = A - 1;
            for (; _ <= O && _ <= C;) {
                const I = c[_], B = u[_] = E ? $e(u[_]) : Ae(u[_]);
                if (ze(I, B)) T(I, B, d, null, p, y, w, v, E); else break;
                _++
            }
            for (; _ <= O && _ <= C;) {
                const I = c[O], B = u[C] = E ? $e(u[C]) : Ae(u[C]);
                if (ze(I, B)) T(I, B, d, null, p, y, w, v, E); else break;
                O--, C--
            }
            if (_ > O) {
                if (_ <= C) {
                    const I = C + 1, B = I < A ? u[I].el : h;
                    for (; _ <= C;) T(null, u[_] = E ? $e(u[_]) : Ae(u[_]), d, B, p, y, w, v, E), _++
                }
            } else if (_ > C) for (; _ <= O;) je(c[_], p, y, !0), _++; else {
                const I = _, B = _, U = new Map;
                for (_ = B; _ <= C; _++) {
                    const fe = u[_] = E ? $e(u[_]) : Ae(u[_]);
                    fe.key != null && U.set(fe.key, _)
                }
                let V, W = 0;
                const be = C - B + 1;
                let tt = !1, lr = 0;
                const mt = new Array(be);
                for (_ = 0; _ < be; _++) mt[_] = 0;
                for (_ = I; _ <= O; _++) {
                    const fe = c[_];
                    if (W >= be) {
                        je(fe, p, y, !0);
                        continue
                    }
                    let xe;
                    if (fe.key != null) xe = U.get(fe.key); else for (V = B; V <= C; V++) if (mt[V - B] === 0 && ze(fe, u[V])) {
                        xe = V;
                        break
                    }
                    xe === void 0 ? je(fe, p, y, !0) : (mt[xe - B] = _ + 1, xe >= lr ? lr = xe : tt = !0, T(fe, u[xe], d, null, p, y, w, v, E), W++)
                }
                const cr = tt ? qi(mt) : ot;
                for (V = cr.length - 1, _ = be - 1; _ >= 0; _--) {
                    const fe = B + _, xe = u[fe], fr = fe + 1 < A ? u[fe + 1].el : h;
                    mt[_] === 0 ? T(null, xe, d, fr, p, y, w, v, E) : tt && (V < 0 || _ !== cr[V] ? Ge(xe, d, fr, 2) : V--)
                }
            }
        }, Ge = (c, u, d, h, p = null) => {
            const {el: y, type: w, transition: v, children: E, shapeFlag: _} = c;
            if (_ & 6) {
                Ge(c.component.subTree, u, d, h);
                return
            }
            if (_ & 128) {
                c.suspense.move(u, d, h);
                return
            }
            if (_ & 64) {
                w.move(c, u, d, et);
                return
            }
            if (w === ge) {
                r(y, u, d);
                for (let O = 0; O < E.length; O++) Ge(E[O], u, d, h);
                r(c.anchor, u, d);
                return
            }
            if (w === Ht) {
                H(c, u, d);
                return
            }
            if (h !== 2 && _ & 1 && v) if (h === 0) v.beforeEnter(y), r(y, u, d), ce(() => v.enter(y), p); else {
                const {leave: O, delayLeave: C, afterLeave: I} = v, B = () => r(y, u, d), U = () => {
                    O(y, () => {
                        B(), I && I()
                    })
                };
                C ? C(y, B, U) : U()
            } else r(y, u, d)
        }, je = (c, u, d, h = !1, p = !1) => {
            const {type: y, props: w, ref: v, children: E, dynamicChildren: _, shapeFlag: A, patchFlag: O, dirs: C} = c;
            if (v != null && Ln(v, null, d, c, !0), A & 256) {
                u.ctx.deactivate(c);
                return
            }
            const I = A & 1 && C, B = !Dt(c);
            let U;
            if (B && (U = w && w.onVnodeBeforeUnmount) && Oe(U, u, c), A & 6) oo(c.component, d, h); else {
                if (A & 128) {
                    c.suspense.unmount(d, h);
                    return
                }
                I && ke(c, null, u, "beforeUnmount"), A & 64 ? c.type.remove(c, u, d, p, et, h) : _ && (y !== ge || O > 0 && O & 64) ? Ie(_, u, d, !1, !0) : (y === ge && O & 384 || !p && A & 16) && Ie(E, u, d), h && or(c)
            }
            (B && (U = w && w.onVnodeUnmounted) || I) && ce(() => {
                U && Oe(U, u, c), I && ke(c, null, u, "unmounted")
            }, d)
        }, or = c => {
            const {type: u, el: d, anchor: h, transition: p} = c;
            if (u === ge) {
                so(d, h);
                return
            }
            if (u === Ht) {
                Q(c);
                return
            }
            const y = () => {
                s(d), p && !p.persisted && p.afterLeave && p.afterLeave()
            };
            if (c.shapeFlag & 1 && p && !p.persisted) {
                const {leave: w, delayLeave: v} = p, E = () => w(d, y);
                v ? v(c.el, y, E) : E()
            } else y()
        }, so = (c, u) => {
            let d;
            for (; c !== u;) d = m(c), s(c), c = d;
            s(u)
        }, oo = (c, u, d) => {
            const {bum: h, scope: p, update: y, subTree: w, um: v} = c;
            h && $t(h), p.stop(), y && (y.active = !1, je(w, c, u, d)), v && ce(v, u), ce(() => {
                c.isUnmounted = !0
            }, u), u && u.pendingBranch && !u.isUnmounted && c.asyncDep && !c.asyncResolved && c.suspenseId === u.pendingId && (u.deps--, u.deps === 0 && u.resolve())
        }, Ie = (c, u, d, h = !1, p = !1, y = 0) => {
            for (let w = y; w < c.length; w++) je(c[w], u, d, h, p)
        },
        Mt = c => c.shapeFlag & 6 ? Mt(c.component.subTree) : c.shapeFlag & 128 ? c.suspense.next() : m(c.anchor || c.el),
        ir = (c, u, d) => {
            c == null ? u._vnode && je(u._vnode, null, null, !0) : T(u._vnode || null, c, u, null, null, null, d), Cs(), u._vnode = c
        }, et = {p: T, um: je, m: Ge, r: or, mt: cn, mc: z, pc: Te, pbc: ie, n: Mt, o: e};
    let un, an;
    return t && ([un, an] = t(et)), {render: ir, hydrate: un, createApp: Ki(ir, un)}
}

function Ke({effect: e, update: t}, n) {
    e.allowRecurse = t.allowRecurse = n
}

function zs(e, t, n = !1) {
    const r = e.children, s = t.children;
    if (F(r) && F(s)) for (let o = 0; o < r.length; o++) {
        const i = r[o];
        let l = s[o];
        l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = s[o] = $e(s[o]), l.el = i.el), n || zs(i, l))
    }
}

function qi(e) {
    const t = e.slice(), n = [0];
    let r, s, o, i, l;
    const f = e.length;
    for (r = 0; r < f; r++) {
        const a = e[r];
        if (a !== 0) {
            if (s = n[n.length - 1], e[s] < a) {
                t[r] = s, n.push(r);
                continue
            }
            for (o = 0, i = n.length - 1; o < i;) l = o + i >> 1, e[n[l]] < a ? o = l + 1 : i = l;
            a < e[n[o]] && (o > 0 && (t[r] = n[o - 1]), n[o] = r)
        }
    }
    for (o = n.length, i = n[o - 1]; o-- > 0;) n[o] = i, i = t[i];
    return n
}

const Ji = e => e.__isTeleport, ge = Symbol(void 0), er = Symbol(void 0), Le = Symbol(void 0), Ht = Symbol(void 0),
    wt = [];
let Ee = null;

function Ye(e = !1) {
    wt.push(Ee = e ? null : [])
}

function Zi() {
    wt.pop(), Ee = wt[wt.length - 1] || null
}

let Tt = 1;

function Ir(e) {
    Tt += e
}

function Yi(e) {
    return e.dynamicChildren = Tt > 0 ? Ee || ot : null, Zi(), Tt > 0 && Ee && Ee.push(e), e
}

function Xe(e, t, n, r, s, o) {
    return Yi(X(e, t, n, r, s, o, !0))
}

function Xi(e) {
    return e ? e.__v_isVNode === !0 : !1
}

function ze(e, t) {
    return e.type === t.type && e.key === t.key
}

const on = "__vInternal", qs = ({key: e}) => e != null ? e : null,
    Ut = ({ref: e, ref_key: t, ref_for: n}) => e != null ? G(e) || ne(e) || M(e) ? {
        i: ye,
        r: e,
        k: t,
        f: !!n
    } : e : null;

function X(e, t = null, n = null, r = 0, s = null, o = e === ge ? 0 : 1, i = !1, l = !1) {
    const f = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && qs(t),
        ref: t && Ut(t),
        scopeId: tn,
        slotScopeIds: null,
        children: n,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: o,
        patchFlag: r,
        dynamicProps: s,
        dynamicChildren: null,
        appContext: null
    };
    return l ? (nr(f, n), o & 128 && e.normalize(f)) : n && (f.shapeFlag |= G(n) ? 8 : 16), Tt > 0 && !i && Ee && (f.patchFlag > 0 || o & 6) && f.patchFlag !== 32 && Ee.push(f), f
}

const Ce = Qi;

function Qi(e, t = null, n = null, r = 0, s = null, o = !1) {
    if ((!e || e === Fi) && (e = Le), Xi(e)) {
        const l = Ve(e, t, !0);
        return n && nr(l, n), Tt > 0 && !o && Ee && (l.shapeFlag & 6 ? Ee[Ee.indexOf(e)] = l : Ee.push(l)), l.patchFlag |= -2, l
    }
    if (fl(e) && (e = e.__vccOpts), t) {
        t = Gi(t);
        let {class: l, style: f} = t;
        l && !G(l) && (t.class = $n(l)), ee(f) && (_s(f) && !F(f) && (f = se({}, f)), t.style = xt(f))
    }
    const i = G(e) ? 1 : hi(e) ? 128 : Ji(e) ? 64 : ee(e) ? 4 : M(e) ? 2 : 0;
    return X(e, t, n, r, s, i, o, !0)
}

function Gi(e) {
    return e ? _s(e) || on in e ? se({}, e) : e : null
}

function Ve(e, t, n = !1) {
    const {props: r, ref: s, patchFlag: o, children: i} = e, l = t ? tl(r || {}, t) : r;
    return {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: l,
        key: l && qs(l),
        ref: t && t.ref ? n && s ? F(s) ? s.concat(Ut(t)) : [s, Ut(t)] : Ut(t) : s,
        scopeId: e.scopeId,
        slotScopeIds: e.slotScopeIds,
        children: i,
        target: e.target,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: t && e.type !== ge ? o === -1 ? 16 : o | 16 : o,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: e.transition,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && Ve(e.ssContent),
        ssFallback: e.ssFallback && Ve(e.ssFallback),
        el: e.el,
        anchor: e.anchor
    }
}

function tr(e = " ", t = 0) {
    return Ce(er, null, e, t)
}

function el(e, t) {
    const n = Ce(Ht, null, e);
    return n.staticCount = t, n
}

function Ae(e) {
    return e == null || typeof e == "boolean" ? Ce(Le) : F(e) ? Ce(ge, null, e.slice()) : typeof e == "object" ? $e(e) : Ce(er, null, String(e))
}

function $e(e) {
    return e.el === null || e.memo ? e : Ve(e)
}

function nr(e, t) {
    let n = 0;
    const {shapeFlag: r} = e;
    if (t == null) t = null; else if (F(t)) n = 16; else if (typeof t == "object") if (r & 65) {
        const s = t.default;
        s && (s._c && (s._d = !1), nr(e, s()), s._c && (s._d = !0));
        return
    } else {
        n = 32;
        const s = t._;
        !s && !(on in t) ? t._ctx = ye : s === 3 && ye && (ye.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024))
    } else M(t) ? (t = {default: t, _ctx: ye}, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [tr(t)]) : n = 8);
    e.children = t, e.shapeFlag |= n
}

function tl(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
        const r = e[n];
        for (const s in r) if (s === "class") t.class !== r.class && (t.class = $n([t.class, r.class])); else if (s === "style") t.style = xt([t.style, r.style]); else if (Jt(s)) {
            const o = t[s], i = r[s];
            i && o !== i && !(F(o) && o.includes(i)) && (t[s] = o ? [].concat(o, i) : i)
        } else s !== "" && (t[s] = r[s])
    }
    return t
}

function Oe(e, t, n, r = null) {
    _e(e, t, 7, [n, r])
}

const nl = Ws();
let rl = 0;

function sl(e, t, n) {
    const r = e.type, s = (t ? t.appContext : e.appContext) || nl, o = {
        uid: rl++,
        vnode: e,
        type: r,
        parent: t,
        appContext: s,
        root: null,
        next: null,
        subTree: null,
        effect: null,
        update: null,
        scope: new yo(!0),
        render: null,
        proxy: null,
        exposed: null,
        exposeProxy: null,
        withProxy: null,
        provides: t ? t.provides : Object.create(s.provides),
        accessCache: null,
        renderCache: [],
        components: null,
        directives: null,
        propsOptions: Us(r, s),
        emitsOptions: Ts(r, s),
        emit: null,
        emitted: null,
        propsDefaults: k,
        inheritAttrs: r.inheritAttrs,
        ctx: k,
        data: k,
        props: k,
        attrs: k,
        slots: k,
        refs: k,
        setupState: k,
        setupContext: null,
        suspense: n,
        suspenseId: n ? n.pendingId : 0,
        asyncDep: null,
        asyncResolved: !1,
        isMounted: !1,
        isUnmounted: !1,
        isDeactivated: !1,
        bc: null,
        c: null,
        bm: null,
        m: null,
        bu: null,
        u: null,
        um: null,
        bum: null,
        da: null,
        a: null,
        rtg: null,
        rtc: null,
        ec: null,
        sp: null
    };
    return o.ctx = {_: o}, o.root = t ? t.root : o, o.emit = ii.bind(null, o), e.ce && e.ce(o), o
}

let te = null;
const rr = () => te || ye, ut = e => {
    te = e, e.scope.on()
}, Qe = () => {
    te && te.scope.off(), te = null
};

function Js(e) {
    return e.vnode.shapeFlag & 4
}

let It = !1;

function ol(e, t = !1) {
    It = t;
    const {props: n, children: r} = e.vnode, s = Js(e);
    $i(e, n, s, t), Ui(e, r);
    const o = s ? il(e, t) : void 0;
    return It = !1, o
}

function il(e, t) {
    const n = e.type;
    e.accessCache = Object.create(null), e.proxy = ms(new Proxy(e.ctx, Li));
    const {setup: r} = n;
    if (r) {
        const s = e.setupContext = r.length > 1 ? cl(e) : null;
        ut(e), ht();
        const o = He(r, e, 0, [e.props, s]);
        if (gt(), Qe(), ts(o)) {
            if (o.then(Qe, Qe), t) return o.then(i => {
                Fr(e, i, t)
            }).catch(i => {
                Qt(i, e, 0)
            });
            e.asyncDep = o
        } else Fr(e, o, t)
    } else Zs(e, t)
}

function Fr(e, t, n) {
    M(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ee(t) && (e.setupState = Es(t)), Zs(e, n)
}

let Mr;

function Zs(e, t, n) {
    const r = e.type;
    if (!e.render) {
        if (!t && Mr && !r.render) {
            const s = r.template;
            if (s) {
                const {isCustomElement: o, compilerOptions: i} = e.appContext.config, {
                    delimiters: l,
                    compilerOptions: f
                } = r, a = se(se({isCustomElement: o, delimiters: l}, i), f);
                r.render = Mr(s, a)
            }
        }
        e.render = r.render || we
    }
    ut(e), ht(), Si(e), gt(), Qe()
}

function ll(e) {
    return new Proxy(e.attrs, {
        get(t, n) {
            return pe(e, "get", "$attrs"), t[n]
        }
    })
}

function cl(e) {
    const t = r => {
        e.exposed = r || {}
    };
    let n;
    return {
        get attrs() {
            return n || (n = ll(e))
        }, slots: e.slots, emit: e.emit, expose: t
    }
}

function ln(e) {
    if (e.exposed) return e.exposeProxy || (e.exposeProxy = new Proxy(Es(ms(e.exposed)), {
        get(t, n) {
            if (n in t) return t[n];
            if (n in Wt) return Wt[n](e)
        }
    }))
}

function fl(e) {
    return M(e) && "__vccOpts" in e
}

const at = (e, t) => ei(e, t, It), ul = "3.2.37", al = "http://www.w3.org/2000/svg",
    qe = typeof document != "undefined" ? document : null, Lr = qe && qe.createElement("template"), dl = {
        insert: (e, t, n) => {
            t.insertBefore(e, n || null)
        },
        remove: e => {
            const t = e.parentNode;
            t && t.removeChild(e)
        },
        createElement: (e, t, n, r) => {
            const s = t ? qe.createElementNS(al, e) : qe.createElement(e, n ? {is: n} : void 0);
            return e === "select" && r && r.multiple != null && s.setAttribute("multiple", r.multiple), s
        },
        createText: e => qe.createTextNode(e),
        createComment: e => qe.createComment(e),
        setText: (e, t) => {
            e.nodeValue = t
        },
        setElementText: (e, t) => {
            e.textContent = t
        },
        parentNode: e => e.parentNode,
        nextSibling: e => e.nextSibling,
        querySelector: e => qe.querySelector(e),
        setScopeId(e, t) {
            e.setAttribute(t, "")
        },
        cloneNode(e) {
            const t = e.cloneNode(!0);
            return "_value" in e && (t._value = e._value), t
        },
        insertStaticContent(e, t, n, r, s, o) {
            const i = n ? n.previousSibling : t.lastChild;
            if (s && (s === o || s.nextSibling)) for (; t.insertBefore(s.cloneNode(!0), n), !(s === o || !(s = s.nextSibling));) ; else {
                Lr.innerHTML = r ? `<svg>${e}</svg>` : e;
                const l = Lr.content;
                if (r) {
                    const f = l.firstChild;
                    for (; f.firstChild;) l.appendChild(f.firstChild);
                    l.removeChild(f)
                }
                t.insertBefore(l, n)
            }
            return [i ? i.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
        }
    };

function pl(e, t, n) {
    const r = e._vtc;
    r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t
}

function hl(e, t, n) {
    const r = e.style, s = G(n);
    if (n && !s) {
        for (const o in n) Sn(r, o, n[o]);
        if (t && !G(t)) for (const o in t) n[o] == null && Sn(r, o, "")
    } else {
        const o = r.display;
        s ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (r.display = o)
    }
}

const Sr = /\s*!important$/;

function Sn(e, t, n) {
    if (F(n)) n.forEach(r => Sn(e, t, r)); else if (n == null && (n = ""), t.startsWith("--")) e.setProperty(t, n); else {
        const r = gl(e, t);
        Sr.test(n) ? e.setProperty(pt(r), n.replace(Sr, ""), "important") : e[r] = n
    }
}

const Nr = ["Webkit", "Moz", "ms"], _n = {};

function gl(e, t) {
    const n = _n[t];
    if (n) return n;
    let r = ft(t);
    if (r !== "filter" && r in e) return _n[t] = r;
    r = ss(r);
    for (let s = 0; s < Nr.length; s++) {
        const o = Nr[s] + r;
        if (o in e) return _n[t] = o
    }
    return t
}

const jr = "http://www.w3.org/1999/xlink";

function _l(e, t, n, r, s) {
    if (r && t.startsWith("xlink:")) n == null ? e.removeAttributeNS(jr, t.slice(6, t.length)) : e.setAttributeNS(jr, t, n); else {
        const o = co(t);
        n == null || o && !Qr(n) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : n)
    }
}

function ml(e, t, n, r, s, o, i) {
    if (t === "innerHTML" || t === "textContent") {
        r && i(r, s, o), e[t] = n == null ? "" : n;
        return
    }
    if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
        e._value = n;
        const f = n == null ? "" : n;
        (e.value !== f || e.tagName === "OPTION") && (e.value = f), n == null && e.removeAttribute(t);
        return
    }
    let l = !1;
    if (n === "" || n == null) {
        const f = typeof e[t];
        f === "boolean" ? n = Qr(n) : n == null && f === "string" ? (n = "", l = !0) : f === "number" && (n = 0, l = !0)
    }
    try {
        e[t] = n
    } catch {
    }
    l && e.removeAttribute(t)
}

const [Ys, bl] = (() => {
    let e = Date.now, t = !1;
    if (typeof window != "undefined") {
        Date.now() > document.createEvent("Event").timeStamp && (e = performance.now.bind(performance));
        const n = navigator.userAgent.match(/firefox\/(\d+)/i);
        t = !!(n && Number(n[1]) <= 53)
    }
    return [e, t]
})();
let Nn = 0;
const vl = Promise.resolve(), yl = () => {
    Nn = 0
}, El = () => Nn || (vl.then(yl), Nn = Ys());

function st(e, t, n, r) {
    e.addEventListener(t, n, r)
}

function wl(e, t, n, r) {
    e.removeEventListener(t, n, r)
}

function xl(e, t, n, r, s = null) {
    const o = e._vei || (e._vei = {}), i = o[t];
    if (r && i) i.value = r; else {
        const [l, f] = Ol(t);
        if (r) {
            const a = o[t] = Al(r, s);
            st(e, l, a, f)
        } else i && (wl(e, l, i, f), o[t] = void 0)
    }
}

const Br = /(?:Once|Passive|Capture)$/;

function Ol(e) {
    let t;
    if (Br.test(e)) {
        t = {};
        let n;
        for (; n = e.match(Br);) e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0
    }
    return [pt(e.slice(2)), t]
}

function Al(e, t) {
    const n = r => {
        const s = r.timeStamp || Ys();
        (bl || s >= n.attached - 1) && _e(Cl(r, n.value), t, 5, [r])
    };
    return n.value = e, n.attached = El(), n
}

function Cl(e, t) {
    if (F(t)) {
        const n = e.stopImmediatePropagation;
        return e.stopImmediatePropagation = () => {
            n.call(e), e._stopped = !0
        }, t.map(r => s => !s._stopped && r && r(s))
    } else return t
}

const Rr = /^on[a-z]/, Pl = (e, t, n, r, s = !1, o, i, l, f) => {
    t === "class" ? pl(e, r, s) : t === "style" ? hl(e, n, r) : Jt(t) ? Dn(t) || xl(e, t, n, r, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Tl(e, t, r, s)) ? ml(e, t, r, o, i, l, f) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), _l(e, t, r, s))
};

function Tl(e, t, n, r) {
    return r ? !!(t === "innerHTML" || t === "textContent" || t in e && Rr.test(t) && M(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || Rr.test(t) && G(n) ? !1 : t in e
}

const Il = {
    name: String,
    type: String,
    css: {type: Boolean, default: !0},
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String
};
yi.props;
const $r = e => {
    const t = e.props["onUpdate:modelValue"] || !1;
    return F(t) ? n => $t(t, n) : t
};

function Fl(e) {
    e.target.composing = !0
}

function Dr(e) {
    const t = e.target;
    t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")))
}

const Hr = {
    created(e, {modifiers: {lazy: t, trim: n, number: r}}, s) {
        e._assign = $r(s);
        const o = r || s.props && s.props.type === "number";
        st(e, t ? "change" : "input", i => {
            if (i.target.composing) return;
            let l = e.value;
            n && (l = l.trim()), o && (l = bn(l)), e._assign(l)
        }), n && st(e, "change", () => {
            e.value = e.value.trim()
        }), t || (st(e, "compositionstart", Fl), st(e, "compositionend", Dr), st(e, "change", Dr))
    }, mounted(e, {value: t}) {
        e.value = t == null ? "" : t
    }, beforeUpdate(e, {value: t, modifiers: {lazy: n, trim: r, number: s}}, o) {
        if (e._assign = $r(o), e.composing || document.activeElement === e && e.type !== "range" && (n || r && e.value.trim() === t || (s || e.type === "number") && bn(e.value) === t)) return;
        const i = t == null ? "" : t;
        e.value !== i && (e.value = i)
    }
}, Ml = se({patchProp: Pl}, dl);
let Ur;

function Ll() {
    return Ur || (Ur = Wi(Ml))
}

const Sl = (...e) => {
    const t = Ll().createApp(...e), {mount: n} = t;
    return t.mount = r => {
        const s = Nl(r);
        if (!s) return;
        const o = t._component;
        !M(o) && !o.render && !o.template && (o.template = s.innerHTML), s.innerHTML = "";
        const i = n(s, !1, s instanceof SVGElement);
        return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), i
    }, t
};

function Nl(e) {
    return G(e) ? document.querySelector(e) : e
}

const jl = "modulepreload", Vr = {}, Bl = "/backify-font-logo-finder/", J = function (t, n) {
    return !n || n.length === 0 ? t() : Promise.all(n.map(r => {
        if (r = `${Bl}${r}`, r in Vr) return;
        Vr[r] = !0;
        const s = r.endsWith(".css"), o = s ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${r}"]${o}`)) return;
        const i = document.createElement("link");
        if (i.rel = s ? "stylesheet" : jl, s || (i.as = "script", i.crossOrigin = ""), i.href = r, document.head.appendChild(i), s) return new Promise((l, f) => {
            i.addEventListener("load", l), i.addEventListener("error", () => f(new Error(`Unable to preload CSS for ${r}`)))
        })
    })).then(() => t())
};
var sr = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [r, s] of t) n[r] = s;
    return n
};
const Rl = {}, $l = {xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 142.201 32"},
    Dl = el('<linearGradient id="color" x2="1" y2="1"><stop offset="0" stop-color="#2defc8"></stop><stop offset="1" stop-color="#daf796"></stop></linearGradient><g transform="translate(-165 -46)"><path d="M237.841,340H227.313a3.818,3.818,0,0,1-2.4-6.784l8.333-8.333v3.651a2.287,2.287,0,0,0,2.284,2.284h.023a2.287,2.287,0,0,0,2.284-2.284v-9.2a2.287,2.287,0,0,0-2.284-2.284h-9.2a2.287,2.287,0,0,0-2.284,2.284v.023a2.287,2.287,0,0,0,2.284,2.284H230l-8.26,8.26A3.826,3.826,0,0,1,215,327.415V308h25.193a9.321,9.321,0,0,1,.937.047,9.2,9.2,0,0,1,.913.139c.3.061.592.137.88.226s.569.192.844.309a9.208,9.208,0,0,1,4.886,4.886c.116.275.22.559.309.844s.166.584.226.88a9.2,9.2,0,0,1,.139.912,9.329,9.329,0,0,1,.048.939v.045a9.045,9.045,0,0,1-.056,1A8.91,8.91,0,0,1,246.254,324a8.89,8.89,0,0,1,3.065,5.771,9.048,9.048,0,0,1,.056,1v.045a9.325,9.325,0,0,1-.047.937,9.212,9.212,0,0,1-.139.913c-.061.3-.137.592-.226.88s-.192.569-.309.844a9.209,9.209,0,0,1-4.886,4.886c-.275.116-.559.22-.844.309s-.584.166-.88.226a9.2,9.2,0,0,1-.912.139,9.338,9.338,0,0,1-.939.048Z" transform="translate(-50 -262)" fill="url(#color)"></path><path class="text" d="M13.664-10.164a4.844,4.844,0,0,1,2.576,4.48A5.265,5.265,0,0,1,14.476-1.6,6.232,6.232,0,0,1,10.136,0H1.82V-19.6H9.548a6.1,6.1,0,0,1,4.242,1.554,5.1,5.1,0,0,1,1.722,3.962A4.78,4.78,0,0,1,13.664-10.164ZM9.548-15.988H5.684v4.312H9.548a2.01,2.01,0,0,0,1.5-.616,2.115,2.115,0,0,0,.6-1.54,2.142,2.142,0,0,0-.588-1.54A2,2,0,0,0,9.548-15.988Zm.588,12.376A2.177,2.177,0,0,0,11.76-4.27,2.284,2.284,0,0,0,12.4-5.936a2.249,2.249,0,0,0-.644-1.638,2.177,2.177,0,0,0-1.624-.658H5.684v4.62ZM29.456-14h3.612V0H29.456V-1.652A5.5,5.5,0,0,1,24.892.392a6.344,6.344,0,0,1-4.8-2.142,7.4,7.4,0,0,1-2-5.25,7.4,7.4,0,0,1,2-5.25,6.344,6.344,0,0,1,4.8-2.142,5.5,5.5,0,0,1,4.564,2.044ZM22.792-4.158a3.731,3.731,0,0,0,2.772,1.106A3.777,3.777,0,0,0,28.35-4.158,3.847,3.847,0,0,0,29.456-7,3.847,3.847,0,0,0,28.35-9.842a3.777,3.777,0,0,0-2.786-1.106,3.731,3.731,0,0,0-2.772,1.106A3.874,3.874,0,0,0,21.7-7,3.874,3.874,0,0,0,22.792-4.158ZM42.548.392A7.137,7.137,0,0,1,37.27-1.736,7.175,7.175,0,0,1,35.156-7a7.175,7.175,0,0,1,2.114-5.264,7.137,7.137,0,0,1,5.278-2.128,7.255,7.255,0,0,1,3.724.98A6.516,6.516,0,0,1,48.82-10.78L45.712-8.96a3.169,3.169,0,0,0-1.274-1.372,3.7,3.7,0,0,0-1.918-.5,3.619,3.619,0,0,0-2.688,1.078A3.761,3.761,0,0,0,38.768-7a3.726,3.726,0,0,0,1.064,2.73A3.619,3.619,0,0,0,42.52-3.192a3.84,3.84,0,0,0,1.946-.49A3.086,3.086,0,0,0,45.74-5.04l3.136,1.792A7.013,7.013,0,0,1,46.272-.6,7.177,7.177,0,0,1,42.548.392ZM63.8.01H59.6L54.5-6.35V.01H50.888v-19.6H54.5V-7.805l4.816-6.184h4.312L58-7.073Zm3.777-15.68a2.125,2.125,0,0,1-1.554-.658,2.125,2.125,0,0,1-.658-1.554,2.171,2.171,0,0,1,.658-1.568,2.1,2.1,0,0,1,1.554-.672,2.135,2.135,0,0,1,1.582.672,2.171,2.171,0,0,1,.658,1.568,2.125,2.125,0,0,1-.658,1.554A2.157,2.157,0,0,1,67.573-15.67ZM65.781.01v-14h3.612v14Zm14.3-16.52q-2.968-.224-2.968,2.38v.14H80.08v3.472H77.112V.01H73.5V-10.518H71.484V-13.99H73.5v-.14a5.865,5.865,0,0,1,1.652-4.508,6.4,6.4,0,0,1,4.928-1.344Zm12.257,2.52H96.2L91.1.033a9.234,9.234,0,0,1-2.9,4.358A6.642,6.642,0,0,1,83.713,5.61V2.25a3.629,3.629,0,0,0,2.31-.616A4.3,4.3,0,0,0,87.381-.438L81.641-13.99h3.948L89.24-4.58Z" transform="translate(211 71.802)"></path></g>', 2),
    Hl = [Dl];

function Ul(e, t) {
    return Ye(), Xe("svg", $l, Hl)
}

var Vl = sr(Rl, [["render", Ul]]), kr = "/backify-font-logo-finder/assets/remixicon.symbol.d4b9d612.svg", Kr;
const Xs = typeof window != "undefined", kl = e => typeof e == "string", mn = () => {
};
Xs && ((Kr = window == null ? void 0 : window.navigator) == null ? void 0 : Kr.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);

function Kl(e, t) {
    function n(...r) {
        e(() => t.apply(this, r), {fn: t, thisArg: this, args: r})
    }

    return n
}

const Qs = e => e();

function Wl(e = Qs) {
    const t = Me(!0);

    function n() {
        t.value = !1
    }

    function r() {
        t.value = !0
    }

    return {
        isActive: t, pause: n, resume: r, eventFilter: (...o) => {
            t.value && e(...o)
        }
    }
}

function Gs(e) {
    return wo() ? (xo(e), !0) : !1
}

function zl(e, t = !0) {
    rr() ? js(e) : t ? e() : Qn(e)
}

function ql(e, t = !0) {
    rr() ? sn(e) : t ? e() : Qn(e)
}

function Jl(e = !1, t = {}) {
    const {truthyValue: n = !0, falsyValue: r = !1} = t, s = ne(e), o = Me(e);

    function i(l) {
        return arguments.length ? (o.value = l, o.value) : (o.value = o.value === de(n) ? de(r) : de(n), o.value)
    }

    return s ? i : [o, i]
}

var Wr = Object.getOwnPropertySymbols, Zl = Object.prototype.hasOwnProperty, Yl = Object.prototype.propertyIsEnumerable,
    Xl = (e, t) => {
        var n = {};
        for (var r in e) Zl.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
        if (e != null && Wr) for (var r of Wr(e)) t.indexOf(r) < 0 && Yl.call(e, r) && (n[r] = e[r]);
        return n
    };

function Ql(e, t, n = {}) {
    const r = n, {eventFilter: s = Qs} = r, o = Xl(r, ["eventFilter"]);
    return ct(e, Kl(s, t), o)
}

var Gl = Object.defineProperty, ec = Object.defineProperties, tc = Object.getOwnPropertyDescriptors,
    qt = Object.getOwnPropertySymbols, eo = Object.prototype.hasOwnProperty, to = Object.prototype.propertyIsEnumerable,
    zr = (e, t, n) => t in e ? Gl(e, t, {enumerable: !0, configurable: !0, writable: !0, value: n}) : e[t] = n,
    nc = (e, t) => {
        for (var n in t || (t = {})) eo.call(t, n) && zr(e, n, t[n]);
        if (qt) for (var n of qt(t)) to.call(t, n) && zr(e, n, t[n]);
        return e
    }, rc = (e, t) => ec(e, tc(t)), sc = (e, t) => {
        var n = {};
        for (var r in e) eo.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
        if (e != null && qt) for (var r of qt(e)) t.indexOf(r) < 0 && to.call(e, r) && (n[r] = e[r]);
        return n
    };

function oc(e, t, n = {}) {
    const r = n, {eventFilter: s} = r, o = sc(r, ["eventFilter"]), {
        eventFilter: i,
        pause: l,
        resume: f,
        isActive: a
    } = Wl(s);
    return {stop: Ql(e, t, rc(nc({}, o), {eventFilter: i})), pause: l, resume: f, isActive: a}
}

function ic(e) {
    var t;
    const n = de(e);
    return (t = n == null ? void 0 : n.$el) != null ? t : n
}

const dt = Xs ? window : void 0;

function lc(...e) {
    let t, n, r, s;
    if (kl(e[0]) ? ([n, r, s] = e, t = dt) : [t, n, r, s] = e, !t) return mn;
    let o = mn;
    const i = ct(() => ic(t), f => {
        o(), f && (f.addEventListener(n, r, s), o = () => {
            f.removeEventListener(n, r, s), o = mn
        })
    }, {immediate: !0, flush: "post"}), l = () => {
        i(), o()
    };
    return Gs(l), l
}

function cc(e, t = {}) {
    const {window: n = dt} = t, r = Boolean(n && "matchMedia" in n && typeof n.matchMedia == "function");
    let s;
    const o = Me(!1), i = () => {
        !r || (s || (s = n.matchMedia(e)), o.value = s.matches)
    };
    return zl(() => {
        i(), s && ("addEventListener" in s ? s.addEventListener("change", i) : s.addListener(i), Gs(() => {
            "removeEventListener" in s ? s.removeEventListener("change", i) : s.removeListener(i)
        }))
    }), o
}

const jn = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {},
    Bn = "__vueuse_ssr_handlers__";
jn[Bn] = jn[Bn] || {};
const fc = jn[Bn];

function no(e, t) {
    return fc[e] || t
}

function uc(e) {
    return e == null ? "any" : e instanceof Set ? "set" : e instanceof Map ? "map" : e instanceof Date ? "date" : typeof e == "boolean" ? "boolean" : typeof e == "string" ? "string" : typeof e == "object" || Array.isArray(e) ? "object" : Number.isNaN(e) ? "any" : "number"
}

const ac = {
    boolean: {read: e => e === "true", write: e => String(e)},
    object: {read: e => JSON.parse(e), write: e => JSON.stringify(e)},
    number: {read: e => Number.parseFloat(e), write: e => String(e)},
    any: {read: e => e, write: e => String(e)},
    string: {read: e => e, write: e => String(e)},
    map: {read: e => new Map(JSON.parse(e)), write: e => JSON.stringify(Array.from(e.entries()))},
    set: {read: e => new Set(JSON.parse(e)), write: e => JSON.stringify(Array.from(e))},
    date: {read: e => new Date(e), write: e => e.toISOString()}
};

function dc(e, t, n, r = {}) {
    var s;
    const {
        flush: o = "pre",
        deep: i = !0,
        listenToStorageChanges: l = !0,
        writeDefaults: f = !0,
        shallow: a,
        window: g = dt,
        eventFilter: b,
        onError: m = R => {
            console.error(R)
        }
    } = r, x = (a ? Yo : Me)(t);
    if (!n) try {
        n = no("getDefaultStorage", () => {
            var R;
            return (R = dt) == null ? void 0 : R.localStorage
        })()
    } catch (R) {
        m(R)
    }
    if (!n) return x;
    const S = de(t), L = uc(S), T = (s = r.serializer) != null ? s : ac[L], {
        pause: P,
        resume: Z
    } = oc(x, () => D(x.value), {flush: o, deep: i, eventFilter: b});
    return g && l && lc(g, "storage", Q), Q(), x;

    function D(R) {
        try {
            R == null ? n.removeItem(e) : n.setItem(e, T.write(R))
        } catch (re) {
            m(re)
        }
    }

    function H(R) {
        if (!(R && R.key !== e)) {
            P();
            try {
                const re = R ? R.newValue : n.getItem(e);
                return re == null ? (f && S !== null && n.setItem(e, T.write(S)), S) : typeof re != "string" ? re : T.read(re)
            } catch (re) {
                m(re)
            } finally {
                Z()
            }
        }
    }

    function Q(R) {
        R && R.key !== e || (x.value = H(R))
    }
}

function ro(e) {
    return cc("(prefers-color-scheme: dark)", e)
}

var pc = Object.defineProperty, qr = Object.getOwnPropertySymbols, hc = Object.prototype.hasOwnProperty,
    gc = Object.prototype.propertyIsEnumerable,
    Jr = (e, t, n) => t in e ? pc(e, t, {enumerable: !0, configurable: !0, writable: !0, value: n}) : e[t] = n,
    _c = (e, t) => {
        for (var n in t || (t = {})) hc.call(t, n) && Jr(e, n, t[n]);
        if (qr) for (var n of qr(t)) gc.call(t, n) && Jr(e, n, t[n]);
        return e
    };

function mc(e = {}) {
    const {
            selector: t = "html",
            attribute: n = "class",
            window: r = dt,
            storage: s,
            storageKey: o = "vueuse-color-scheme",
            listenToStorageChanges: i = !0,
            storageRef: l,
            emitAuto: f
        } = e, a = _c({auto: "", light: "light", dark: "dark"}, e.modes || {}), g = ro({window: r}),
        b = at(() => g.value ? "dark" : "light"),
        m = l || (o == null ? Me("auto") : dc(o, "auto", s, {window: r, listenToStorageChanges: i})), x = at({
            get() {
                return m.value === "auto" && !f ? b.value : m.value
            }, set(P) {
                m.value = P
            }
        }), S = no("updateHTMLAttrs", (P, Z, D) => {
            const H = r == null ? void 0 : r.document.querySelector(P);
            if (!!H) if (Z === "class") {
                const Q = D.split(/\s/g);
                Object.values(a).flatMap(R => (R || "").split(/\s/g)).filter(Boolean).forEach(R => {
                    Q.includes(R) ? H.classList.add(R) : H.classList.remove(R)
                })
            } else H.setAttribute(Z, D)
        });

    function L(P) {
        var Z;
        const D = P === "auto" ? b.value : P;
        S(t, n, (Z = a[D]) != null ? Z : D)
    }

    function T(P) {
        e.onChanged ? e.onChanged(P, L) : L(P)
    }

    return ct(x, T, {flush: "post", immediate: !0}), ql(() => T(x.value)), x
}

var bc = Object.defineProperty, vc = Object.defineProperties, yc = Object.getOwnPropertyDescriptors,
    Zr = Object.getOwnPropertySymbols, Ec = Object.prototype.hasOwnProperty, wc = Object.prototype.propertyIsEnumerable,
    Yr = (e, t, n) => t in e ? bc(e, t, {enumerable: !0, configurable: !0, writable: !0, value: n}) : e[t] = n,
    xc = (e, t) => {
        for (var n in t || (t = {})) Ec.call(t, n) && Yr(e, n, t[n]);
        if (Zr) for (var n of Zr(t)) wc.call(t, n) && Yr(e, n, t[n]);
        return e
    }, Oc = (e, t) => vc(e, yc(t));

function Ac(e = {}) {
    const {valueDark: t = "dark", valueLight: n = "", window: r = dt} = e, s = mc(Oc(xc({}, e), {
        onChanged: (l, f) => {
            var a;
            e.onChanged ? (a = e.onChanged) == null || a.call(e, l === "dark") : f(l)
        }, modes: {dark: t, light: n}
    })), o = ro({window: r});
    return at({
        get() {
            return s.value === "dark"
        }, set(l) {
            l === o.value ? s.value = "auto" : s.value = l ? "dark" : "light"
        }
    })
}

var Xr;
(function (e) {
    e.UP = "UP", e.RIGHT = "RIGHT", e.DOWN = "DOWN", e.LEFT = "LEFT", e.NONE = "NONE"
})(Xr || (Xr = {}));
const Cc = {class: "container"}, Pc = {class: "navbar"}, Tc = {key: 0}, Ic = ["xlink:href"], Fc = {key: 1},
    Mc = ["xlink:href"], Lc = Ss({
        __name: "Navbar", setup(e) {
            const t = Ac(), n = Jl(t);
            return (r, s) => (Ye(), Xe("nav", Cc, [X("div", Pc, [Ce(Vl, {class: "logo"}), X("div", {
                class: "theme",
                onClick: s[0] || (s[0] = o => de(n)())
            }, [de(t) ? (Ye(), Xe("svg", Tc, [X("use", {"xlink:href": `${de(kr)}#ri-moon-line`}, null, 8, Ic)])) : (Ye(), Xe("svg", Fc, [X("use", {"xlink:href": `${de(kr)}#ri-sun-line`}, null, 8, Mc)]))])])]))
        }
    });
var Sc = sr(Lc, [["__scopeId", "data-v-292edb9e"]]);
const Nc = e => (li("data-v-3523515e"), e = e(), ci(), e), jc = {class: "container"},
    Bc = Nc(() => X("label", {for: "logo"}, "Upload Logo", -1)), Rc = {for: "name", class: "form-label"},
    $c = tr("Name "), Dc = {for: "spacing", class: "form-label"}, Hc = tr("Spacing (px) "), Uc = {class: "logos"},
    Vc = {class: "text-block"}, kc = {class: "headline"}, Kc = {class: "logo"}, Wc = Ss({
        __name: "App", setup(e) {
            const t = Me(), n = Me(), r = Me(12), s = at(() => r.value), o = Me("Backify"), i = at(() => o.value), l = {
                "../public/fonts/Acumin-Bold.otf": () => J(() => import("/backify-font-logo-finder/assets/Acumin-Bold.5ca6bcad.js"), []),
                "../public/fonts/Aeonik-Bold.otf": () => J(() => import("/backify-font-logo-finder/assets/Aeonik-Bold.d574d4fe.js"), []),
                "../public/fonts/AktivGrotesk-Bold.otf": () => J(() => import("/backify-font-logo-finder/assets/AktivGrotesk-Bold.254e0c5c.js"), []),
                "../public/fonts/Avenir-Bold.otf": () => J(() => import("/backify-font-logo-finder/assets/Avenir-Bold.4c484e47.js"), []),
                "../public/fonts/Averta-Bold.otf": () => J(() => import("/backify-font-logo-finder/assets/Averta-Bold.7312be2d.js"), []),
                "../public/fonts/Biennale-Bold.otf": () => J(() => import("/backify-font-logo-finder/assets/Biennale-Bold.8bac8c10.js"), []),
                "../public/fonts/Cera-Bold.otf": () => J(() => import("/backify-font-logo-finder/assets/Cera-Bold.ccea2f5d.js"), []),
                "../public/fonts/Circular-Bold.otf": () => J(() => import("/backify-font-logo-finder/assets/Circular-Bold.992cd255.js"), []),
                "../public/fonts/Familiar-Bold.otf": () => J(() => import("/backify-font-logo-finder/assets/Familiar-Bold.db191bf5.js"), []),
                "../public/fonts/Forma-Bold.otf": () => J(() => import("/backify-font-logo-finder/assets/Forma-Bold.e72a9e87.js"), []),
                "../public/fonts/Futura-Bold.otf": () => J(() => import("/backify-font-logo-finder/assets/Futura-Bold.d1c310be.js"), []),
                "../public/fonts/Gilroy-Bold.otf": () => J(() => import("/backify-font-logo-finder/assets/Gilroy-Bold.6f8736f3.js"), []),
                "../public/fonts/Hurme-Bold.otf": () => J(() => import("/backify-font-logo-finder/assets/Hurme-Bold.2d2d0fcd.js"), []),
                "../public/fonts/ITCAvantGarde-SemiBold.otf": () => J(() => import("/backify-font-logo-finder/assets/ITCAvantGarde-SemiBold.21c72a81.js"), []),
                "../public/fonts/Montserrat-Bold.otf": () => J(() => import("/backify-font-logo-finder/assets/Montserrat-Bold.76b3d74d.js"), []),
                "../public/fonts/Nexa-Bold.otf": () => J(() => import("/backify-font-logo-finder/assets/Nexa-Bold.37f4218d.js"), []),
                "../public/fonts/Objective-Bold.otf": () => J(() => import("/backify-font-logo-finder/assets/Objective-Bold.dbb98a18.js"), []),
                "../public/fonts/Pangram-Bold.otf": () => J(() => import("/backify-font-logo-finder/assets/Pangram-Bold.81f8fe50.js"), []),
                "../public/fonts/SpaceGrotesk-Bold.otf": () => J(() => import("/backify-font-logo-finder/assets/SpaceGrotesk-Bold.830637b5.js"), []),
                "../public/fonts/TitlingGothic-Medium.otf": () => J(() => import("/backify-font-logo-finder/assets/TitlingGothic-Medium.0750e8e2.js"), []),
                "../public/fonts/Visby-Bold.otf": () => J(() => import("/backify-font-logo-finder/assets/Visby-Bold.58730283.js"), [])
            }, f = /[^/]+(?=-)/g;
            let a = [];
            for (const b in l) {
                const m = b.substring(25).match(f)[0];
                a.push(m);
                const x = new FontFace(m, `url('${b}')`);
                x.load(), document.fonts.add(x)
            }
            sn(() => {
                n.value.forEach(b => {
                    b.src = "/backify-font-logo-finder/favicon.svg"
                })
            });

            function g() {
                const b = t.value.files[0], m = new FileReader;
                m.onloadend = () => {
                    n.value.forEach(x => {
                        x.src = m.result
                    })
                }, m.readAsDataURL(b)
            }

            return (b, m) => (Ye(), Xe(ge, null, [Ce(Sc), X("div", jc, [X("form", null, [X("div", null, [X("input", {
                ref_key: "logo",
                ref: t,
                id: "logo",
                type: "file",
                accept: ".png,.svg",
                onChange: g
            }, null, 544), Bc]), X("label", Rc, [$c, wr(X("input", {
                id: "name",
                type: "text",
                "onUpdate:modelValue": m[0] || (m[0] = x => o.value = x)
            }, null, 512), [[Hr, o.value]])]), X("label", Dc, [Hc, wr(X("input", {
                id: "spacing",
                type: "number",
                min: "0",
                max: "36",
                "onUpdate:modelValue": m[1] || (m[1] = x => r.value = x)
            }, null, 512), [[Hr, r.value]])])]), X("div", Uc, [(Ye(!0), Xe(ge, null, Mi(de(a), x => (Ye(), Xe("div", Vc, [X("p", kc, ur(x), 1), X("div", Kc, [X("img", {
                class: "icon",
                ref_for: !0,
                ref_key: "logoIcon",
                ref: n,
                alt: "",
                style: xt(`margin-right: ${de(s)}px`)
            }, null, 4), X("p", {class: "name", style: xt(`font-family: ${x}`)}, ur(de(i)), 5)])]))), 256))])])], 64))
        }
    });
var zc = sr(Wc, [["__scopeId", "data-v-3523515e"]]);
Sl(zc).mount("#app");
