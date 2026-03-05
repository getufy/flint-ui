(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const u of document.querySelectorAll('link[rel="modulepreload"]'))c(u);new MutationObserver(u=>{for(const f of u)if(f.type==="childList")for(const b of f.addedNodes)b.tagName==="LINK"&&b.rel==="modulepreload"&&c(b)}).observe(document,{childList:!0,subtree:!0});function r(u){const f={};return u.integrity&&(f.integrity=u.integrity),u.referrerPolicy&&(f.referrerPolicy=u.referrerPolicy),u.crossOrigin==="use-credentials"?f.credentials="include":u.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function c(u){if(u.ep)return;u.ep=!0;const f=r(u);fetch(u.href,f)}})();function xU(p){return p&&p.__esModule&&Object.prototype.hasOwnProperty.call(p,"default")?p.default:p}var Ng={exports:{}},sp={},Sg={exports:{}},wc={exports:{}};wc.exports;var eE;function NU(){return eE||(eE=1,(function(p,l){(function(){function r(y,k){Object.defineProperty(f.prototype,y,{get:function(){console.warn("%s(...) is deprecated in plain JavaScript React classes. %s",k[0],k[1])}})}function c(y){return y===null||typeof y!="object"?null:(y=xs&&y[xs]||y["@@iterator"],typeof y=="function"?y:null)}function u(y,k){y=(y=y.constructor)&&(y.displayName||y.name)||"ReactClass";var Y=y+"."+k;bl[Y]||(console.error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",k,y),bl[Y]=!0)}function f(y,k,Y){this.props=y,this.context=k,this.refs=Ke,this.updater=Y||gl}function b(){}function v(y,k,Y){this.props=y,this.context=k,this.refs=Ke,this.updater=Y||gl}function N(){}function O(y){return""+y}function z(y){try{O(y);var k=!1}catch{k=!0}if(k){k=console;var Y=k.error,X=typeof Symbol=="function"&&Symbol.toStringTag&&y[Symbol.toStringTag]||y.constructor.name||"Object";return Y.call(k,"The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",X),O(y)}}function A(y){if(y==null)return null;if(typeof y=="function")return y.$$typeof===Bp?null:y.displayName||y.name||null;if(typeof y=="string")return y;switch(y){case H:return"Fragment";case Ze:return"Profiler";case xe:return"StrictMode";case dt:return"Suspense";case Nn:return"SuspenseList";case F:return"Activity"}if(typeof y=="object")switch(typeof y.tag=="number"&&console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),y.$$typeof){case ot:return"Portal";case Vt:return y.displayName||"Context";case De:return(y._context.displayName||"Context")+".Consumer";case bo:var k=y.render;return y=y.displayName,y||(y=k.displayName||k.name||"",y=y!==""?"ForwardRef("+y+")":"ForwardRef"),y;case Wi:return k=y.displayName||null,k!==null?k:A(y.type)||"Memo";case _a:k=y._payload,y=y._init;try{return A(y(k))}catch{}}return null}function x(y){if(y===H)return"<>";if(typeof y=="object"&&y!==null&&y.$$typeof===_a)return"<...>";try{var k=A(y);return k?"<"+k+">":"<...>"}catch{return"<...>"}}function C(){var y=ne.A;return y===null?null:y.getOwner()}function B(){return Error("react-stack-top-frame")}function G(y){if(Ss.call(y,"key")){var k=Object.getOwnPropertyDescriptor(y,"key").get;if(k&&k.isReactWarning)return!1}return y.key!==void 0}function J(y,k){function Y(){yl||(yl=!0,console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",k))}Y.isReactWarning=!0,Object.defineProperty(y,"key",{get:Y,configurable:!0})}function I(){var y=A(this.type);return Gc[y]||(Gc[y]=!0,console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.")),y=this.props.ref,y!==void 0?y:null}function $e(y,k,Y,X,ae,Ne){var se=Y.ref;return y={$$typeof:Ge,type:y,key:k,props:Y,_owner:X},(se!==void 0?se:null)!==null?Object.defineProperty(y,"ref",{enumerable:!1,get:I}):Object.defineProperty(y,"ref",{enumerable:!1,value:null}),y._store={},Object.defineProperty(y._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:0}),Object.defineProperty(y,"_debugInfo",{configurable:!1,enumerable:!1,writable:!0,value:null}),Object.defineProperty(y,"_debugStack",{configurable:!1,enumerable:!1,writable:!0,value:ae}),Object.defineProperty(y,"_debugTask",{configurable:!1,enumerable:!1,writable:!0,value:Ne}),Object.freeze&&(Object.freeze(y.props),Object.freeze(y)),y}function ce(y,k){return k=$e(y.type,k,y.props,y._owner,y._debugStack,y._debugTask),y._store&&(k._store.validated=y._store.validated),k}function Te(y){St(y)?y._store&&(y._store.validated=1):typeof y=="object"&&y!==null&&y.$$typeof===_a&&(y._payload.status==="fulfilled"?St(y._payload.value)&&y._payload.value._store&&(y._payload.value._store.validated=1):y._store&&(y._store.validated=1))}function St(y){return typeof y=="object"&&y!==null&&y.$$typeof===Ge}function Ie(y){var k={"=":"=0",":":"=2"};return"$"+y.replace(/[=:]/g,function(Y){return k[Y]})}function jt(y,k){return typeof y=="object"&&y!==null&&y.key!=null?(z(y.key),Ie(""+y.key)):k.toString(36)}function et(y){switch(y.status){case"fulfilled":return y.value;case"rejected":throw y.reason;default:switch(typeof y.status=="string"?y.then(N,N):(y.status="pending",y.then(function(k){y.status==="pending"&&(y.status="fulfilled",y.value=k)},function(k){y.status==="pending"&&(y.status="rejected",y.reason=k)})),y.status){case"fulfilled":return y.value;case"rejected":throw y.reason}}throw y}function At(y,k,Y,X,ae){var Ne=typeof y;(Ne==="undefined"||Ne==="boolean")&&(y=null);var se=!1;if(y===null)se=!0;else switch(Ne){case"bigint":case"string":case"number":se=!0;break;case"object":switch(y.$$typeof){case Ge:case ot:se=!0;break;case _a:return se=y._init,At(se(y._payload),k,Y,X,ae)}}if(se){se=y,ae=ae(se);var Be=X===""?"."+jt(se,0):X;return Ns(ae)?(Y="",Be!=null&&(Y=Be.replace(Xc,"$&/")+"/"),At(ae,k,Y,"",function(ci){return ci})):ae!=null&&(St(ae)&&(ae.key!=null&&(se&&se.key===ae.key||z(ae.key)),Y=ce(ae,Y+(ae.key==null||se&&se.key===ae.key?"":(""+ae.key).replace(Xc,"$&/")+"/")+Be),X!==""&&se!=null&&St(se)&&se.key==null&&se._store&&!se._store.validated&&(Y._store.validated=2),ae=Y),k.push(ae)),1}if(se=0,Be=X===""?".":X+":",Ns(y))for(var Se=0;Se<y.length;Se++)X=y[Se],Ne=Be+jt(X,Se),se+=At(X,k,Y,Ne,ae);else if(Se=c(y),typeof Se=="function")for(Se===y.entries&&(vo||console.warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead."),vo=!0),y=Se.call(y),Se=0;!(X=y.next()).done;)X=X.value,Ne=Be+jt(X,Se++),se+=At(X,k,Y,Ne,ae);else if(Ne==="object"){if(typeof y.then=="function")return At(et(y),k,Y,X,ae);throw k=String(y),Error("Objects are not valid as a React child (found: "+(k==="[object Object]"?"object with keys {"+Object.keys(y).join(", ")+"}":k)+"). If you meant to render a collection of children, use an array instead.")}return se}function le(y,k,Y){if(y==null)return y;var X=[],ae=0;return At(y,X,"","",function(Ne){return k.call(Y,Ne,ae++)}),X}function Lt(y){if(y._status===-1){var k=y._ioInfo;k!=null&&(k.start=k.end=performance.now()),k=y._result;var Y=k();if(Y.then(function(ae){if(y._status===0||y._status===-1){y._status=1,y._result=ae;var Ne=y._ioInfo;Ne!=null&&(Ne.end=performance.now()),Y.status===void 0&&(Y.status="fulfilled",Y.value=ae)}},function(ae){if(y._status===0||y._status===-1){y._status=2,y._result=ae;var Ne=y._ioInfo;Ne!=null&&(Ne.end=performance.now()),Y.status===void 0&&(Y.status="rejected",Y.reason=ae)}}),k=y._ioInfo,k!=null){k.value=Y;var X=Y.displayName;typeof X=="string"&&(k.name=X)}y._status===-1&&(y._status=0,y._result=Y)}if(y._status===1)return k=y._result,k===void 0&&console.error(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`,k),"default"in k||console.error(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`,k),k.default;throw y._result}function ve(){var y=ne.H;return y===null&&console.error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`),y}function ke(){ne.asyncTransitions--}function Pt(y){if(vl===null)try{var k=("require"+Math.random()).slice(0,7);vl=(p&&p[k]).call(p,"timers").setImmediate}catch{vl=function(X){Qr===!1&&(Qr=!0,typeof MessageChannel>"u"&&console.error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));var ae=new MessageChannel;ae.port1.onmessage=X,ae.port2.postMessage(void 0)}}return vl(y)}function ui(y){return 1<y.length&&typeof AggregateError=="function"?new AggregateError(y):y[0]}function Z(y,k){k!==xo-1&&console.error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "),xo=k}function de(y,k,Y){var X=ne.actQueue;if(X!==null)if(X.length!==0)try{be(X),Pt(function(){return de(y,k,Y)});return}catch(ae){ne.thrownErrors.push(ae)}else ne.actQueue=null;0<ne.thrownErrors.length?(X=ui(ne.thrownErrors),ne.thrownErrors.length=0,Y(X)):k(y)}function be(y){if(!Es){Es=!0;var k=0;try{for(;k<y.length;k++){var Y=y[k];do{ne.didUsePromise=!1;var X=Y(!1);if(X!==null){if(ne.didUsePromise){y[k]=Y,y.splice(0,k);return}Y=X}else break}while(!0)}y.length=0}catch(ae){y.splice(0,k+1),ne.thrownErrors.push(ae)}finally{Es=!1}}}typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());var Ge=Symbol.for("react.transitional.element"),ot=Symbol.for("react.portal"),H=Symbol.for("react.fragment"),xe=Symbol.for("react.strict_mode"),Ze=Symbol.for("react.profiler"),De=Symbol.for("react.consumer"),Vt=Symbol.for("react.context"),bo=Symbol.for("react.forward_ref"),dt=Symbol.for("react.suspense"),Nn=Symbol.for("react.suspense_list"),Wi=Symbol.for("react.memo"),_a=Symbol.for("react.lazy"),F=Symbol.for("react.activity"),xs=Symbol.iterator,bl={},gl={isMounted:function(){return!1},enqueueForceUpdate:function(y){u(y,"forceUpdate")},enqueueReplaceState:function(y){u(y,"replaceState")},enqueueSetState:function(y){u(y,"setState")}},go=Object.assign,Ke={};Object.freeze(Ke),f.prototype.isReactComponent={},f.prototype.setState=function(y,k){if(typeof y!="object"&&typeof y!="function"&&y!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,y,k,"setState")},f.prototype.forceUpdate=function(y){this.updater.enqueueForceUpdate(this,y,"forceUpdate")};var ti={isMounted:["isMounted","Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],replaceState:["replaceState","Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]};for(No in ti)ti.hasOwnProperty(No)&&r(No,ti[No]);b.prototype=f.prototype,ti=v.prototype=new b,ti.constructor=v,go(ti,f.prototype),ti.isPureReactComponent=!0;var Ns=Array.isArray,Bp=Symbol.for("react.client.reference"),ne={H:null,A:null,T:null,S:null,actQueue:null,asyncTransitions:0,isBatchingLegacy:!1,didScheduleLegacyUpdate:!1,didUsePromise:!1,thrownErrors:[],getCurrentStack:null,recentlyCreatedOwnerStacks:0},Ss=Object.prototype.hasOwnProperty,Hn=console.createTask?console.createTask:function(){return null};ti={react_stack_bottom_frame:function(y){return y()}};var yl,yo,Gc={},Yr=ti.react_stack_bottom_frame.bind(ti,B)(),Gr=Hn(x(B)),vo=!1,Xc=/\/+/g,Xr=typeof reportError=="function"?reportError:function(y){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var k=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof y=="object"&&y!==null&&typeof y.message=="string"?String(y.message):String(y),error:y});if(!window.dispatchEvent(k))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",y);return}console.error(y)},Qr=!1,vl=null,xo=0,xl=!1,Es=!1,_s=typeof queueMicrotask=="function"?function(y){queueMicrotask(function(){return queueMicrotask(y)})}:Pt;ti=Object.freeze({__proto__:null,c:function(y){return ve().useMemoCache(y)}});var No={map:le,forEach:function(y,k,Y){le(y,function(){k.apply(this,arguments)},Y)},count:function(y){var k=0;return le(y,function(){k++}),k},toArray:function(y){return le(y,function(k){return k})||[]},only:function(y){if(!St(y))throw Error("React.Children.only expected to receive a single React element child.");return y}};l.Activity=F,l.Children=No,l.Component=f,l.Fragment=H,l.Profiler=Ze,l.PureComponent=v,l.StrictMode=xe,l.Suspense=dt,l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=ne,l.__COMPILER_RUNTIME=ti,l.act=function(y){var k=ne.actQueue,Y=xo;xo++;var X=ne.actQueue=k!==null?k:[],ae=!1;try{var Ne=y()}catch(Se){ne.thrownErrors.push(Se)}if(0<ne.thrownErrors.length)throw Z(k,Y),y=ui(ne.thrownErrors),ne.thrownErrors.length=0,y;if(Ne!==null&&typeof Ne=="object"&&typeof Ne.then=="function"){var se=Ne;return _s(function(){ae||xl||(xl=!0,console.error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"))}),{then:function(Se,ci){ae=!0,se.then(function(qn){if(Z(k,Y),Y===0){try{be(X),Pt(function(){return de(qn,Se,ci)})}catch(ws){ne.thrownErrors.push(ws)}if(0<ne.thrownErrors.length){var Qc=ui(ne.thrownErrors);ne.thrownErrors.length=0,ci(Qc)}}else Se(qn)},function(qn){Z(k,Y),0<ne.thrownErrors.length&&(qn=ui(ne.thrownErrors),ne.thrownErrors.length=0),ci(qn)})}}}var Be=Ne;if(Z(k,Y),Y===0&&(be(X),X.length!==0&&_s(function(){ae||xl||(xl=!0,console.error("A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"))}),ne.actQueue=null),0<ne.thrownErrors.length)throw y=ui(ne.thrownErrors),ne.thrownErrors.length=0,y;return{then:function(Se,ci){ae=!0,Y===0?(ne.actQueue=X,Pt(function(){return de(Be,Se,ci)})):Se(Be)}}},l.cache=function(y){return function(){return y.apply(null,arguments)}},l.cacheSignal=function(){return null},l.captureOwnerStack=function(){var y=ne.getCurrentStack;return y===null?null:y()},l.cloneElement=function(y,k,Y){if(y==null)throw Error("The argument must be a React element, but you passed "+y+".");var X=go({},y.props),ae=y.key,Ne=y._owner;if(k!=null){var se;e:{if(Ss.call(k,"ref")&&(se=Object.getOwnPropertyDescriptor(k,"ref").get)&&se.isReactWarning){se=!1;break e}se=k.ref!==void 0}se&&(Ne=C()),G(k)&&(z(k.key),ae=""+k.key);for(Be in k)!Ss.call(k,Be)||Be==="key"||Be==="__self"||Be==="__source"||Be==="ref"&&k.ref===void 0||(X[Be]=k[Be])}var Be=arguments.length-2;if(Be===1)X.children=Y;else if(1<Be){se=Array(Be);for(var Se=0;Se<Be;Se++)se[Se]=arguments[Se+2];X.children=se}for(X=$e(y.type,ae,X,Ne,y._debugStack,y._debugTask),ae=2;ae<arguments.length;ae++)Te(arguments[ae]);return X},l.createContext=function(y){return y={$$typeof:Vt,_currentValue:y,_currentValue2:y,_threadCount:0,Provider:null,Consumer:null},y.Provider=y,y.Consumer={$$typeof:De,_context:y},y._currentRenderer=null,y._currentRenderer2=null,y},l.createElement=function(y,k,Y){for(var X=2;X<arguments.length;X++)Te(arguments[X]);X={};var ae=null;if(k!=null)for(Se in yo||!("__self"in k)||"key"in k||(yo=!0,console.warn("Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform")),G(k)&&(z(k.key),ae=""+k.key),k)Ss.call(k,Se)&&Se!=="key"&&Se!=="__self"&&Se!=="__source"&&(X[Se]=k[Se]);var Ne=arguments.length-2;if(Ne===1)X.children=Y;else if(1<Ne){for(var se=Array(Ne),Be=0;Be<Ne;Be++)se[Be]=arguments[Be+2];Object.freeze&&Object.freeze(se),X.children=se}if(y&&y.defaultProps)for(Se in Ne=y.defaultProps,Ne)X[Se]===void 0&&(X[Se]=Ne[Se]);ae&&J(X,typeof y=="function"?y.displayName||y.name||"Unknown":y);var Se=1e4>ne.recentlyCreatedOwnerStacks++;return $e(y,ae,X,C(),Se?Error("react-stack-top-frame"):Yr,Se?Hn(x(y)):Gr)},l.createRef=function(){var y={current:null};return Object.seal(y),y},l.forwardRef=function(y){y!=null&&y.$$typeof===Wi?console.error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."):typeof y!="function"?console.error("forwardRef requires a render function but was given %s.",y===null?"null":typeof y):y.length!==0&&y.length!==2&&console.error("forwardRef render functions accept exactly two parameters: props and ref. %s",y.length===1?"Did you forget to use the ref parameter?":"Any additional parameter will be undefined."),y!=null&&y.defaultProps!=null&&console.error("forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?");var k={$$typeof:bo,render:y},Y;return Object.defineProperty(k,"displayName",{enumerable:!1,configurable:!0,get:function(){return Y},set:function(X){Y=X,y.name||y.displayName||(Object.defineProperty(y,"name",{value:X}),y.displayName=X)}}),k},l.isValidElement=St,l.lazy=function(y){y={_status:-1,_result:y};var k={$$typeof:_a,_payload:y,_init:Lt},Y={name:"lazy",start:-1,end:-1,value:null,owner:null,debugStack:Error("react-stack-top-frame"),debugTask:console.createTask?console.createTask("lazy()"):null};return y._ioInfo=Y,k._debugInfo=[{awaited:Y}],k},l.memo=function(y,k){y==null&&console.error("memo: The first argument must be a component. Instead received: %s",y===null?"null":typeof y),k={$$typeof:Wi,type:y,compare:k===void 0?null:k};var Y;return Object.defineProperty(k,"displayName",{enumerable:!1,configurable:!0,get:function(){return Y},set:function(X){Y=X,y.name||y.displayName||(Object.defineProperty(y,"name",{value:X}),y.displayName=X)}}),k},l.startTransition=function(y){var k=ne.T,Y={};Y._updatedFibers=new Set,ne.T=Y;try{var X=y(),ae=ne.S;ae!==null&&ae(Y,X),typeof X=="object"&&X!==null&&typeof X.then=="function"&&(ne.asyncTransitions++,X.then(ke,ke),X.then(N,Xr))}catch(Ne){Xr(Ne)}finally{k===null&&Y._updatedFibers&&(y=Y._updatedFibers.size,Y._updatedFibers.clear(),10<y&&console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.")),k!==null&&Y.types!==null&&(k.types!==null&&k.types!==Y.types&&console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."),k.types=Y.types),ne.T=k}},l.unstable_useCacheRefresh=function(){return ve().useCacheRefresh()},l.use=function(y){return ve().use(y)},l.useActionState=function(y,k,Y){return ve().useActionState(y,k,Y)},l.useCallback=function(y,k){return ve().useCallback(y,k)},l.useContext=function(y){var k=ve();return y.$$typeof===De&&console.error("Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"),k.useContext(y)},l.useDebugValue=function(y,k){return ve().useDebugValue(y,k)},l.useDeferredValue=function(y,k){return ve().useDeferredValue(y,k)},l.useEffect=function(y,k){return y==null&&console.warn("React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?"),ve().useEffect(y,k)},l.useEffectEvent=function(y){return ve().useEffectEvent(y)},l.useId=function(){return ve().useId()},l.useImperativeHandle=function(y,k,Y){return ve().useImperativeHandle(y,k,Y)},l.useInsertionEffect=function(y,k){return y==null&&console.warn("React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?"),ve().useInsertionEffect(y,k)},l.useLayoutEffect=function(y,k){return y==null&&console.warn("React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?"),ve().useLayoutEffect(y,k)},l.useMemo=function(y,k){return ve().useMemo(y,k)},l.useOptimistic=function(y,k){return ve().useOptimistic(y,k)},l.useReducer=function(y,k,Y){return ve().useReducer(y,k,Y)},l.useRef=function(y){return ve().useRef(y)},l.useState=function(y){return ve().useState(y)},l.useSyncExternalStore=function(y,k,Y){return ve().useSyncExternalStore(y,k,Y)},l.useTransition=function(){return ve().useTransition()},l.version="19.2.4",typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error())})()})(wc,wc.exports)),wc.exports}var tE;function Rp(){return tE||(tE=1,Sg.exports=NU()),Sg.exports}var iE;function SU(){if(iE)return sp;iE=1;return(function(){function p(H){if(H==null)return null;if(typeof H=="function")return H.$$typeof===Lt?null:H.displayName||H.name||null;if(typeof H=="string")return H;switch(H){case J:return"Fragment";case $e:return"Profiler";case I:return"StrictMode";case Ie:return"Suspense";case jt:return"SuspenseList";case le:return"Activity"}if(typeof H=="object")switch(typeof H.tag=="number"&&console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),H.$$typeof){case G:return"Portal";case Te:return H.displayName||"Context";case ce:return(H._context.displayName||"Context")+".Consumer";case St:var xe=H.render;return H=H.displayName,H||(H=xe.displayName||xe.name||"",H=H!==""?"ForwardRef("+H+")":"ForwardRef"),H;case et:return xe=H.displayName||null,xe!==null?xe:p(H.type)||"Memo";case At:xe=H._payload,H=H._init;try{return p(H(xe))}catch{}}return null}function l(H){return""+H}function r(H){try{l(H);var xe=!1}catch{xe=!0}if(xe){xe=console;var Ze=xe.error,De=typeof Symbol=="function"&&Symbol.toStringTag&&H[Symbol.toStringTag]||H.constructor.name||"Object";return Ze.call(xe,"The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",De),l(H)}}function c(H){if(H===J)return"<>";if(typeof H=="object"&&H!==null&&H.$$typeof===At)return"<...>";try{var xe=p(H);return xe?"<"+xe+">":"<...>"}catch{return"<...>"}}function u(){var H=ve.A;return H===null?null:H.getOwner()}function f(){return Error("react-stack-top-frame")}function b(H){if(ke.call(H,"key")){var xe=Object.getOwnPropertyDescriptor(H,"key").get;if(xe&&xe.isReactWarning)return!1}return H.key!==void 0}function v(H,xe){function Ze(){Z||(Z=!0,console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",xe))}Ze.isReactWarning=!0,Object.defineProperty(H,"key",{get:Ze,configurable:!0})}function N(){var H=p(this.type);return de[H]||(de[H]=!0,console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.")),H=this.props.ref,H!==void 0?H:null}function O(H,xe,Ze,De,Vt,bo){var dt=Ze.ref;return H={$$typeof:B,type:H,key:xe,props:Ze,_owner:De},(dt!==void 0?dt:null)!==null?Object.defineProperty(H,"ref",{enumerable:!1,get:N}):Object.defineProperty(H,"ref",{enumerable:!1,value:null}),H._store={},Object.defineProperty(H._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:0}),Object.defineProperty(H,"_debugInfo",{configurable:!1,enumerable:!1,writable:!0,value:null}),Object.defineProperty(H,"_debugStack",{configurable:!1,enumerable:!1,writable:!0,value:Vt}),Object.defineProperty(H,"_debugTask",{configurable:!1,enumerable:!1,writable:!0,value:bo}),Object.freeze&&(Object.freeze(H.props),Object.freeze(H)),H}function z(H,xe,Ze,De,Vt,bo){var dt=xe.children;if(dt!==void 0)if(De)if(Pt(dt)){for(De=0;De<dt.length;De++)A(dt[De]);Object.freeze&&Object.freeze(dt)}else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");else A(dt);if(ke.call(xe,"key")){dt=p(H);var Nn=Object.keys(xe).filter(function(_a){return _a!=="key"});De=0<Nn.length?"{key: someKey, "+Nn.join(": ..., ")+": ...}":"{key: someKey}",ot[dt+De]||(Nn=0<Nn.length?"{"+Nn.join(": ..., ")+": ...}":"{}",console.error(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,De,dt,Nn,dt),ot[dt+De]=!0)}if(dt=null,Ze!==void 0&&(r(Ze),dt=""+Ze),b(xe)&&(r(xe.key),dt=""+xe.key),"key"in xe){Ze={};for(var Wi in xe)Wi!=="key"&&(Ze[Wi]=xe[Wi])}else Ze=xe;return dt&&v(Ze,typeof H=="function"?H.displayName||H.name||"Unknown":H),O(H,dt,Ze,u(),Vt,bo)}function A(H){x(H)?H._store&&(H._store.validated=1):typeof H=="object"&&H!==null&&H.$$typeof===At&&(H._payload.status==="fulfilled"?x(H._payload.value)&&H._payload.value._store&&(H._payload.value._store.validated=1):H._store&&(H._store.validated=1))}function x(H){return typeof H=="object"&&H!==null&&H.$$typeof===B}var C=Rp(),B=Symbol.for("react.transitional.element"),G=Symbol.for("react.portal"),J=Symbol.for("react.fragment"),I=Symbol.for("react.strict_mode"),$e=Symbol.for("react.profiler"),ce=Symbol.for("react.consumer"),Te=Symbol.for("react.context"),St=Symbol.for("react.forward_ref"),Ie=Symbol.for("react.suspense"),jt=Symbol.for("react.suspense_list"),et=Symbol.for("react.memo"),At=Symbol.for("react.lazy"),le=Symbol.for("react.activity"),Lt=Symbol.for("react.client.reference"),ve=C.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ke=Object.prototype.hasOwnProperty,Pt=Array.isArray,ui=console.createTask?console.createTask:function(){return null};C={react_stack_bottom_frame:function(H){return H()}};var Z,de={},be=C.react_stack_bottom_frame.bind(C,f)(),Ge=ui(c(f)),ot={};sp.Fragment=J,sp.jsxDEV=function(H,xe,Ze,De){var Vt=1e4>ve.recentlyCreatedOwnerStacks++;return z(H,xe,Ze,De,Vt?Error("react-stack-top-frame"):be,Vt?ui(c(H)):Ge)}})(),sp}var nE;function EU(){return nE||(nE=1,Ng.exports=SU()),Ng.exports}var h=EU(),gt=Rp();const R=xU(gt);var Eg={exports:{}},Sc={},_g={exports:{}},wg={},aE;function _U(){return aE||(aE=1,(function(p){(function(){function l(){if(St=!1,At){var Z=p.unstable_now();ve=Z;var de=!0;try{e:{ce=!1,Te&&(Te=!1,jt(le),le=-1),$e=!0;var be=I;try{t:{for(b(Z),J=c(C);J!==null&&!(J.expirationTime>Z&&N());){var Ge=J.callback;if(typeof Ge=="function"){J.callback=null,I=J.priorityLevel;var ot=Ge(J.expirationTime<=Z);if(Z=p.unstable_now(),typeof ot=="function"){J.callback=ot,b(Z),de=!0;break t}J===c(C)&&u(C),b(Z)}else u(C);J=c(C)}if(J!==null)de=!0;else{var H=c(B);H!==null&&O(v,H.startTime-Z),de=!1}}break e}finally{J=null,I=be,$e=!1}de=void 0}}finally{de?ke():At=!1}}}function r(Z,de){var be=Z.length;Z.push(de);e:for(;0<be;){var Ge=be-1>>>1,ot=Z[Ge];if(0<f(ot,de))Z[Ge]=de,Z[be]=ot,be=Ge;else break e}}function c(Z){return Z.length===0?null:Z[0]}function u(Z){if(Z.length===0)return null;var de=Z[0],be=Z.pop();if(be!==de){Z[0]=be;e:for(var Ge=0,ot=Z.length,H=ot>>>1;Ge<H;){var xe=2*(Ge+1)-1,Ze=Z[xe],De=xe+1,Vt=Z[De];if(0>f(Ze,be))De<ot&&0>f(Vt,Ze)?(Z[Ge]=Vt,Z[De]=be,Ge=De):(Z[Ge]=Ze,Z[xe]=be,Ge=xe);else if(De<ot&&0>f(Vt,be))Z[Ge]=Vt,Z[De]=be,Ge=De;else break e}}return de}function f(Z,de){var be=Z.sortIndex-de.sortIndex;return be!==0?be:Z.id-de.id}function b(Z){for(var de=c(B);de!==null;){if(de.callback===null)u(B);else if(de.startTime<=Z)u(B),de.sortIndex=de.expirationTime,r(C,de);else break;de=c(B)}}function v(Z){if(Te=!1,b(Z),!ce)if(c(C)!==null)ce=!0,At||(At=!0,ke());else{var de=c(B);de!==null&&O(v,de.startTime-Z)}}function N(){return St?!0:!(p.unstable_now()-ve<Lt)}function O(Z,de){le=Ie(function(){Z(p.unstable_now())},de)}if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error()),p.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var z=performance;p.unstable_now=function(){return z.now()}}else{var A=Date,x=A.now();p.unstable_now=function(){return A.now()-x}}var C=[],B=[],G=1,J=null,I=3,$e=!1,ce=!1,Te=!1,St=!1,Ie=typeof setTimeout=="function"?setTimeout:null,jt=typeof clearTimeout=="function"?clearTimeout:null,et=typeof setImmediate<"u"?setImmediate:null,At=!1,le=-1,Lt=5,ve=-1;if(typeof et=="function")var ke=function(){et(l)};else if(typeof MessageChannel<"u"){var Pt=new MessageChannel,ui=Pt.port2;Pt.port1.onmessage=l,ke=function(){ui.postMessage(null)}}else ke=function(){Ie(l,0)};p.unstable_IdlePriority=5,p.unstable_ImmediatePriority=1,p.unstable_LowPriority=4,p.unstable_NormalPriority=3,p.unstable_Profiling=null,p.unstable_UserBlockingPriority=2,p.unstable_cancelCallback=function(Z){Z.callback=null},p.unstable_forceFrameRate=function(Z){0>Z||125<Z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Lt=0<Z?Math.floor(1e3/Z):5},p.unstable_getCurrentPriorityLevel=function(){return I},p.unstable_next=function(Z){switch(I){case 1:case 2:case 3:var de=3;break;default:de=I}var be=I;I=de;try{return Z()}finally{I=be}},p.unstable_requestPaint=function(){St=!0},p.unstable_runWithPriority=function(Z,de){switch(Z){case 1:case 2:case 3:case 4:case 5:break;default:Z=3}var be=I;I=Z;try{return de()}finally{I=be}},p.unstable_scheduleCallback=function(Z,de,be){var Ge=p.unstable_now();switch(typeof be=="object"&&be!==null?(be=be.delay,be=typeof be=="number"&&0<be?Ge+be:Ge):be=Ge,Z){case 1:var ot=-1;break;case 2:ot=250;break;case 5:ot=1073741823;break;case 4:ot=1e4;break;default:ot=5e3}return ot=be+ot,Z={id:G++,callback:de,priorityLevel:Z,startTime:be,expirationTime:ot,sortIndex:-1},be>Ge?(Z.sortIndex=be,r(B,Z),c(C)===null&&Z===c(B)&&(Te?(jt(le),le=-1):Te=!0,O(v,be-Ge))):(Z.sortIndex=ot,r(C,Z),ce||$e||(ce=!0,At||(At=!0,ke()))),Z},p.unstable_shouldYield=N,p.unstable_wrapCallback=function(Z){var de=I;return function(){var be=I;I=de;try{return Z.apply(this,arguments)}finally{I=be}}},typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error())})()})(wg)),wg}var oE;function wU(){return oE||(oE=1,_g.exports=_U()),_g.exports}var Ag={exports:{}},oi={},lE;function AU(){if(lE)return oi;lE=1;return(function(){function p(){}function l(A){return""+A}function r(A,x,C){var B=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;try{l(B);var G=!1}catch{G=!0}return G&&(console.error("The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",typeof Symbol=="function"&&Symbol.toStringTag&&B[Symbol.toStringTag]||B.constructor.name||"Object"),l(B)),{$$typeof:O,key:B==null?null:""+B,children:A,containerInfo:x,implementation:C}}function c(A,x){if(A==="font")return"";if(typeof x=="string")return x==="use-credentials"?x:""}function u(A){return A===null?"`null`":A===void 0?"`undefined`":A===""?"an empty string":'something with type "'+typeof A+'"'}function f(A){return A===null?"`null`":A===void 0?"`undefined`":A===""?"an empty string":typeof A=="string"?JSON.stringify(A):typeof A=="number"?"`"+A+"`":'something with type "'+typeof A+'"'}function b(){var A=z.H;return A===null&&console.error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`),A}typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());var v=Rp(),N={d:{f:p,r:function(){throw Error("Invalid form element. requestFormReset must be passed a form that was rendered by React.")},D:p,C:p,L:p,m:p,X:p,S:p,M:p},p:0,findDOMNode:null},O=Symbol.for("react.portal"),z=v.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;typeof Map=="function"&&Map.prototype!=null&&typeof Map.prototype.forEach=="function"&&typeof Set=="function"&&Set.prototype!=null&&typeof Set.prototype.clear=="function"&&typeof Set.prototype.forEach=="function"||console.error("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"),oi.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=N,oi.createPortal=function(A,x){var C=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!x||x.nodeType!==1&&x.nodeType!==9&&x.nodeType!==11)throw Error("Target container is not a DOM element.");return r(A,x,null,C)},oi.flushSync=function(A){var x=z.T,C=N.p;try{if(z.T=null,N.p=2,A)return A()}finally{z.T=x,N.p=C,N.d.f()&&console.error("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task.")}},oi.preconnect=function(A,x){typeof A=="string"&&A?x!=null&&typeof x!="object"?console.error("ReactDOM.preconnect(): Expected the `options` argument (second) to be an object but encountered %s instead. The only supported option at this time is `crossOrigin` which accepts a string.",f(x)):x!=null&&typeof x.crossOrigin!="string"&&console.error("ReactDOM.preconnect(): Expected the `crossOrigin` option (second argument) to be a string but encountered %s instead. Try removing this option or passing a string value instead.",u(x.crossOrigin)):console.error("ReactDOM.preconnect(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",u(A)),typeof A=="string"&&(x?(x=x.crossOrigin,x=typeof x=="string"?x==="use-credentials"?x:"":void 0):x=null,N.d.C(A,x))},oi.prefetchDNS=function(A){if(typeof A!="string"||!A)console.error("ReactDOM.prefetchDNS(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",u(A));else if(1<arguments.length){var x=arguments[1];typeof x=="object"&&x.hasOwnProperty("crossOrigin")?console.error("ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. It looks like the you are attempting to set a crossOrigin property for this DNS lookup hint. Browsers do not perform DNS queries using CORS and setting this attribute on the resource hint has no effect. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.",f(x)):console.error("ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.",f(x))}typeof A=="string"&&N.d.D(A)},oi.preinit=function(A,x){if(typeof A=="string"&&A?x==null||typeof x!="object"?console.error("ReactDOM.preinit(): Expected the `options` argument (second) to be an object with an `as` property describing the type of resource to be preinitialized but encountered %s instead.",f(x)):x.as!=="style"&&x.as!=="script"&&console.error('ReactDOM.preinit(): Expected the `as` property in the `options` argument (second) to contain a valid value describing the type of resource to be preinitialized but encountered %s instead. Valid values for `as` are "style" and "script".',f(x.as)):console.error("ReactDOM.preinit(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",u(A)),typeof A=="string"&&x&&typeof x.as=="string"){var C=x.as,B=c(C,x.crossOrigin),G=typeof x.integrity=="string"?x.integrity:void 0,J=typeof x.fetchPriority=="string"?x.fetchPriority:void 0;C==="style"?N.d.S(A,typeof x.precedence=="string"?x.precedence:void 0,{crossOrigin:B,integrity:G,fetchPriority:J}):C==="script"&&N.d.X(A,{crossOrigin:B,integrity:G,fetchPriority:J,nonce:typeof x.nonce=="string"?x.nonce:void 0})}},oi.preinitModule=function(A,x){var C="";typeof A=="string"&&A||(C+=" The `href` argument encountered was "+u(A)+"."),x!==void 0&&typeof x!="object"?C+=" The `options` argument encountered was "+u(x)+".":x&&"as"in x&&x.as!=="script"&&(C+=" The `as` option encountered was "+f(x.as)+"."),C?console.error("ReactDOM.preinitModule(): Expected up to two arguments, a non-empty `href` string and, optionally, an `options` object with a valid `as` property.%s",C):(C=x&&typeof x.as=="string"?x.as:"script",C)==="script"||(C=f(C),console.error('ReactDOM.preinitModule(): Currently the only supported "as" type for this function is "script" but received "%s" instead. This warning was generated for `href` "%s". In the future other module types will be supported, aligning with the import-attributes proposal. Learn more here: (https://github.com/tc39/proposal-import-attributes)',C,A)),typeof A=="string"&&(typeof x=="object"&&x!==null?(x.as==null||x.as==="script")&&(C=c(x.as,x.crossOrigin),N.d.M(A,{crossOrigin:C,integrity:typeof x.integrity=="string"?x.integrity:void 0,nonce:typeof x.nonce=="string"?x.nonce:void 0})):x==null&&N.d.M(A))},oi.preload=function(A,x){var C="";if(typeof A=="string"&&A||(C+=" The `href` argument encountered was "+u(A)+"."),x==null||typeof x!="object"?C+=" The `options` argument encountered was "+u(x)+".":typeof x.as=="string"&&x.as||(C+=" The `as` option encountered was "+u(x.as)+"."),C&&console.error('ReactDOM.preload(): Expected two arguments, a non-empty `href` string and an `options` object with an `as` property valid for a `<link rel="preload" as="..." />` tag.%s',C),typeof A=="string"&&typeof x=="object"&&x!==null&&typeof x.as=="string"){C=x.as;var B=c(C,x.crossOrigin);N.d.L(A,C,{crossOrigin:B,integrity:typeof x.integrity=="string"?x.integrity:void 0,nonce:typeof x.nonce=="string"?x.nonce:void 0,type:typeof x.type=="string"?x.type:void 0,fetchPriority:typeof x.fetchPriority=="string"?x.fetchPriority:void 0,referrerPolicy:typeof x.referrerPolicy=="string"?x.referrerPolicy:void 0,imageSrcSet:typeof x.imageSrcSet=="string"?x.imageSrcSet:void 0,imageSizes:typeof x.imageSizes=="string"?x.imageSizes:void 0,media:typeof x.media=="string"?x.media:void 0})}},oi.preloadModule=function(A,x){var C="";typeof A=="string"&&A||(C+=" The `href` argument encountered was "+u(A)+"."),x!==void 0&&typeof x!="object"?C+=" The `options` argument encountered was "+u(x)+".":x&&"as"in x&&typeof x.as!="string"&&(C+=" The `as` option encountered was "+u(x.as)+"."),C&&console.error('ReactDOM.preloadModule(): Expected two arguments, a non-empty `href` string and, optionally, an `options` object with an `as` property valid for a `<link rel="modulepreload" as="..." />` tag.%s',C),typeof A=="string"&&(x?(C=c(x.as,x.crossOrigin),N.d.m(A,{as:typeof x.as=="string"&&x.as!=="script"?x.as:void 0,crossOrigin:C,integrity:typeof x.integrity=="string"?x.integrity:void 0})):N.d.m(A))},oi.requestFormReset=function(A){N.d.r(A)},oi.unstable_batchedUpdates=function(A,x){return A(x)},oi.useFormState=function(A,x,C){return b().useFormState(A,x,C)},oi.useFormStatus=function(){return b().useHostTransitionStatus()},oi.version="19.2.4",typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error())})(),oi}var sE;function DU(){return sE||(sE=1,Ag.exports=AU()),Ag.exports}var rE;function UU(){if(rE)return Sc;rE=1;return(function(){function p(e,t){for(e=e.memoizedState;e!==null&&0<t;)e=e.next,t--;return e}function l(e,t,i,n){if(i>=t.length)return n;var a=t[i],o=$t(e)?e.slice():Ce({},e);return o[a]=l(e[a],t,i+1,n),o}function r(e,t,i){if(t.length!==i.length)console.warn("copyWithRename() expects paths of the same length");else{for(var n=0;n<i.length-1;n++)if(t[n]!==i[n]){console.warn("copyWithRename() expects paths to be the same except for the deepest key");return}return c(e,t,i,0)}}function c(e,t,i,n){var a=t[n],o=$t(e)?e.slice():Ce({},e);return n+1===t.length?(o[i[n]]=o[a],$t(o)?o.splice(a,1):delete o[a]):o[a]=c(e[a],t,i,n+1),o}function u(e,t,i){var n=t[i],a=$t(e)?e.slice():Ce({},e);return i+1===t.length?($t(a)?a.splice(n,1):delete a[n],a):(a[n]=u(e[n],t,i+1),a)}function f(){return!1}function b(){return null}function v(){console.error("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://react.dev/link/rules-of-hooks")}function N(){console.error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().")}function O(){}function z(){}function A(e){var t=[];return e.forEach(function(i){t.push(i)}),t.sort().join(", ")}function x(e,t,i,n){return new sw(e,t,i,n)}function C(e,t){e.context===Ho&&(Lm(e.current,2,t,e,null,null),Ms())}function B(e,t){if(ln!==null){var i=t.staleFamilies;t=t.updatedFamilies,gu(),lv(e.current,t,i),Ms()}}function G(e){ln=e}function J(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function I(e){var t=e,i=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(i=t.return),e=t.return;while(e)}return t.tag===3?i:null}function $e(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function ce(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Te(e){if(I(e)!==e)throw Error("Unable to find node on an unmounted component.")}function St(e){var t=e.alternate;if(!t){if(t=I(e),t===null)throw Error("Unable to find node on an unmounted component.");return t!==e?null:e}for(var i=e,n=t;;){var a=i.return;if(a===null)break;var o=a.alternate;if(o===null){if(n=a.return,n!==null){i=n;continue}break}if(a.child===o.child){for(o=a.child;o;){if(o===i)return Te(a),e;if(o===n)return Te(a),t;o=o.sibling}throw Error("Unable to find node on an unmounted component.")}if(i.return!==n.return)i=a,n=o;else{for(var s=!1,d=a.child;d;){if(d===i){s=!0,i=a,n=o;break}if(d===n){s=!0,n=a,i=o;break}d=d.sibling}if(!s){for(d=o.child;d;){if(d===i){s=!0,i=o,n=a;break}if(d===n){s=!0,n=o,i=a;break}d=d.sibling}if(!s)throw Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.")}}if(i.alternate!==n)throw Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.")}if(i.tag!==3)throw Error("Unable to find node on an unmounted component.");return i.stateNode.current===i?e:t}function Ie(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=Ie(e),t!==null)return t;e=e.sibling}return null}function jt(e){return e===null||typeof e!="object"?null:(e=px&&e[px]||e["@@iterator"],typeof e=="function"?e:null)}function et(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===TA?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Xs:return"Fragment";case Zm:return"Profiler";case ef:return"StrictMode";case Jm:return"Suspense";case Im:return"SuspenseList";case Km:return"Activity"}if(typeof e=="object")switch(typeof e.tag=="number"&&console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),e.$$typeof){case Gs:return"Portal";case la:return e.displayName||"Context";case Pm:return(e._context.displayName||"Context")+".Consumer";case Du:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case tf:return t=e.displayName||null,t!==null?t:et(e.type)||"Memo";case Bi:t=e._payload,e=e._init;try{return et(e(t))}catch{}}return null}function At(e){return typeof e.tag=="number"?le(e):typeof e.name=="string"?e.name:null}function le(e){var t=e.type;switch(e.tag){case 31:return"Activity";case 24:return"Cache";case 9:return(t._context.displayName||"Context")+".Consumer";case 10:return t.displayName||"Context";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 26:case 27:case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return et(t);case 8:return t===ef?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;break;case 29:if(t=e._debugInfo,t!=null){for(var i=t.length-1;0<=i;i--)if(typeof t[i].name=="string")return t[i].name}if(e.return!==null)return le(e.return)}return null}function Lt(e){return{current:e}}function ve(e,t){0>za?console.error("Unexpected pop."):(t!==Fm[za]&&console.error("Unexpected Fiber popped."),e.current=Wm[za],Wm[za]=null,Fm[za]=null,za--)}function ke(e,t,i){za++,Wm[za]=e.current,Fm[za]=i,e.current=t}function Pt(e){return e===null&&console.error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue."),e}function ui(e,t){ke(jo,t,e),ke(Uu,e,e),ke(zo,null,e);var i=t.nodeType;switch(i){case 9:case 11:i=i===9?"#document":"#fragment",t=(t=t.documentElement)&&(t=t.namespaceURI)?$1(t):Ja;break;default:if(i=t.tagName,t=t.namespaceURI)t=$1(t),t=M1(t,i);else switch(i){case"svg":t=wr;break;case"math":t=ep;break;default:t=Ja}}i=i.toLowerCase(),i=Cy(null,i),i={context:t,ancestorInfo:i},ve(zo,e),ke(zo,i,e)}function Z(e){ve(zo,e),ve(Uu,e),ve(jo,e)}function de(){return Pt(zo.current)}function be(e){e.memoizedState!==null&&ke(nf,e,e);var t=Pt(zo.current),i=e.type,n=M1(t.context,i);i=Cy(t.ancestorInfo,i),n={context:n,ancestorInfo:i},t!==n&&(ke(Uu,e,e),ke(zo,n,e))}function Ge(e){Uu.current===e&&(ve(zo,e),ve(Uu,e)),nf.current===e&&(ve(nf,e),vc._currentValue=os)}function ot(){}function H(){if(Tu===0){hx=console.log,mx=console.info,bx=console.warn,gx=console.error,yx=console.group,vx=console.groupCollapsed,xx=console.groupEnd;var e={configurable:!0,enumerable:!0,value:ot,writable:!0};Object.defineProperties(console,{info:e,log:e,warn:e,error:e,group:e,groupCollapsed:e,groupEnd:e})}Tu++}function xe(){if(Tu--,Tu===0){var e={configurable:!0,enumerable:!0,writable:!0};Object.defineProperties(console,{log:Ce({},e,{value:hx}),info:Ce({},e,{value:mx}),warn:Ce({},e,{value:bx}),error:Ce({},e,{value:gx}),group:Ce({},e,{value:yx}),groupCollapsed:Ce({},e,{value:vx}),groupEnd:Ce({},e,{value:xx})})}0>Tu&&console.error("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}function Ze(e){var t=Error.prepareStackTrace;if(Error.prepareStackTrace=void 0,e=e.stack,Error.prepareStackTrace=t,e.startsWith(`Error: react-stack-top-frame
`)&&(e=e.slice(29)),t=e.indexOf(`
`),t!==-1&&(e=e.slice(t+1)),t=e.indexOf("react_stack_bottom_frame"),t!==-1&&(t=e.lastIndexOf(`
`,t)),t!==-1)e=e.slice(0,t);else return"";return e}function De(e){if(eb===void 0)try{throw Error()}catch(i){var t=i.stack.trim().match(/\n( *(at )?)/);eb=t&&t[1]||"",Nx=-1<i.stack.indexOf(`
    at`)?" (<anonymous>)":-1<i.stack.indexOf("@")?"@unknown:0:0":""}return`
`+eb+e+Nx}function Vt(e,t){if(!e||tb)return"";var i=ib.get(e);if(i!==void 0)return i;tb=!0,i=Error.prepareStackTrace,Error.prepareStackTrace=void 0;var n=null;n=M.H,M.H=null,H();try{var a={DetermineComponentFrameRoot:function(){try{if(t){var _=function(){throw Error()};if(Object.defineProperty(_.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(_,[])}catch(Q){var j=Q}Reflect.construct(e,[],_)}else{try{_.call()}catch(Q){j=Q}e.call(_.prototype)}}else{try{throw Error()}catch(Q){j=Q}(_=e())&&typeof _.catch=="function"&&_.catch(function(){})}}catch(Q){if(Q&&j&&typeof Q.stack=="string")return[Q.stack,j.stack]}return[null,null]}};a.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var o=Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot,"name");o&&o.configurable&&Object.defineProperty(a.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var s=a.DetermineComponentFrameRoot(),d=s[0],m=s[1];if(d&&m){var g=d.split(`
`),U=m.split(`
`);for(s=o=0;o<g.length&&!g[o].includes("DetermineComponentFrameRoot");)o++;for(;s<U.length&&!U[s].includes("DetermineComponentFrameRoot");)s++;if(o===g.length||s===U.length)for(o=g.length-1,s=U.length-1;1<=o&&0<=s&&g[o]!==U[s];)s--;for(;1<=o&&0<=s;o--,s--)if(g[o]!==U[s]){if(o!==1||s!==1)do if(o--,s--,0>s||g[o]!==U[s]){var T=`
`+g[o].replace(" at new "," at ");return e.displayName&&T.includes("<anonymous>")&&(T=T.replace("<anonymous>",e.displayName)),typeof e=="function"&&ib.set(e,T),T}while(1<=o&&0<=s);break}}}finally{tb=!1,M.H=n,xe(),Error.prepareStackTrace=i}return g=(g=e?e.displayName||e.name:"")?De(g):"",typeof e=="function"&&ib.set(e,g),g}function bo(e,t){switch(e.tag){case 26:case 27:case 5:return De(e.type);case 16:return De("Lazy");case 13:return e.child!==t&&t!==null?De("Suspense Fallback"):De("Suspense");case 19:return De("SuspenseList");case 0:case 15:return Vt(e.type,!1);case 11:return Vt(e.type.render,!1);case 1:return Vt(e.type,!0);case 31:return De("Activity");default:return""}}function dt(e){try{var t="",i=null;do{t+=bo(e,i);var n=e._debugInfo;if(n)for(var a=n.length-1;0<=a;a--){var o=n[a];if(typeof o.name=="string"){var s=t;e:{var d=o.name,m=o.env,g=o.debugLocation;if(g!=null){var U=Ze(g),T=U.lastIndexOf(`
`),_=T===-1?U:U.slice(T+1);if(_.indexOf(d)!==-1){var j=`
`+_;break e}}j=De(d+(m?" ["+m+"]":""))}t=s+j}}i=e,e=e.return}while(e);return t}catch(Q){return`
Error generating stack: `+Q.message+`
`+Q.stack}}function Nn(e){return(e=e?e.displayName||e.name:"")?De(e):""}function Wi(){if(Li===null)return null;var e=Li._debugOwner;return e!=null?At(e):null}function _a(){if(Li===null)return"";var e=Li;try{var t="";switch(e.tag===6&&(e=e.return),e.tag){case 26:case 27:case 5:t+=De(e.type);break;case 13:t+=De("Suspense");break;case 19:t+=De("SuspenseList");break;case 31:t+=De("Activity");break;case 30:case 0:case 15:case 1:e._debugOwner||t!==""||(t+=Nn(e.type));break;case 11:e._debugOwner||t!==""||(t+=Nn(e.type.render))}for(;e;)if(typeof e.tag=="number"){var i=e;e=i._debugOwner;var n=i._debugStack;if(e&&n){var a=Ze(n);a!==""&&(t+=`
`+a)}}else if(e.debugStack!=null){var o=e.debugStack;(e=e.owner)&&o&&(t+=`
`+Ze(o))}else break;var s=t}catch(d){s=`
Error generating stack: `+d.message+`
`+d.stack}return s}function F(e,t,i,n,a,o,s){var d=Li;xs(e);try{return e!==null&&e._debugTask?e._debugTask.run(t.bind(null,i,n,a,o,s)):t(i,n,a,o,s)}finally{xs(d)}throw Error("runWithFiberInDEV should never be called in production. This is a bug in React.")}function xs(e){M.getCurrentStack=e===null?null:_a,sa=!1,Li=e}function bl(e){return typeof Symbol=="function"&&Symbol.toStringTag&&e[Symbol.toStringTag]||e.constructor.name||"Object"}function gl(e){try{return go(e),!1}catch{return!0}}function go(e){return""+e}function Ke(e,t){if(gl(e))return console.error("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before using it here.",t,bl(e)),go(e)}function ti(e,t){if(gl(e))return console.error("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before using it here.",t,bl(e)),go(e)}function Ns(e){if(gl(e))return console.error("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before using it here.",bl(e)),go(e)}function Bp(e){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u")return!1;var t=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t.isDisabled)return!0;if(!t.supportsFiber)return console.error("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://react.dev/link/react-devtools"),!0;try{Zs=t.inject(e),ni=t}catch(i){console.error("React instrumentation encountered an error: %o.",i)}return!!t.checkDCE}function ne(e){if(typeof VA=="function"&&$A(e),ni&&typeof ni.setStrictMode=="function")try{ni.setStrictMode(Zs,e)}catch(t){ra||(ra=!0,console.error("React instrumentation encountered an error: %o",t))}}function Ss(e){return e>>>=0,e===0?32:31-(MA(e)/BA|0)|0}function Hn(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return console.error("Should have found matching lanes. This is a bug in React."),e}}function yl(e,t,i){var n=e.pendingLanes;if(n===0)return 0;var a=0,o=e.suspendedLanes,s=e.pingedLanes;e=e.warmLanes;var d=n&134217727;return d!==0?(n=d&~o,n!==0?a=Hn(n):(s&=d,s!==0?a=Hn(s):i||(i=d&~e,i!==0&&(a=Hn(i))))):(d=n&~o,d!==0?a=Hn(d):s!==0?a=Hn(s):i||(i=n&~e,i!==0&&(a=Hn(i)))),a===0?0:t!==0&&t!==a&&(t&o)===0&&(o=a&-a,i=t&-t,o>=i||o===32&&(i&4194048)!==0)?t:a}function yo(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function Gc(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return console.error("Should have found matching lanes. This is a bug in React."),-1}}function Yr(){var e=lf;return lf<<=1,(lf&62914560)===0&&(lf=4194304),e}function Gr(e){for(var t=[],i=0;31>i;i++)t.push(e);return t}function vo(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Xc(e,t,i,n,a,o){var s=e.pendingLanes;e.pendingLanes=i,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=i,e.entangledLanes&=i,e.errorRecoveryDisabledLanes&=i,e.shellSuspendCounter=0;var d=e.entanglements,m=e.expirationTimes,g=e.hiddenUpdates;for(i=s&~i;0<i;){var U=31-fi(i),T=1<<U;d[U]=0,m[U]=-1;var _=g[U];if(_!==null)for(g[U]=null,U=0;U<_.length;U++){var j=_[U];j!==null&&(j.lane&=-536870913)}i&=~T}n!==0&&Xr(e,n,0),o!==0&&a===0&&e.tag!==0&&(e.suspendedLanes|=o&~(s&~t))}function Xr(e,t,i){e.pendingLanes|=t,e.suspendedLanes&=~t;var n=31-fi(t);e.entangledLanes|=t,e.entanglements[n]=e.entanglements[n]|1073741824|i&261930}function Qr(e,t){var i=e.entangledLanes|=t;for(e=e.entanglements;i;){var n=31-fi(i),a=1<<n;a&t|e[n]&t&&(e[n]|=t),i&=~a}}function vl(e,t){var i=t&-t;return i=(i&42)!==0?1:xo(i),(i&(e.suspendedLanes|t))!==0?0:i}function xo(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function xl(e,t,i){if(ua)for(e=e.pendingUpdatersLaneMap;0<i;){var n=31-fi(i),a=1<<n;e[n].add(t),i&=~a}}function Es(e,t){if(ua)for(var i=e.pendingUpdatersLaneMap,n=e.memoizedUpdaters;0<t;){var a=31-fi(t);e=1<<a,a=i[a],0<a.size&&(a.forEach(function(o){var s=o.alternate;s!==null&&n.has(s)||n.add(o)}),a.clear()),t&=~e}}function _s(e){return e&=-e,nn<e?ca<e?(e&134217727)!==0?ja:sf:ca:nn}function No(){var e=Je.p;return e!==0?e:(e=window.event,e===void 0?ja:lx(e.type))}function y(e,t){var i=Je.p;try{return Je.p=e,t()}finally{Je.p=i}}function k(e){delete e[Wt],delete e[pi],delete e[sb],delete e[LA],delete e[HA]}function Y(e){var t=e[Wt];if(t)return t;for(var i=e.parentNode;i;){if(t=i[$o]||i[Wt]){if(i=t.alternate,t.child!==null||i!==null&&i.child!==null)for(e=Q1(e);e!==null;){if(i=e[Wt])return i;e=Q1(e)}return t}e=i,i=e.parentNode}return null}function X(e){if(e=e[Wt]||e[$o]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function ae(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error("getNodeFromInstance: Invalid argument.")}function Ne(e){var t=e[Sx];return t||(t=e[Sx]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function se(e){e[Ru]=!0}function Be(e,t){Se(e,t),Se(e+"Capture",t)}function Se(e,t){Vl[e]&&console.error("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.",e),Vl[e]=t;var i=e.toLowerCase();for(rb[i]=e,e==="onDoubleClick"&&(rb.ondblclick=e),e=0;e<t.length;e++)Ex.add(t[e])}function ci(e,t){qA[t.type]||t.onChange||t.onInput||t.readOnly||t.disabled||t.value==null||console.error(e==="select"?"You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set `onChange`.":"You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."),t.onChange||t.readOnly||t.disabled||t.checked==null||console.error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.")}function qn(e){return An.call(wx,e)?!0:An.call(_x,e)?!1:YA.test(e)?wx[e]=!0:(_x[e]=!0,console.error("Invalid attribute name: `%s`",e),!1)}function Qc(e,t,i){if(qn(t)){if(!e.hasAttribute(t)){switch(typeof i){case"symbol":case"object":return i;case"function":return i;case"boolean":if(i===!1)return i}return i===void 0?void 0:null}return e=e.getAttribute(t),e===""&&i===!0?!0:(Ke(i,t),e===""+i?i:e)}}function ws(e,t,i){if(qn(t))if(i===null)e.removeAttribute(t);else{switch(typeof i){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var n=t.toLowerCase().slice(0,5);if(n!=="data-"&&n!=="aria-"){e.removeAttribute(t);return}}Ke(i,t),e.setAttribute(t,""+i)}}function Zc(e,t,i){if(i===null)e.removeAttribute(t);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}Ke(i,t),e.setAttribute(t,""+i)}}function wa(e,t,i,n){if(n===null)e.removeAttribute(i);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(i);return}Ke(n,i),e.setAttributeNS(t,i,""+n)}}function Fi(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return Ns(e),e;default:return""}}function gy(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function M_(e,t,i){var n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var a=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(s){Ns(s),i=""+s,o.call(this,s)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(s){Ns(s),i=""+s},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Lp(e){if(!e._valueTracker){var t=gy(e)?"checked":"value";e._valueTracker=M_(e,t,""+e[t])}}function yy(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var i=t.getValue(),n="";return e&&(n=gy(e)?e.checked?"true":"false":e.value),e=n,e!==i?(t.setValue(e),!0):!1}function Pc(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function en(e){return e.replace(GA,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function vy(e,t){t.checked===void 0||t.defaultChecked===void 0||Dx||(console.error("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components",Wi()||"A component",t.type),Dx=!0),t.value===void 0||t.defaultValue===void 0||Ax||(console.error("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components",Wi()||"A component",t.type),Ax=!0)}function Hp(e,t,i,n,a,o,s,d){e.name="",s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"?(Ke(s,"type"),e.type=s):e.removeAttribute("type"),t!=null?s==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+Fi(t)):e.value!==""+Fi(t)&&(e.value=""+Fi(t)):s!=="submit"&&s!=="reset"||e.removeAttribute("value"),t!=null?qp(e,s,Fi(t)):i!=null?qp(e,s,Fi(i)):n!=null&&e.removeAttribute("value"),a==null&&o!=null&&(e.defaultChecked=!!o),a!=null&&(e.checked=a&&typeof a!="function"&&typeof a!="symbol"),d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"?(Ke(d,"name"),e.name=""+Fi(d)):e.removeAttribute("name")}function xy(e,t,i,n,a,o,s,d){if(o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"&&(Ke(o,"type"),e.type=o),t!=null||i!=null){if(!(o!=="submit"&&o!=="reset"||t!=null)){Lp(e);return}i=i!=null?""+Fi(i):"",t=t!=null?""+Fi(t):i,d||t===e.value||(e.value=t),e.defaultValue=t}n=n??a,n=typeof n!="function"&&typeof n!="symbol"&&!!n,e.checked=d?e.checked:!!n,e.defaultChecked=!!n,s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"&&(Ke(s,"name"),e.name=s),Lp(e)}function qp(e,t,i){t==="number"&&Pc(e.ownerDocument)===e||e.defaultValue===""+i||(e.defaultValue=""+i)}function Ny(e,t){t.value==null&&(typeof t.children=="object"&&t.children!==null?Qm.Children.forEach(t.children,function(i){i==null||typeof i=="string"||typeof i=="number"||typeof i=="bigint"||Tx||(Tx=!0,console.error("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>."))}):t.dangerouslySetInnerHTML==null||Rx||(Rx=!0,console.error("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected."))),t.selected==null||Ux||(console.error("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."),Ux=!0)}function Sy(){var e=Wi();return e?`

Check the render method of \``+e+"`.":""}function As(e,t,i,n){if(e=e.options,t){t={};for(var a=0;a<i.length;a++)t["$"+i[a]]=!0;for(i=0;i<e.length;i++)a=t.hasOwnProperty("$"+e[i].value),e[i].selected!==a&&(e[i].selected=a),a&&n&&(e[i].defaultSelected=!0)}else{for(i=""+Fi(i),t=null,a=0;a<e.length;a++){if(e[a].value===i){e[a].selected=!0,n&&(e[a].defaultSelected=!0);return}t!==null||e[a].disabled||(t=e[a])}t!==null&&(t.selected=!0)}}function Ey(e,t){for(e=0;e<kx.length;e++){var i=kx[e];if(t[i]!=null){var n=$t(t[i]);t.multiple&&!n?console.error("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s",i,Sy()):!t.multiple&&n&&console.error("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s",i,Sy())}}t.value===void 0||t.defaultValue===void 0||Cx||(console.error("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://react.dev/link/controlled-components"),Cx=!0)}function _y(e,t){t.value===void 0||t.defaultValue===void 0||Ox||(console.error("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://react.dev/link/controlled-components",Wi()||"A component"),Ox=!0),t.children!=null&&t.value==null&&console.error("Use the `defaultValue` or `value` props instead of setting children on <textarea>.")}function wy(e,t,i){if(t!=null&&(t=""+Fi(t),t!==e.value&&(e.value=t),i==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=i!=null?""+Fi(i):""}function Ay(e,t,i,n){if(t==null){if(n!=null){if(i!=null)throw Error("If you supply `defaultValue` on a <textarea>, do not pass children.");if($t(n)){if(1<n.length)throw Error("<textarea> can only have at most one child.");n=n[0]}i=n}i==null&&(i=""),t=i}i=Fi(t),e.defaultValue=i,n=e.textContent,n===i&&n!==""&&n!==null&&(e.value=n),Lp(e)}function Dy(e,t){return e.serverProps===void 0&&e.serverTail.length===0&&e.children.length===1&&3<e.distanceFromLeaf&&e.distanceFromLeaf>15-t?Dy(e.children[0],t):e}function ki(e){return"  "+"  ".repeat(e)}function Ds(e){return"+ "+"  ".repeat(e)}function Nl(e){return"- "+"  ".repeat(e)}function Uy(e){switch(e.tag){case 26:case 27:case 5:return e.type;case 16:return"Lazy";case 31:return"Activity";case 13:return"Suspense";case 19:return"SuspenseList";case 0:case 15:return e=e.type,e.displayName||e.name||null;case 11:return e=e.type.render,e.displayName||e.name||null;case 1:return e=e.type,e.displayName||e.name||null;default:return null}}function Zr(e,t){return zx.test(e)?(e=JSON.stringify(e),e.length>t-2?8>t?'{"..."}':"{"+e.slice(0,t-7)+'..."}':"{"+e+"}"):e.length>t?5>t?'{"..."}':e.slice(0,t-3)+"...":e}function Jc(e,t,i){var n=120-2*i;if(t===null)return Ds(i)+Zr(e,n)+`
`;if(typeof t=="string"){for(var a=0;a<t.length&&a<e.length&&t.charCodeAt(a)===e.charCodeAt(a);a++);return a>n-8&&10<a&&(e="..."+e.slice(a-8),t="..."+t.slice(a-8)),Ds(i)+Zr(e,n)+`
`+Nl(i)+Zr(t,n)+`
`}return ki(i)+Zr(e,n)+`
`}function Yp(e){return Object.prototype.toString.call(e).replace(/^\[object (.*)\]$/,function(t,i){return i})}function Pr(e,t){switch(typeof e){case"string":return e=JSON.stringify(e),e.length>t?5>t?'"..."':e.slice(0,t-4)+'..."':e;case"object":if(e===null)return"null";if($t(e))return"[...]";if(e.$$typeof===oa)return(t=et(e.type))?"<"+t+">":"<...>";var i=Yp(e);if(i==="Object"){i="",t-=2;for(var n in e)if(e.hasOwnProperty(n)){var a=JSON.stringify(n);if(a!=='"'+n+'"'&&(n=a),t-=n.length-2,a=Pr(e[n],15>t?t:15),t-=a.length,0>t){i+=i===""?"...":", ...";break}i+=(i===""?"":",")+n+":"+a}return"{"+i+"}"}return i;case"function":return(t=e.displayName||e.name)?"function "+t:"function";default:return String(e)}}function Us(e,t){return typeof e!="string"||zx.test(e)?"{"+Pr(e,t-2)+"}":e.length>t-2?5>t?'"..."':'"'+e.slice(0,t-5)+'..."':'"'+e+'"'}function Gp(e,t,i){var n=120-i.length-e.length,a=[],o;for(o in t)if(t.hasOwnProperty(o)&&o!=="children"){var s=Us(t[o],120-i.length-o.length-1);n-=o.length+s.length+2,a.push(o+"="+s)}return a.length===0?i+"<"+e+`>
`:0<n?i+"<"+e+" "+a.join(" ")+`>
`:i+"<"+e+`
`+i+"  "+a.join(`
`+i+"  ")+`
`+i+`>
`}function B_(e,t,i){var n="",a=Ce({},t),o;for(o in e)if(e.hasOwnProperty(o)){delete a[o];var s=120-2*i-o.length-2,d=Pr(e[o],s);t.hasOwnProperty(o)?(s=Pr(t[o],s),n+=Ds(i)+o+": "+d+`
`,n+=Nl(i)+o+": "+s+`
`):n+=Ds(i)+o+": "+d+`
`}for(var m in a)a.hasOwnProperty(m)&&(e=Pr(a[m],120-2*i-m.length-2),n+=Nl(i)+m+": "+e+`
`);return n}function L_(e,t,i,n){var a="",o=new Map;for(g in i)i.hasOwnProperty(g)&&o.set(g.toLowerCase(),g);if(o.size===1&&o.has("children"))a+=Gp(e,t,ki(n));else{for(var s in t)if(t.hasOwnProperty(s)&&s!=="children"){var d=120-2*(n+1)-s.length-1,m=o.get(s.toLowerCase());if(m!==void 0){o.delete(s.toLowerCase());var g=t[s];m=i[m];var U=Us(g,d);d=Us(m,d),typeof g=="object"&&g!==null&&typeof m=="object"&&m!==null&&Yp(g)==="Object"&&Yp(m)==="Object"&&(2<Object.keys(g).length||2<Object.keys(m).length||-1<U.indexOf("...")||-1<d.indexOf("..."))?a+=ki(n+1)+s+`={{
`+B_(g,m,n+2)+ki(n+1)+`}}
`:(a+=Ds(n+1)+s+"="+U+`
`,a+=Nl(n+1)+s+"="+d+`
`)}else a+=ki(n+1)+s+"="+Us(t[s],d)+`
`}o.forEach(function(T){if(T!=="children"){var _=120-2*(n+1)-T.length-1;a+=Nl(n+1)+T+"="+Us(i[T],_)+`
`}}),a=a===""?ki(n)+"<"+e+`>
`:ki(n)+"<"+e+`
`+a+ki(n)+`>
`}return e=i.children,t=t.children,typeof e=="string"||typeof e=="number"||typeof e=="bigint"?(o="",(typeof t=="string"||typeof t=="number"||typeof t=="bigint")&&(o=""+t),a+=Jc(o,""+e,n+1)):(typeof t=="string"||typeof t=="number"||typeof t=="bigint")&&(a=e==null?a+Jc(""+t,null,n+1):a+Jc(""+t,void 0,n+1)),a}function Ty(e,t){var i=Uy(e);if(i===null){for(i="",e=e.child;e;)i+=Ty(e,t),e=e.sibling;return i}return ki(t)+"<"+i+`>
`}function Xp(e,t){var i=Dy(e,t);if(i!==e&&(e.children.length!==1||e.children[0]!==i))return ki(t)+`...
`+Xp(i,t+1);i="";var n=e.fiber._debugInfo;if(n)for(var a=0;a<n.length;a++){var o=n[a].name;typeof o=="string"&&(i+=ki(t)+"<"+o+`>
`,t++)}if(n="",a=e.fiber.pendingProps,e.fiber.tag===6)n=Jc(a,e.serverProps,t),t++;else if(o=Uy(e.fiber),o!==null)if(e.serverProps===void 0){n=t;var s=120-2*n-o.length-2,d="";for(g in a)if(a.hasOwnProperty(g)&&g!=="children"){var m=Us(a[g],15);if(s-=g.length+m.length+2,0>s){d+=" ...";break}d+=" "+g+"="+m}n=ki(n)+"<"+o+d+`>
`,t++}else e.serverProps===null?(n=Gp(o,a,Ds(t)),t++):typeof e.serverProps=="string"?console.error("Should not have matched a non HostText fiber to a Text node. This is a bug in React."):(n=L_(o,a,e.serverProps,t),t++);var g="";for(a=e.fiber.child,o=0;a&&o<e.children.length;)s=e.children[o],s.fiber===a?(g+=Xp(s,t),o++):g+=Ty(a,t),a=a.sibling;for(a&&0<e.children.length&&(g+=ki(t)+`...
`),a=e.serverTail,e.serverProps===null&&t--,e=0;e<a.length;e++)o=a[e],g=typeof o=="string"?g+(Nl(t)+Zr(o,120-2*t)+`
`):g+Gp(o.type,o.props,Nl(t));return i+n+g}function Qp(e){try{return`

`+Xp(e,0)}catch{return""}}function Ry(e,t,i){for(var n=t,a=null,o=0;n;)n===e&&(o=0),a={fiber:n,children:a!==null?[a]:[],serverProps:n===t?i:n===e?null:void 0,serverTail:[],distanceFromLeaf:o},o++,n=n.return;return a!==null?Qp(a).replaceAll(/^[+-]/gm,">"):""}function Cy(e,t){var i=Ce({},e||Vx),n={tag:t};return jx.indexOf(t)!==-1&&(i.aTagInScope=null,i.buttonTagInScope=null,i.nobrTagInScope=null),QA.indexOf(t)!==-1&&(i.pTagInButtonScope=null),XA.indexOf(t)!==-1&&t!=="address"&&t!=="div"&&t!=="p"&&(i.listItemTagAutoclosing=null,i.dlItemTagAutoclosing=null),i.current=n,t==="form"&&(i.formTag=n),t==="a"&&(i.aTagInScope=n),t==="button"&&(i.buttonTagInScope=n),t==="nobr"&&(i.nobrTagInScope=n),t==="p"&&(i.pTagInButtonScope=n),t==="li"&&(i.listItemTagAutoclosing=n),(t==="dd"||t==="dt")&&(i.dlItemTagAutoclosing=n),t==="#document"||t==="html"?i.containerTagInScope=null:i.containerTagInScope||(i.containerTagInScope=n),e!==null||t!=="#document"&&t!=="html"&&t!=="body"?i.implicitRootScope===!0&&(i.implicitRootScope=!1):i.implicitRootScope=!0,i}function ky(e,t,i){switch(t){case"select":return e==="hr"||e==="option"||e==="optgroup"||e==="script"||e==="template"||e==="#text";case"optgroup":return e==="option"||e==="#text";case"option":return e==="#text";case"tr":return e==="th"||e==="td"||e==="style"||e==="script"||e==="template";case"tbody":case"thead":case"tfoot":return e==="tr"||e==="style"||e==="script"||e==="template";case"colgroup":return e==="col"||e==="template";case"table":return e==="caption"||e==="colgroup"||e==="tbody"||e==="tfoot"||e==="thead"||e==="style"||e==="script"||e==="template";case"head":return e==="base"||e==="basefont"||e==="bgsound"||e==="link"||e==="meta"||e==="title"||e==="noscript"||e==="noframes"||e==="style"||e==="script"||e==="template";case"html":if(i)break;return e==="head"||e==="body"||e==="frameset";case"frameset":return e==="frame";case"#document":if(!i)return e==="html"}switch(e){case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":return t!=="h1"&&t!=="h2"&&t!=="h3"&&t!=="h4"&&t!=="h5"&&t!=="h6";case"rp":case"rt":return ZA.indexOf(t)===-1;case"caption":case"col":case"colgroup":case"frameset":case"frame":case"tbody":case"td":case"tfoot":case"th":case"thead":case"tr":return t==null;case"head":return i||t===null;case"html":return i&&t==="#document"||t===null;case"body":return i&&(t==="#document"||t==="html")||t===null}return!0}function H_(e,t){switch(e){case"address":case"article":case"aside":case"blockquote":case"center":case"details":case"dialog":case"dir":case"div":case"dl":case"fieldset":case"figcaption":case"figure":case"footer":case"header":case"hgroup":case"main":case"menu":case"nav":case"ol":case"p":case"section":case"summary":case"ul":case"pre":case"listing":case"table":case"hr":case"xmp":case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":return t.pTagInButtonScope;case"form":return t.formTag||t.pTagInButtonScope;case"li":return t.listItemTagAutoclosing;case"dd":case"dt":return t.dlItemTagAutoclosing;case"button":return t.buttonTagInScope;case"a":return t.aTagInScope;case"nobr":return t.nobrTagInScope}return null}function Oy(e,t){for(;e;){switch(e.tag){case 5:case 26:case 27:if(e.type===t)return e}e=e.return}return null}function Zp(e,t){t=t||Vx;var i=t.current;if(t=(i=ky(e,i&&i.tag,t.implicitRootScope)?null:i)?null:H_(e,t),t=i||t,!t)return!0;var n=t.tag;if(t=String(!!i)+"|"+e+"|"+n,rf[t])return!1;rf[t]=!0;var a=(t=Li)?Oy(t.return,n):null,o=t!==null&&a!==null?Ry(a,t,null):"",s="<"+e+">";return i?(i="",n==="table"&&e==="tr"&&(i+=" Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."),console.error(`In HTML, %s cannot be a child of <%s>.%s
This will cause a hydration error.%s`,s,n,i,o)):console.error(`In HTML, %s cannot be a descendant of <%s>.
This will cause a hydration error.%s`,s,n,o),t&&(e=t.return,a===null||e===null||a===e&&e._debugOwner===t._debugOwner||F(a,function(){console.error(`<%s> cannot contain a nested %s.
See this log for the ancestor stack trace.`,n,s)})),!1}function Ic(e,t,i){if(i||ky("#text",t,!1))return!0;if(i="#text|"+t,rf[i])return!1;rf[i]=!0;var n=(i=Li)?Oy(i,t):null;return i=i!==null&&n!==null?Ry(n,i,i.tag!==6?{children:null}:null):"",/\S/.test(e)?console.error(`In HTML, text nodes cannot be a child of <%s>.
This will cause a hydration error.%s`,t,i):console.error(`In HTML, whitespace text nodes cannot be a child of <%s>. Make sure you don't have any extra whitespace between tags on each line of your source code.
This will cause a hydration error.%s`,t,i),!1}function Jr(e,t){if(t){var i=e.firstChild;if(i&&i===e.lastChild&&i.nodeType===3){i.nodeValue=t;return}}e.textContent=t}function q_(e){return e.replace(IA,function(t,i){return i.toUpperCase()})}function zy(e,t,i){var n=t.indexOf("--")===0;n||(-1<t.indexOf("-")?Ps.hasOwnProperty(t)&&Ps[t]||(Ps[t]=!0,console.error("Unsupported style property %s. Did you mean %s?",t,q_(t.replace(JA,"ms-")))):PA.test(t)?Ps.hasOwnProperty(t)&&Ps[t]||(Ps[t]=!0,console.error("Unsupported vendor-prefixed style property %s. Did you mean %s?",t,t.charAt(0).toUpperCase()+t.slice(1))):!Bx.test(i)||cb.hasOwnProperty(i)&&cb[i]||(cb[i]=!0,console.error(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`,t,i.replace(Bx,""))),typeof i=="number"&&(isNaN(i)?Lx||(Lx=!0,console.error("`NaN` is an invalid value for the `%s` css style property.",t)):isFinite(i)||Hx||(Hx=!0,console.error("`Infinity` is an invalid value for the `%s` css style property.",t)))),i==null||typeof i=="boolean"||i===""?n?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":n?e.setProperty(t,i):typeof i!="number"||i===0||qx.has(t)?t==="float"?e.cssFloat=i:(ti(i,t),e[t]=(""+i).trim()):e[t]=i+"px"}function jy(e,t,i){if(t!=null&&typeof t!="object")throw Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");if(t&&Object.freeze(t),e=e.style,i!=null){if(t){var n={};if(i){for(var a in i)if(i.hasOwnProperty(a)&&!t.hasOwnProperty(a))for(var o=ub[a]||[a],s=0;s<o.length;s++)n[o[s]]=a}for(var d in t)if(t.hasOwnProperty(d)&&(!i||i[d]!==t[d]))for(a=ub[d]||[d],o=0;o<a.length;o++)n[a[o]]=d;d={};for(var m in t)for(a=ub[m]||[m],o=0;o<a.length;o++)d[a[o]]=m;m={};for(var g in n)if(a=n[g],(o=d[g])&&a!==o&&(s=a+","+o,!m[s])){m[s]=!0,s=console;var U=t[a];s.error.call(s,"%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.",U==null||typeof U=="boolean"||U===""?"Removing":"Updating",a,o)}}for(var T in i)!i.hasOwnProperty(T)||t!=null&&t.hasOwnProperty(T)||(T.indexOf("--")===0?e.setProperty(T,""):T==="float"?e.cssFloat="":e[T]="");for(var _ in t)g=t[_],t.hasOwnProperty(_)&&i[_]!==g&&zy(e,_,g)}else for(n in t)t.hasOwnProperty(n)&&zy(e,n,t[n])}function Ir(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}function Vy(e){return KA.get(e)||e}function Y_(e,t){if(An.call(Is,t)&&Is[t])return!0;if(FA.test(t)){if(e="aria-"+t.slice(4).toLowerCase(),e=Yx.hasOwnProperty(e)?e:null,e==null)return console.error("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.",t),Is[t]=!0;if(t!==e)return console.error("Invalid ARIA attribute `%s`. Did you mean `%s`?",t,e),Is[t]=!0}if(WA.test(t)){if(e=t.toLowerCase(),e=Yx.hasOwnProperty(e)?e:null,e==null)return Is[t]=!0,!1;t!==e&&(console.error("Unknown ARIA attribute `%s`. Did you mean `%s`?",t,e),Is[t]=!0)}return!0}function G_(e,t){var i=[],n;for(n in t)Y_(e,n)||i.push(n);t=i.map(function(a){return"`"+a+"`"}).join(", "),i.length===1?console.error("Invalid aria prop %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props",t,e):1<i.length&&console.error("Invalid aria props %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props",t,e)}function X_(e,t,i,n){if(An.call(hi,t)&&hi[t])return!0;var a=t.toLowerCase();if(a==="onfocusin"||a==="onfocusout")return console.error("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."),hi[t]=!0;if(typeof i=="function"&&(e==="form"&&t==="action"||e==="input"&&t==="formAction"||e==="button"&&t==="formAction"))return!0;if(n!=null){if(e=n.possibleRegistrationNames,n.registrationNameDependencies.hasOwnProperty(t))return!0;if(n=e.hasOwnProperty(a)?e[a]:null,n!=null)return console.error("Invalid event handler property `%s`. Did you mean `%s`?",t,n),hi[t]=!0;if(Xx.test(t))return console.error("Unknown event handler property `%s`. It will be ignored.",t),hi[t]=!0}else if(Xx.test(t))return eD.test(t)&&console.error("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.",t),hi[t]=!0;if(tD.test(t)||iD.test(t))return!0;if(a==="innerhtml")return console.error("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."),hi[t]=!0;if(a==="aria")return console.error("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."),hi[t]=!0;if(a==="is"&&i!==null&&i!==void 0&&typeof i!="string")return console.error("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.",typeof i),hi[t]=!0;if(typeof i=="number"&&isNaN(i))return console.error("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.",t),hi[t]=!0;if(cf.hasOwnProperty(a)){if(a=cf[a],a!==t)return console.error("Invalid DOM property `%s`. Did you mean `%s`?",t,a),hi[t]=!0}else if(t!==a)return console.error("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.",t,a),hi[t]=!0;switch(t){case"dangerouslySetInnerHTML":case"children":case"style":case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":return!0;case"innerText":case"textContent":return!0}switch(typeof i){case"boolean":switch(t){case"autoFocus":case"checked":case"multiple":case"muted":case"selected":case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":case"capture":case"download":case"inert":return!0;default:return a=t.toLowerCase().slice(0,5),a==="data-"||a==="aria-"?!0:(i?console.error('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.',i,t,t,i,t):console.error('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.',i,t,t,i,t,t,t),hi[t]=!0)}case"function":case"symbol":return hi[t]=!0,!1;case"string":if(i==="false"||i==="true"){switch(t){case"checked":case"selected":case"multiple":case"muted":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":case"inert":break;default:return!0}console.error("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?",i,t,i==="false"?"The browser will interpret it as a truthy value.":'Although this works, it will not work as expected if you pass the string "false".',t,i),hi[t]=!0}}return!0}function Q_(e,t,i){var n=[],a;for(a in t)X_(e,a,t[a],i)||n.push(a);t=n.map(function(o){return"`"+o+"`"}).join(", "),n.length===1?console.error("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://react.dev/link/attribute-behavior ",t,e):1<n.length&&console.error("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://react.dev/link/attribute-behavior ",t,e)}function Kr(e){return nD.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Aa(){}function Pp(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}function $y(e){var t=X(e);if(t&&(e=t.stateNode)){var i=e[pi]||null;e:switch(e=t.stateNode,t.type){case"input":if(Hp(e,i.value,i.defaultValue,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name),t=i.name,i.type==="radio"&&t!=null){for(i=e;i.parentNode;)i=i.parentNode;for(Ke(t,"name"),i=i.querySelectorAll('input[name="'+en(""+t)+'"][type="radio"]'),t=0;t<i.length;t++){var n=i[t];if(n!==e&&n.form===e.form){var a=n[pi]||null;if(!a)throw Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");Hp(n,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<i.length;t++)n=i[t],n.form===e.form&&yy(n)}break e;case"textarea":wy(e,i.value,i.defaultValue);break e;case"select":t=i.value,t!=null&&As(e,!!i.multiple,t,!1)}}}function My(e,t,i){if(db)return e(t,i);db=!0;try{var n=e(t);return n}finally{if(db=!1,(Ks!==null||Ws!==null)&&(Ms(),Ks&&(t=Ks,e=Ws,Ws=Ks=null,$y(t),e)))for(t=0;t<e.length;t++)$y(e[t])}}function Wr(e,t){var i=e.stateNode;if(i===null)return null;var n=i[pi]||null;if(n===null)return null;i=n[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(n=!n.disabled)||(e=e.type,n=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!n;break e;default:e=!1}if(e)return null;if(i&&typeof i!="function")throw Error("Expected `"+t+"` listener to be a function, instead got a value of `"+typeof i+"` type.");return i}function By(){if(df)return df;var e,t=pb,i=t.length,n,a="value"in Mo?Mo.value:Mo.textContent,o=a.length;for(e=0;e<i&&t[e]===a[e];e++);var s=i-e;for(n=1;n<=s&&t[i-n]===a[o-n];n++);return df=a.slice(e,1<n?1-n:void 0)}function Kc(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Wc(){return!0}function Ly(){return!1}function Ni(e){function t(i,n,a,o,s){this._reactName=i,this._targetInst=a,this.type=n,this.nativeEvent=o,this.target=s,this.currentTarget=null;for(var d in e)e.hasOwnProperty(d)&&(i=e[d],this[d]=i?i(o):o[d]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?Wc:Ly,this.isPropagationStopped=Ly,this}return Ce(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var i=this.nativeEvent;i&&(i.preventDefault?i.preventDefault():typeof i.returnValue!="unknown"&&(i.returnValue=!1),this.isDefaultPrevented=Wc)},stopPropagation:function(){var i=this.nativeEvent;i&&(i.stopPropagation?i.stopPropagation():typeof i.cancelBubble!="unknown"&&(i.cancelBubble=!0),this.isPropagationStopped=Wc)},persist:function(){},isPersistent:Wc}),t}function Z_(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=bD[e])?!!t[e]:!1}function Jp(){return Z_}function Hy(e,t){switch(e){case"keyup":return UD.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==Jx;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function qy(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}function P_(e,t){switch(e){case"compositionend":return qy(t);case"keypress":return t.which!==Kx?null:(Fx=!0,Wx);case"textInput":return e=t.data,e===Wx&&Fx?null:e;default:return null}}function J_(e,t){if(Fs)return e==="compositionend"||!gb&&Hy(e,t)?(e=By(),df=pb=Mo=null,Fs=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Ix&&t.locale!=="ko"?null:t.data;default:return null}}function Yy(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!RD[e.type]:t==="textarea"}function I_(e){if(!da)return!1;e="on"+e;var t=e in document;return t||(t=document.createElement("div"),t.setAttribute(e,"return;"),t=typeof t[e]=="function"),t}function Gy(e,t,i,n){Ks?Ws?Ws.push(n):Ws=[n]:Ks=n,t=Gd(t,"onChange"),0<t.length&&(i=new ff("onChange","change",null,i,n),e.push({event:i,listeners:t}))}function K_(e){A1(e,0)}function Fc(e){var t=ae(e);if(yy(t))return e}function Xy(e,t){if(e==="change")return t}function Qy(){Vu&&(Vu.detachEvent("onpropertychange",Zy),$u=Vu=null)}function Zy(e){if(e.propertyName==="value"&&Fc($u)){var t=[];Gy(t,$u,e,Pp(e)),My(K_,t)}}function W_(e,t,i){e==="focusin"?(Qy(),Vu=t,$u=i,Vu.attachEvent("onpropertychange",Zy)):e==="focusout"&&Qy()}function F_(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Fc($u)}function ew(e,t){if(e==="click")return Fc(t)}function tw(e,t){if(e==="input"||e==="change")return Fc(t)}function iw(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}function Fr(e,t){if(mi(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var i=Object.keys(e),n=Object.keys(t);if(i.length!==n.length)return!1;for(n=0;n<i.length;n++){var a=i[n];if(!An.call(t,a)||!mi(e[a],t[a]))return!1}return!0}function Py(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Jy(e,t){var i=Py(e);e=0;for(var n;i;){if(i.nodeType===3){if(n=e+i.textContent.length,e<=t&&n>=t)return{node:i,offset:t-e};e=n}e:{for(;i;){if(i.nextSibling){i=i.nextSibling;break e}i=i.parentNode}i=void 0}i=Py(i)}}function Iy(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Iy(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Ky(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Pc(e.document);t instanceof e.HTMLIFrameElement;){try{var i=typeof t.contentWindow.location.href=="string"}catch{i=!1}if(i)e=t.contentWindow;else break;t=Pc(e.document)}return t}function Ip(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Wy(e,t,i){var n=i.window===i?i.document:i.nodeType===9?i:i.ownerDocument;vb||er==null||er!==Pc(n)||(n=er,"selectionStart"in n&&Ip(n)?n={start:n.selectionStart,end:n.selectionEnd}:(n=(n.ownerDocument&&n.ownerDocument.defaultView||window).getSelection(),n={anchorNode:n.anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset}),Mu&&Fr(Mu,n)||(Mu=n,n=Gd(yb,"onSelect"),0<n.length&&(t=new ff("onSelect","select",null,t,i),e.push({event:t,listeners:n}),t.target=er)))}function Sl(e,t){var i={};return i[e.toLowerCase()]=t.toLowerCase(),i["Webkit"+e]="webkit"+t,i["Moz"+e]="moz"+t,i}function El(e){if(xb[e])return xb[e];if(!tr[e])return e;var t=tr[e],i;for(i in t)if(t.hasOwnProperty(i)&&i in tN)return xb[e]=t[i];return e}function Sn(e,t){lN.set(e,t),Be(t,[e])}function nw(e){for(var t=hf,i=0;i<e.length;i++){var n=e[i];if(typeof n=="object"&&n!==null)if($t(n)&&n.length===2&&typeof n[0]=="string"){if(t!==hf&&t!==wb)return Eb;t=wb}else return Eb;else{if(typeof n=="function"||typeof n=="string"&&50<n.length||t!==hf&&t!==_b)return Eb;t=_b}}return t}function Kp(e,t,i,n){for(var a in e)An.call(e,a)&&a[0]!=="_"&&Yn(a,e[a],t,i,n)}function Yn(e,t,i,n,a){switch(typeof t){case"object":if(t===null){t="null";break}else{if(t.$$typeof===oa){var o=et(t.type)||"…",s=t.key;t=t.props;var d=Object.keys(t),m=d.length;if(s==null&&m===0){t="<"+o+" />";break}if(3>n||m===1&&d[0]==="children"&&s==null){t="<"+o+" … />";break}i.push([a+"  ".repeat(n)+e,"<"+o]),s!==null&&Yn("key",s,i,n+1,a),e=!1;for(var g in t)g==="children"?t.children!=null&&(!$t(t.children)||0<t.children.length)&&(e=!0):An.call(t,g)&&g[0]!=="_"&&Yn(g,t[g],i,n+1,a);i.push(["",e?">…</"+o+">":"/>"]);return}if(o=Object.prototype.toString.call(t),o=o.slice(8,o.length-1),o==="Array"){if(g=nw(t),g===_b||g===hf){t=JSON.stringify(t);break}else if(g===wb){for(i.push([a+"  ".repeat(n)+e,""]),e=0;e<t.length;e++)o=t[e],Yn(o[0],o[1],i,n+1,a);return}}if(o==="Promise"){if(t.status==="fulfilled"){if(o=i.length,Yn(e,t.value,i,n,a),i.length>o){i=i[o],i[1]="Promise<"+(i[1]||"Object")+">";return}}else if(t.status==="rejected"&&(o=i.length,Yn(e,t.reason,i,n,a),i.length>o)){i=i[o],i[1]="Rejected Promise<"+i[1]+">";return}i.push(["  ".repeat(n)+e,"Promise"]);return}o==="Object"&&(g=Object.getPrototypeOf(t))&&typeof g.constructor=="function"&&(o=g.constructor.name),i.push([a+"  ".repeat(n)+e,o==="Object"?3>n?"":"…":o]),3>n&&Kp(t,i,n+1,a);return}case"function":t=t.name===""?"() => {}":t.name+"() {}";break;case"string":t=t===$D?"…":JSON.stringify(t);break;case"undefined":t="undefined";break;case"boolean":t=t?"true":"false";break;default:t=String(t)}i.push([a+"  ".repeat(n)+e,t])}function Fy(e,t,i,n){var a=!0;for(s in e)s in t||(i.push([mf+"  ".repeat(n)+s,"…"]),a=!1);for(var o in t)if(o in e){var s=e[o],d=t[o];if(s!==d){if(n===0&&o==="children")a="  ".repeat(n)+o,i.push([mf+a,"…"],[bf+a,"…"]);else{if(!(3<=n)){if(typeof s=="object"&&typeof d=="object"&&s!==null&&d!==null&&s.$$typeof===d.$$typeof)if(d.$$typeof===oa){if(s.type===d.type&&s.key===d.key){s=et(d.type)||"…",a="  ".repeat(n)+o,s="<"+s+" … />",i.push([mf+a,s],[bf+a,s]),a=!1;continue}}else{var m=Object.prototype.toString.call(s),g=Object.prototype.toString.call(d);if(m===g&&(g==="[object Object]"||g==="[object Array]")){m=[uN+"  ".repeat(n)+o,g==="[object Array]"?"Array":""],i.push(m),g=i.length,Fy(s,d,i,n+1)?g===i.length&&(m[1]="Referentially unequal but deeply equal objects. Consider memoization."):a=!1;continue}}else if(typeof s=="function"&&typeof d=="function"&&s.name===d.name&&s.length===d.length&&(m=Function.prototype.toString.call(s),g=Function.prototype.toString.call(d),m===g)){s=d.name===""?"() => {}":d.name+"() {}",i.push([uN+"  ".repeat(n)+o,s+" Referentially unequal function closure. Consider memoization."]);continue}}Yn(o,s,i,n,mf),Yn(o,d,i,n,bf)}a=!1}}else i.push([bf+"  ".repeat(n)+o,"…"]),a=!1;return a}function En(e){Me=e&63?"Blocking":e&64?"Gesture":e&4194176?"Transition":e&62914560?"Suspense":e&2080374784?"Idle":"Other"}function Gn(e,t,i,n){rt&&(Lo.start=t,Lo.end=i,Va.color="warning",Va.tooltipText=n,Va.properties=null,(e=e._debugTask)?e.run(performance.measure.bind(performance,n,Lo)):performance.measure(n,Lo))}function ed(e,t,i){Gn(e,t,i,"Reconnect")}function td(e,t,i,n,a){var o=le(e);if(o!==null&&rt){var s=e.alternate,d=e.actualDuration;if(s===null||s.child!==e.child)for(var m=e.child;m!==null;m=m.sibling)d-=m.actualDuration;n=.5>d?n?"tertiary-light":"primary-light":10>d?n?"tertiary":"primary":100>d?n?"tertiary-dark":"primary-dark":"error";var g=e.memoizedProps;d=e._debugTask,g!==null&&s!==null&&s.memoizedProps!==g?(m=[MD],g=Fy(s.memoizedProps,g,m,0),1<m.length&&(g&&!Bo&&(s.lanes&a)===0&&100<e.actualDuration?(Bo=!0,m[0]=BD,Va.color="warning",Va.tooltipText=cN):(Va.color=n,Va.tooltipText=o),Va.properties=m,Lo.start=t,Lo.end=i,d!=null?d.run(performance.measure.bind(performance,"​"+o,Lo)):performance.measure("​"+o,Lo))):d!=null?d.run(console.timeStamp.bind(console,o,t,i,an,void 0,n)):console.timeStamp(o,t,i,an,void 0,n)}}function Wp(e,t,i,n){if(rt){var a=le(e);if(a!==null){for(var o=null,s=[],d=0;d<n.length;d++){var m=n[d];o==null&&m.source!==null&&(o=m.source._debugTask),m=m.value,s.push(["Error",typeof m=="object"&&m!==null&&typeof m.message=="string"?String(m.message):String(m)])}e.key!==null&&Yn("key",e.key,s,0,""),e.memoizedProps!==null&&Kp(e.memoizedProps,s,0,""),o==null&&(o=e._debugTask),e={start:t,end:i,detail:{devtools:{color:"error",track:an,tooltipText:e.tag===13?"Hydration failed":"Error boundary caught an error",properties:s}}},o?o.run(performance.measure.bind(performance,"​"+a,e)):performance.measure("​"+a,e)}}}function Xn(e,t,i,n,a){if(a!==null){if(rt){var o=le(e);if(o!==null){n=[];for(var s=0;s<a.length;s++){var d=a[s].value;n.push(["Error",typeof d=="object"&&d!==null&&typeof d.message=="string"?String(d.message):String(d)])}e.key!==null&&Yn("key",e.key,n,0,""),e.memoizedProps!==null&&Kp(e.memoizedProps,n,0,""),t={start:t,end:i,detail:{devtools:{color:"error",track:an,tooltipText:"A lifecycle or effect errored",properties:n}}},(e=e._debugTask)?e.run(performance.measure.bind(performance,"​"+o,t)):performance.measure("​"+o,t)}}}else o=le(e),o!==null&&rt&&(a=1>n?"secondary-light":100>n?"secondary":500>n?"secondary-dark":"error",(e=e._debugTask)?e.run(console.timeStamp.bind(console,o,t,i,an,void 0,a)):console.timeStamp(o,t,i,an,void 0,a))}function aw(e,t,i,n){if(rt&&!(t<=e)){var a=(i&738197653)===i?"tertiary-dark":"primary-dark";i=(i&536870912)===i?"Prepared":(i&201326741)===i?"Hydrated":"Render",n?n.run(console.timeStamp.bind(console,i,e,t,Me,je,a)):console.timeStamp(i,e,t,Me,je,a)}}function ev(e,t,i,n){!rt||t<=e||(i=(i&738197653)===i?"tertiary-dark":"primary-dark",n?n.run(console.timeStamp.bind(console,"Prewarm",e,t,Me,je,i)):console.timeStamp("Prewarm",e,t,Me,je,i))}function tv(e,t,i,n){!rt||t<=e||(i=(i&738197653)===i?"tertiary-dark":"primary-dark",n?n.run(console.timeStamp.bind(console,"Suspended",e,t,Me,je,i)):console.timeStamp("Suspended",e,t,Me,je,i))}function ow(e,t,i,n,a,o){if(rt&&!(t<=e)){i=[];for(var s=0;s<n.length;s++){var d=n[s].value;i.push(["Recoverable Error",typeof d=="object"&&d!==null&&typeof d.message=="string"?String(d.message):String(d)])}e={start:e,end:t,detail:{devtools:{color:"primary-dark",track:Me,trackGroup:je,tooltipText:a?"Hydration Failed":"Recovered after Error",properties:i}}},o?o.run(performance.measure.bind(performance,"Recovered",e)):performance.measure("Recovered",e)}}function Fp(e,t,i,n){!rt||t<=e||(n?n.run(console.timeStamp.bind(console,"Errored",e,t,Me,je,"error")):console.timeStamp("Errored",e,t,Me,je,"error"))}function lw(e,t,i,n){!rt||t<=e||(n?n.run(console.timeStamp.bind(console,i,e,t,Me,je,"secondary-light")):console.timeStamp(i,e,t,Me,je,"secondary-light"))}function iv(e,t,i,n,a){if(rt&&!(t<=e)){for(var o=[],s=0;s<i.length;s++){var d=i[s].value;o.push(["Error",typeof d=="object"&&d!==null&&typeof d.message=="string"?String(d.message):String(d)])}e={start:e,end:t,detail:{devtools:{color:"error",track:Me,trackGroup:je,tooltipText:n?"Remaining Effects Errored":"Commit Errored",properties:o}}},a?a.run(performance.measure.bind(performance,"Errored",e)):performance.measure("Errored",e)}}function eh(e,t,i){!rt||t<=e||console.timeStamp("Animating",e,t,Me,je,"secondary-dark")}function id(){for(var e=ir,t=Ab=ir=0;t<e;){var i=on[t];on[t++]=null;var n=on[t];on[t++]=null;var a=on[t];on[t++]=null;var o=on[t];if(on[t++]=null,n!==null&&a!==null){var s=n.pending;s===null?a.next=a:(a.next=s.next,s.next=a),n.pending=a}o!==0&&nv(i,a,o)}}function nd(e,t,i,n){on[ir++]=e,on[ir++]=t,on[ir++]=i,on[ir++]=n,Ab|=n,e.lanes|=n,e=e.alternate,e!==null&&(e.lanes|=n)}function th(e,t,i,n){return nd(e,t,i,n),ad(e)}function ii(e,t){return nd(e,null,null,t),ad(e)}function nv(e,t,i){e.lanes|=i;var n=e.alternate;n!==null&&(n.lanes|=i);for(var a=!1,o=e.return;o!==null;)o.childLanes|=i,n=o.alternate,n!==null&&(n.childLanes|=i),o.tag===22&&(e=o.stateNode,e===null||e._visibility&Bu||(a=!0)),e=o,o=o.return;return e.tag===3?(o=e.stateNode,a&&t!==null&&(a=31-fi(i),e=o.hiddenUpdates,n=e[a],n===null?e[a]=[t]:n.push(t),t.lane=i|536870912),o):null}function ad(e){if(fc>tU)throw Fl=fc=0,pc=og=null,Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");Fl>iU&&(Fl=0,pc=null,console.error("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.")),e.alternate===null&&(e.flags&4098)!==0&&v1(e);for(var t=e,i=t.return;i!==null;)t.alternate===null&&(t.flags&4098)!==0&&v1(e),t=i,i=t.return;return t.tag===3?t.stateNode:null}function _l(e){if(ln===null)return e;var t=ln(e);return t===void 0?e:t.current}function ih(e){if(ln===null)return e;var t=ln(e);return t===void 0?e!=null&&typeof e.render=="function"&&(t=_l(e.render),e.render!==t)?(t={$$typeof:Du,render:t},e.displayName!==void 0&&(t.displayName=e.displayName),t):e:t.current}function av(e,t){if(ln===null)return!1;var i=e.elementType;t=t.type;var n=!1,a=typeof t=="object"&&t!==null?t.$$typeof:null;switch(e.tag){case 1:typeof t=="function"&&(n=!0);break;case 0:(typeof t=="function"||a===Bi)&&(n=!0);break;case 11:(a===Du||a===Bi)&&(n=!0);break;case 14:case 15:(a===tf||a===Bi)&&(n=!0);break;default:return!1}return!!(n&&(e=ln(i),e!==void 0&&e===ln(t)))}function ov(e){ln!==null&&typeof WeakSet=="function"&&(nr===null&&(nr=new WeakSet),nr.add(e))}function lv(e,t,i){do{var n=e,a=n.alternate,o=n.child,s=n.sibling,d=n.tag;n=n.type;var m=null;switch(d){case 0:case 15:case 1:m=n;break;case 11:m=n.render}if(ln===null)throw Error("Expected resolveFamily to be set during hot reload.");var g=!1;if(n=!1,m!==null&&(m=ln(m),m!==void 0&&(i.has(m)?n=!0:t.has(m)&&(d===1?n=!0:g=!0))),nr!==null&&(nr.has(e)||a!==null&&nr.has(a))&&(n=!0),n&&(e._debugNeedsRemount=!0),(n||g)&&(a=ii(e,2),a!==null&&yt(a,e,2)),o===null||n||lv(o,t,i),s===null)break;e=s}while(!0)}function sw(e,t,i,n){this.tag=e,this.key=i,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=n,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null,this.actualDuration=-0,this.actualStartTime=-1.1,this.treeBaseDuration=this.selfBaseDuration=-0,this._debugTask=this._debugStack=this._debugOwner=this._debugInfo=null,this._debugNeedsRemount=!1,this._debugHookTypes=null,dN||typeof Object.preventExtensions!="function"||Object.preventExtensions(this)}function nh(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Da(e,t){var i=e.alternate;switch(i===null?(i=x(e.tag,t,e.key,e.mode),i.elementType=e.elementType,i.type=e.type,i.stateNode=e.stateNode,i._debugOwner=e._debugOwner,i._debugStack=e._debugStack,i._debugTask=e._debugTask,i._debugHookTypes=e._debugHookTypes,i.alternate=e,e.alternate=i):(i.pendingProps=t,i.type=e.type,i.flags=0,i.subtreeFlags=0,i.deletions=null,i.actualDuration=-0,i.actualStartTime=-1.1),i.flags=e.flags&65011712,i.childLanes=e.childLanes,i.lanes=e.lanes,i.child=e.child,i.memoizedProps=e.memoizedProps,i.memoizedState=e.memoizedState,i.updateQueue=e.updateQueue,t=e.dependencies,i.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext,_debugThenableState:t._debugThenableState},i.sibling=e.sibling,i.index=e.index,i.ref=e.ref,i.refCleanup=e.refCleanup,i.selfBaseDuration=e.selfBaseDuration,i.treeBaseDuration=e.treeBaseDuration,i._debugInfo=e._debugInfo,i._debugNeedsRemount=e._debugNeedsRemount,i.tag){case 0:case 15:i.type=_l(e.type);break;case 1:i.type=_l(e.type);break;case 11:i.type=ih(e.type)}return i}function sv(e,t){e.flags&=65011714;var i=e.alternate;return i===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null,e.selfBaseDuration=0,e.treeBaseDuration=0):(e.childLanes=i.childLanes,e.lanes=i.lanes,e.child=i.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=i.memoizedProps,e.memoizedState=i.memoizedState,e.updateQueue=i.updateQueue,e.type=i.type,t=i.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext,_debugThenableState:t._debugThenableState},e.selfBaseDuration=i.selfBaseDuration,e.treeBaseDuration=i.treeBaseDuration),e}function ah(e,t,i,n,a,o){var s=0,d=e;if(typeof e=="function")nh(e)&&(s=1),d=_l(d);else if(typeof e=="string")s=de(),s=bA(e,i,s)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case Km:return t=x(31,i,t,a),t.elementType=Km,t.lanes=o,t;case Xs:return wl(i.children,a,o,t);case ef:s=8,a|=ai,a|=Dn;break;case Zm:return e=i,n=a,typeof e.id!="string"&&console.error('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.',typeof e.id),t=x(12,e,t,n|_e),t.elementType=Zm,t.lanes=o,t.stateNode={effectDuration:0,passiveEffectDuration:0},t;case Jm:return t=x(13,i,t,a),t.elementType=Jm,t.lanes=o,t;case Im:return t=x(19,i,t,a),t.elementType=Im,t.lanes=o,t;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case la:s=10;break e;case Pm:s=9;break e;case Du:s=11,d=ih(d);break e;case tf:s=14;break e;case Bi:s=16,d=null;break e}d="",(e===void 0||typeof e=="object"&&e!==null&&Object.keys(e).length===0)&&(d+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."),e===null?i="null":$t(e)?i="array":e!==void 0&&e.$$typeof===oa?(i="<"+(et(e.type)||"Unknown")+" />",d=" Did you accidentally export a JSX literal instead of a component?"):i=typeof e,(s=n?At(n):null)&&(d+=`

Check the render method of \``+s+"`."),s=29,i=Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: "+(i+"."+d)),d=null}return t=x(s,i,t,a),t.elementType=e,t.type=d,t.lanes=o,t._debugOwner=n,t}function od(e,t,i){return t=ah(e.type,e.key,e.props,e._owner,t,i),t._debugOwner=e._owner,t._debugStack=e._debugStack,t._debugTask=e._debugTask,t}function wl(e,t,i,n){return e=x(7,e,n,t),e.lanes=i,e}function oh(e,t,i){return e=x(6,e,null,t),e.lanes=i,e}function rv(e){var t=x(18,null,null,he);return t.stateNode=e,t}function lh(e,t,i){return t=x(4,e.children!==null?e.children:[],e.key,t),t.lanes=i,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Oi(e,t){if(typeof e=="object"&&e!==null){var i=Db.get(e);return i!==void 0?i:(t={value:e,source:t,stack:dt(t)},Db.set(e,t),t)}return{value:e,source:t,stack:dt(t)}}function Ua(e,t){So(),ar[or++]=Lu,ar[or++]=gf,gf=e,Lu=t}function uv(e,t,i){So(),sn[rn++]=Ma,sn[rn++]=Ba,sn[rn++]=Ml,Ml=e;var n=Ma;e=Ba;var a=32-fi(n)-1;n&=~(1<<a),i+=1;var o=32-fi(t)+a;if(30<o){var s=a-a%5;o=(n&(1<<s)-1).toString(32),n>>=s,a-=s,Ma=1<<32-fi(t)+a|i<<a|n,Ba=o+e}else Ma=1<<o|i<<a|n,Ba=e}function sh(e){So(),e.return!==null&&(Ua(e,1),uv(e,1,0))}function rh(e){for(;e===gf;)gf=ar[--or],ar[or]=null,Lu=ar[--or],ar[or]=null;for(;e===Ml;)Ml=sn[--rn],sn[rn]=null,Ba=sn[--rn],sn[rn]=null,Ma=sn[--rn],sn[rn]=null}function cv(){return So(),Ml!==null?{id:Ma,overflow:Ba}:null}function dv(e,t){So(),sn[rn++]=Ma,sn[rn++]=Ba,sn[rn++]=Ml,Ma=t.id,Ba=t.overflow,Ml=e}function So(){Oe||console.error("Expected to be hydrating. This is a bug in React. Please file an issue.")}function Al(e,t){if(e.return===null){if(Hi===null)Hi={fiber:e,children:[],serverProps:void 0,serverTail:[],distanceFromLeaf:t};else{if(Hi.fiber!==e)throw Error("Saw multiple hydration diff roots in a pass. This is a bug in React.");Hi.distanceFromLeaf>t&&(Hi.distanceFromLeaf=t)}return Hi}var i=Al(e.return,t+1).children;return 0<i.length&&i[i.length-1].fiber===e?(i=i[i.length-1],i.distanceFromLeaf>t&&(i.distanceFromLeaf=t),i):(t={fiber:e,children:[],serverProps:void 0,serverTail:[],distanceFromLeaf:t},i.push(t),t)}function fv(){Oe&&console.error("We should not be hydrating here. This is a bug in React. Please file a bug.")}function ld(e,t){fa||(e=Al(e,0),e.serverProps=null,t!==null&&(t=G1(t),e.serverTail.push(t)))}function Eo(e){var t=1<arguments.length&&arguments[1]!==void 0?arguments[1]:!1,i="",n=Hi;throw n!==null&&(Hi=null,i=Qp(n)),eu(Oi(Error("Hydration failed because the server rendered "+(t?"text":"HTML")+` didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:

- A server/client branch \`if (typeof window !== 'undefined')\`.
- Variable input such as \`Date.now()\` or \`Math.random()\` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

https://react.dev/link/hydration-mismatch`+i),e)),Ub}function pv(e){var t=e.stateNode,i=e.type,n=e.memoizedProps;switch(t[Wt]=e,t[pi]=n,Um(i,n),i){case"dialog":ze("cancel",t),ze("close",t);break;case"iframe":case"object":case"embed":ze("load",t);break;case"video":case"audio":for(i=0;i<hc.length;i++)ze(hc[i],t);break;case"source":ze("error",t);break;case"img":case"image":case"link":ze("error",t),ze("load",t);break;case"details":ze("toggle",t);break;case"input":ci("input",n),ze("invalid",t),vy(t,n),xy(t,n.value,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name,!0);break;case"option":Ny(t,n);break;case"select":ci("select",n),ze("invalid",t),Ey(t,n);break;case"textarea":ci("textarea",n),ze("invalid",t),_y(t,n),Ay(t,n.value,n.defaultValue,n.children)}i=n.children,typeof i!="string"&&typeof i!="number"&&typeof i!="bigint"||t.textContent===""+i||n.suppressHydrationWarning===!0||R1(t.textContent,i)?(n.popover!=null&&(ze("beforetoggle",t),ze("toggle",t)),n.onScroll!=null&&ze("scroll",t),n.onScrollEnd!=null&&ze("scrollend",t),n.onClick!=null&&(t.onclick=Aa),t=!0):t=!1,t||Eo(e,!0)}function hv(e){for(Ft=e.return;Ft;)switch(Ft.tag){case 5:case 31:case 13:un=!1;return;case 27:case 3:un=!0;return;default:Ft=Ft.return}}function Ts(e){if(e!==Ft)return!1;if(!Oe)return hv(e),Oe=!0,!1;var t=e.tag,i;if((i=t!==3&&t!==27)&&((i=t===5)&&(i=e.type,i=!(i!=="form"&&i!=="button")||Om(e.type,e.memoizedProps)),i=!i),i&&ut){for(i=ut;i;){var n=Al(e,0),a=G1(i);n.serverTail.push(a),i=a.type==="Suspense"?$m(i):Mi(i.nextSibling)}Eo(e)}if(hv(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");ut=$m(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");ut=$m(e)}else t===27?(t=ut,Oo(e.type)?(e=gg,gg=null,ut=e):ut=t):ut=Ft?Mi(e.stateNode.nextSibling):null;return!0}function Dl(){ut=Ft=null,fa=Oe=!1}function uh(){var e=qo;return e!==null&&(vi===null?vi=e:vi.push.apply(vi,e),qo=null),e}function eu(e){qo===null?qo=[e]:qo.push(e)}function ch(){var e=Hi;if(e!==null){Hi=null;for(var t=Qp(e);0<e.children.length;)e=e.children[0];F(e.fiber,function(){console.error(`A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:

- A server/client branch \`if (typeof window !== 'undefined')\`.
- Variable input such as \`Date.now()\` or \`Math.random()\` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

%s%s`,"https://react.dev/link/hydration-mismatch",t)})}}function sd(){lr=yf=null,sr=!1}function _o(e,t,i){ke(Tb,t._currentValue,e),t._currentValue=i,ke(Rb,t._currentRenderer,e),t._currentRenderer!==void 0&&t._currentRenderer!==null&&t._currentRenderer!==pN&&console.error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."),t._currentRenderer=pN}function Ta(e,t){e._currentValue=Tb.current;var i=Rb.current;ve(Rb,t),e._currentRenderer=i,ve(Tb,t)}function dh(e,t,i){for(;e!==null;){var n=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,n!==null&&(n.childLanes|=t)):n!==null&&(n.childLanes&t)!==t&&(n.childLanes|=t),e===i)break;e=e.return}e!==i&&console.error("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.")}function fh(e,t,i,n){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;e:for(;o!==null;){var d=o;o=a;for(var m=0;m<t.length;m++)if(d.context===t[m]){o.lanes|=i,d=o.alternate,d!==null&&(d.lanes|=i),dh(o.return,i,e),n||(s=null);break e}o=d.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error("We just came from a parent so we must have had a parent. This is a bug in React.");s.lanes|=i,o=s.alternate,o!==null&&(o.lanes|=i),dh(s,i,e),s=null}else s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function Rs(e,t,i,n){e=null;for(var a=t,o=!1;a!==null;){if(!o){if((a.flags&524288)!==0)o=!0;else if((a.flags&262144)!==0)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error("Should have a current fiber. This is a bug in React.");if(s=s.memoizedProps,s!==null){var d=a.type;mi(a.pendingProps.value,s.value)||(e!==null?e.push(d):e=[d])}}else if(a===nf.current){if(s=a.alternate,s===null)throw Error("Should have a current fiber. This is a bug in React.");s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e!==null?e.push(vc):e=[vc])}a=a.return}e!==null&&fh(t,e,i,n),t.flags|=262144}function rd(e){for(e=e.firstContext;e!==null;){if(!mi(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ul(e){yf=e,lr=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function ft(e){return sr&&console.error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."),mv(yf,e)}function ud(e,t){return yf===null&&Ul(e),mv(e,t)}function mv(e,t){var i=t._currentValue;if(t={context:t,memoizedValue:i,next:null},lr===null){if(e===null)throw Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");lr=t,e.dependencies={lanes:0,firstContext:t,_debugThenableState:null},e.flags|=524288}else lr=lr.next=t;return i}function ph(){return{controller:new qD,data:new Map,refCount:0}}function Tl(e){e.controller.signal.aborted&&console.warn("A cache instance was retained after it was already freed. This likely indicates a bug in React."),e.refCount++}function tu(e){e.refCount--,0>e.refCount&&console.warn("A cache instance was released after it was already freed. This likely indicates a bug in React."),e.refCount===0&&YD(GD,function(){e.controller.abort()})}function Qn(e,t,i){(e&127)!==0?0>pa&&(pa=Tt(),qu=vf(t),Cb=t,i!=null&&(kb=le(i)),(Le&(Bt|Gi))!==Xt&&(vt=!0,Go=Hu),e=Su(),t=Nu(),e!==rr||t!==Yu?rr=-1.1:t!==null&&(Go=Hu),Hl=e,Yu=t):(e&4194048)!==0&&0>cn&&(cn=Tt(),Gu=vf(t),hN=t,i!=null&&(mN=le(i)),0>Ya)&&(e=Su(),t=Nu(),(e!==Qo||t!==ql)&&(Qo=-1.1),Xo=e,ql=t)}function rw(e){if(0>pa){pa=Tt(),qu=e._debugTask!=null?e._debugTask:null,(Le&(Bt|Gi))!==Xt&&(Go=Hu);var t=Su(),i=Nu();t!==rr||i!==Yu?rr=-1.1:i!==null&&(Go=Hu),Hl=t,Yu=i}0>cn&&(cn=Tt(),Gu=e._debugTask!=null?e._debugTask:null,0>Ya)&&(e=Su(),t=Nu(),(e!==Qo||t!==ql)&&(Qo=-1.1),Xo=e,ql=t)}function Ra(){var e=Bl;return Bl=0,e}function cd(e){var t=Bl;return Bl=e,t}function iu(e){var t=Bl;return Bl+=e,t}function dd(){fe=ue=-1.1}function zi(){var e=ue;return ue=-1.1,e}function ji(e){0<=e&&(ue=e)}function Zn(){var e=ht;return ht=-0,e}function Pn(e){0<=e&&(ht=e)}function Jn(){var e=pt;return pt=null,e}function In(){var e=vt;return vt=!1,e}function hh(e){bi=Tt(),0>e.actualStartTime&&(e.actualStartTime=bi)}function mh(e){if(0<=bi){var t=Tt()-bi;e.actualDuration+=t,e.selfBaseDuration=t,bi=-1}}function bv(e){if(0<=bi){var t=Tt()-bi;e.actualDuration+=t,bi=-1}}function Kn(){if(0<=bi){var e=Tt(),t=e-bi;bi=-1,Bl+=t,ht+=t,fe=e}}function gv(e){pt===null&&(pt=[]),pt.push(e),Ha===null&&(Ha=[]),Ha.push(e)}function Wn(){bi=Tt(),0>ue&&(ue=bi)}function nu(e){for(var t=e.child;t;)e.actualDuration+=t.actualDuration,t=t.sibling}function uw(e,t){if(Qu===null){var i=Qu=[];zb=0,Yl=_m(),ur={status:"pending",value:void 0,then:function(n){i.push(n)}}}return zb++,t.then(yv,yv),t}function yv(){if(--zb===0&&(-1<cn||(Ya=-1.1),Qu!==null)){ur!==null&&(ur.status="fulfilled");var e=Qu;Qu=null,Yl=0,ur=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function cw(e,t){var i=[],n={status:"pending",value:null,reason:null,then:function(a){i.push(a)}};return e.then(function(){n.status="fulfilled",n.value=t;for(var a=0;a<i.length;a++)(0,i[a])(t)},function(a){for(n.status="rejected",n.reason=a,a=0;a<i.length;a++)(0,i[a])(void 0)}),n}function bh(){var e=Gl.current;return e!==null?e:nt.pooledCache}function fd(e,t){t===null?ke(Gl,Gl.current,e):ke(Gl,t.pool,e)}function vv(){var e=bh();return e===null?null:{parent:Ut._currentValue,pool:e}}function xv(){return{didWarnAboutUncachedPromise:!1,thenables:[]}}function Nv(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Sv(e,t,i){M.actQueue!==null&&(M.didUsePromise=!0);var n=e.thenables;if(i=n[i],i===void 0?n.push(t):i!==t&&(e.didWarnAboutUncachedPromise||(e.didWarnAboutUncachedPromise=!0,console.error("A component was suspended by an uncached promise. Creating promises inside a Client Component or hook is not yet supported, except via a Suspense-compatible library or framework.")),t.then(Aa,Aa),t=i),t._debugInfo===void 0){e=performance.now(),n=t.displayName;var a={name:typeof n=="string"?n:"Promise",start:e,end:e,value:t};t._debugInfo=[{awaited:a}],t.status!=="fulfilled"&&t.status!=="rejected"&&(e=function(){a.end=performance.now()},t.then(e,e))}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,_v(e),e;default:if(typeof t.status=="string")t.then(Aa,Aa);else{if(e=nt,e!==null&&100<e.shellSuspendCounter)throw Error("An unknown Component is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.");e=t,e.status="pending",e.then(function(o){if(t.status==="pending"){var s=t;s.status="fulfilled",s.value=o}},function(o){if(t.status==="pending"){var s=t;s.status="rejected",s.reason=o}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,_v(e),e}throw Ql=t,Fu=!0,cr}}function wo(e){try{return JD(e)}catch(t){throw t!==null&&typeof t=="object"&&typeof t.then=="function"?(Ql=t,Fu=!0,cr):t}}function Ev(){if(Ql===null)throw Error("Expected a suspended thenable. This is a bug in React. Please file an issue.");var e=Ql;return Ql=null,Fu=!1,e}function _v(e){if(e===cr||e===Df)throw Error("Hooks are not supported inside an async component. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.")}function Jt(e){var t=we;return e!=null&&(we=t===null?e:t.concat(e)),t}function gh(){var e=we;if(e!=null){for(var t=e.length-1;0<=t;t--)if(e[t].name!=null){var i=e[t].debugTask;if(i!=null)return i}}return null}function pd(e,t,i){for(var n=Object.keys(e.props),a=0;a<n.length;a++){var o=n[a];if(o!=="children"&&o!=="key"){t===null&&(t=od(e,i.mode,0),t._debugInfo=we,t.return=i),F(t,function(s){console.error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",s)},o);break}}}function hd(e){var t=ec;return ec+=1,dr===null&&(dr=xv()),Sv(dr,e,t)}function au(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function wv(e,t){throw t.$$typeof===DA?Error(`A React Element from an older version of React was rendered. This is not supported. It can happen if:
- Multiple copies of the "react" package is used.
- A library pre-bundled an old copy of "react" or "react/jsx-runtime".
- A compiler tries to "inline" JSX instead of using the runtime.`):(e=Object.prototype.toString.call(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead."))}function md(e,t){var i=gh();i!==null?i.run(wv.bind(null,e,t)):wv(e,t)}function Av(e,t){var i=le(e)||"Component";jN[i]||(jN[i]=!0,t=t.displayName||t.name||"Component",e.tag===3?console.error(`Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.
  root.render(%s)`,t,t,t):console.error(`Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.
  <%s>{%s}</%s>`,t,t,i,t,i))}function bd(e,t){var i=gh();i!==null?i.run(Av.bind(null,e,t)):Av(e,t)}function Dv(e,t){var i=le(e)||"Component";VN[i]||(VN[i]=!0,t=String(t),e.tag===3?console.error(`Symbols are not valid as a React child.
  root.render(%s)`,t):console.error(`Symbols are not valid as a React child.
  <%s>%s</%s>`,i,t,i))}function gd(e,t){var i=gh();i!==null?i.run(Dv.bind(null,e,t)):Dv(e,t)}function Uv(e){function t(S,w){if(e){var D=S.deletions;D===null?(S.deletions=[w],S.flags|=16):D.push(w)}}function i(S,w){if(!e)return null;for(;w!==null;)t(S,w),w=w.sibling;return null}function n(S){for(var w=new Map;S!==null;)S.key!==null?w.set(S.key,S):w.set(S.index,S),S=S.sibling;return w}function a(S,w){return S=Da(S,w),S.index=0,S.sibling=null,S}function o(S,w,D){return S.index=D,e?(D=S.alternate,D!==null?(D=D.index,D<w?(S.flags|=67108866,w):D):(S.flags|=67108866,w)):(S.flags|=1048576,w)}function s(S){return e&&S.alternate===null&&(S.flags|=67108866),S}function d(S,w,D,L){return w===null||w.tag!==6?(w=oh(D,S.mode,L),w.return=S,w._debugOwner=S,w._debugTask=S._debugTask,w._debugInfo=we,w):(w=a(w,D),w.return=S,w._debugInfo=we,w)}function m(S,w,D,L){var P=D.type;return P===Xs?(w=U(S,w,D.props.children,L,D.key),pd(D,w,S),w):w!==null&&(w.elementType===P||av(w,D)||typeof P=="object"&&P!==null&&P.$$typeof===Bi&&wo(P)===w.type)?(w=a(w,D.props),au(w,D),w.return=S,w._debugOwner=D._owner,w._debugInfo=we,w):(w=od(D,S.mode,L),au(w,D),w.return=S,w._debugInfo=we,w)}function g(S,w,D,L){return w===null||w.tag!==4||w.stateNode.containerInfo!==D.containerInfo||w.stateNode.implementation!==D.implementation?(w=lh(D,S.mode,L),w.return=S,w._debugInfo=we,w):(w=a(w,D.children||[]),w.return=S,w._debugInfo=we,w)}function U(S,w,D,L,P){return w===null||w.tag!==7?(w=wl(D,S.mode,L,P),w.return=S,w._debugOwner=S,w._debugTask=S._debugTask,w._debugInfo=we,w):(w=a(w,D),w.return=S,w._debugInfo=we,w)}function T(S,w,D){if(typeof w=="string"&&w!==""||typeof w=="number"||typeof w=="bigint")return w=oh(""+w,S.mode,D),w.return=S,w._debugOwner=S,w._debugTask=S._debugTask,w._debugInfo=we,w;if(typeof w=="object"&&w!==null){switch(w.$$typeof){case oa:return D=od(w,S.mode,D),au(D,w),D.return=S,S=Jt(w._debugInfo),D._debugInfo=we,we=S,D;case Gs:return w=lh(w,S.mode,D),w.return=S,w._debugInfo=we,w;case Bi:var L=Jt(w._debugInfo);return w=wo(w),S=T(S,w,D),we=L,S}if($t(w)||jt(w))return D=wl(w,S.mode,D,null),D.return=S,D._debugOwner=S,D._debugTask=S._debugTask,S=Jt(w._debugInfo),D._debugInfo=we,we=S,D;if(typeof w.then=="function")return L=Jt(w._debugInfo),S=T(S,hd(w),D),we=L,S;if(w.$$typeof===la)return T(S,ud(S,w),D);md(S,w)}return typeof w=="function"&&bd(S,w),typeof w=="symbol"&&gd(S,w),null}function _(S,w,D,L){var P=w!==null?w.key:null;if(typeof D=="string"&&D!==""||typeof D=="number"||typeof D=="bigint")return P!==null?null:d(S,w,""+D,L);if(typeof D=="object"&&D!==null){switch(D.$$typeof){case oa:return D.key===P?(P=Jt(D._debugInfo),S=m(S,w,D,L),we=P,S):null;case Gs:return D.key===P?g(S,w,D,L):null;case Bi:return P=Jt(D._debugInfo),D=wo(D),S=_(S,w,D,L),we=P,S}if($t(D)||jt(D))return P!==null?null:(P=Jt(D._debugInfo),S=U(S,w,D,L,null),we=P,S);if(typeof D.then=="function")return P=Jt(D._debugInfo),S=_(S,w,hd(D),L),we=P,S;if(D.$$typeof===la)return _(S,w,ud(S,D),L);md(S,D)}return typeof D=="function"&&bd(S,D),typeof D=="symbol"&&gd(S,D),null}function j(S,w,D,L,P){if(typeof L=="string"&&L!==""||typeof L=="number"||typeof L=="bigint")return S=S.get(D)||null,d(w,S,""+L,P);if(typeof L=="object"&&L!==null){switch(L.$$typeof){case oa:return D=S.get(L.key===null?D:L.key)||null,S=Jt(L._debugInfo),w=m(w,D,L,P),we=S,w;case Gs:return S=S.get(L.key===null?D:L.key)||null,g(w,S,L,P);case Bi:var ye=Jt(L._debugInfo);return L=wo(L),w=j(S,w,D,L,P),we=ye,w}if($t(L)||jt(L))return D=S.get(D)||null,S=Jt(L._debugInfo),w=U(w,D,L,P,null),we=S,w;if(typeof L.then=="function")return ye=Jt(L._debugInfo),w=j(S,w,D,hd(L),P),we=ye,w;if(L.$$typeof===la)return j(S,w,D,ud(w,L),P);md(w,L)}return typeof L=="function"&&bd(w,L),typeof L=="symbol"&&gd(w,L),null}function Q(S,w,D,L){if(typeof D!="object"||D===null)return L;switch(D.$$typeof){case oa:case Gs:z(S,w,D);var P=D.key;if(typeof P!="string")break;if(L===null){L=new Set,L.add(P);break}if(!L.has(P)){L.add(P);break}F(w,function(){console.error("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.",P)});break;case Bi:D=wo(D),Q(S,w,D,L)}return L}function K(S,w,D,L){for(var P=null,ye=null,re=null,oe=w,Ee=w=0,ct=null;oe!==null&&Ee<D.length;Ee++){oe.index>Ee?(ct=oe,oe=null):ct=oe.sibling;var _t=_(S,oe,D[Ee],L);if(_t===null){oe===null&&(oe=ct);break}P=Q(S,_t,D[Ee],P),e&&oe&&_t.alternate===null&&t(S,oe),w=o(_t,w,Ee),re===null?ye=_t:re.sibling=_t,re=_t,oe=ct}if(Ee===D.length)return i(S,oe),Oe&&Ua(S,Ee),ye;if(oe===null){for(;Ee<D.length;Ee++)oe=T(S,D[Ee],L),oe!==null&&(P=Q(S,oe,D[Ee],P),w=o(oe,w,Ee),re===null?ye=oe:re.sibling=oe,re=oe);return Oe&&Ua(S,Ee),ye}for(oe=n(oe);Ee<D.length;Ee++)ct=j(oe,S,Ee,D[Ee],L),ct!==null&&(P=Q(S,ct,D[Ee],P),e&&ct.alternate!==null&&oe.delete(ct.key===null?Ee:ct.key),w=o(ct,w,Ee),re===null?ye=ct:re.sibling=ct,re=ct);return e&&oe.forEach(function(Ka){return t(S,Ka)}),Oe&&Ua(S,Ee),ye}function st(S,w,D,L){if(D==null)throw Error("An iterable object provided no iterator.");for(var P=null,ye=null,re=w,oe=w=0,Ee=null,ct=null,_t=D.next();re!==null&&!_t.done;oe++,_t=D.next()){re.index>oe?(Ee=re,re=null):Ee=re.sibling;var Ka=_(S,re,_t.value,L);if(Ka===null){re===null&&(re=Ee);break}ct=Q(S,Ka,_t.value,ct),e&&re&&Ka.alternate===null&&t(S,re),w=o(Ka,w,oe),ye===null?P=Ka:ye.sibling=Ka,ye=Ka,re=Ee}if(_t.done)return i(S,re),Oe&&Ua(S,oe),P;if(re===null){for(;!_t.done;oe++,_t=D.next())re=T(S,_t.value,L),re!==null&&(ct=Q(S,re,_t.value,ct),w=o(re,w,oe),ye===null?P=re:ye.sibling=re,ye=re);return Oe&&Ua(S,oe),P}for(re=n(re);!_t.done;oe++,_t=D.next())Ee=j(re,S,oe,_t.value,L),Ee!==null&&(ct=Q(S,Ee,_t.value,ct),e&&Ee.alternate!==null&&re.delete(Ee.key===null?oe:Ee.key),w=o(Ee,w,oe),ye===null?P=Ee:ye.sibling=Ee,ye=Ee);return e&&re.forEach(function(vU){return t(S,vU)}),Oe&&Ua(S,oe),P}function Ve(S,w,D,L){if(typeof D=="object"&&D!==null&&D.type===Xs&&D.key===null&&(pd(D,null,S),D=D.props.children),typeof D=="object"&&D!==null){switch(D.$$typeof){case oa:var P=Jt(D._debugInfo);e:{for(var ye=D.key;w!==null;){if(w.key===ye){if(ye=D.type,ye===Xs){if(w.tag===7){i(S,w.sibling),L=a(w,D.props.children),L.return=S,L._debugOwner=D._owner,L._debugInfo=we,pd(D,L,S),S=L;break e}}else if(w.elementType===ye||av(w,D)||typeof ye=="object"&&ye!==null&&ye.$$typeof===Bi&&wo(ye)===w.type){i(S,w.sibling),L=a(w,D.props),au(L,D),L.return=S,L._debugOwner=D._owner,L._debugInfo=we,S=L;break e}i(S,w);break}else t(S,w);w=w.sibling}D.type===Xs?(L=wl(D.props.children,S.mode,L,D.key),L.return=S,L._debugOwner=S,L._debugTask=S._debugTask,L._debugInfo=we,pd(D,L,S),S=L):(L=od(D,S.mode,L),au(L,D),L.return=S,L._debugInfo=we,S=L)}return S=s(S),we=P,S;case Gs:e:{for(P=D,D=P.key;w!==null;){if(w.key===D)if(w.tag===4&&w.stateNode.containerInfo===P.containerInfo&&w.stateNode.implementation===P.implementation){i(S,w.sibling),L=a(w,P.children||[]),L.return=S,S=L;break e}else{i(S,w);break}else t(S,w);w=w.sibling}L=lh(P,S.mode,L),L.return=S,S=L}return s(S);case Bi:return P=Jt(D._debugInfo),D=wo(D),S=Ve(S,w,D,L),we=P,S}if($t(D))return P=Jt(D._debugInfo),S=K(S,w,D,L),we=P,S;if(jt(D)){if(P=Jt(D._debugInfo),ye=jt(D),typeof ye!="function")throw Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");var re=ye.call(D);return re===D?(S.tag!==0||Object.prototype.toString.call(S.type)!=="[object GeneratorFunction]"||Object.prototype.toString.call(re)!=="[object Generator]")&&(ON||console.error("Using Iterators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. You can also use an Iterable that can iterate multiple times over the same items."),ON=!0):D.entries!==ye||Mb||(console.error("Using Maps as children is not supported. Use an array of keyed ReactElements instead."),Mb=!0),S=st(S,w,re,L),we=P,S}if(typeof D.then=="function")return P=Jt(D._debugInfo),S=Ve(S,w,hd(D),L),we=P,S;if(D.$$typeof===la)return Ve(S,w,ud(S,D),L);md(S,D)}return typeof D=="string"&&D!==""||typeof D=="number"||typeof D=="bigint"?(P=""+D,w!==null&&w.tag===6?(i(S,w.sibling),L=a(w,P),L.return=S,S=L):(i(S,w),L=oh(P,S.mode,L),L.return=S,L._debugOwner=S,L._debugTask=S._debugTask,L._debugInfo=we,S=L),s(S)):(typeof D=="function"&&bd(S,D),typeof D=="symbol"&&gd(S,D),i(S,w))}return function(S,w,D,L){var P=we;we=null;try{ec=0;var ye=Ve(S,w,D,L);return dr=null,ye}catch(ct){if(ct===cr||ct===Df)throw ct;var re=x(29,ct,null,S.mode);re.lanes=L,re.return=S;var oe=re._debugInfo=we;if(re._debugOwner=S._debugOwner,re._debugTask=S._debugTask,oe!=null){for(var Ee=oe.length-1;0<=Ee;Ee--)if(typeof oe[Ee].stack=="string"){re._debugOwner=oe[Ee],re._debugTask=oe[Ee].debugTask;break}}return re}finally{we=P}}}function Tv(e,t){var i=$t(e);return e=!i&&typeof jt(e)=="function",i||e?(i=i?"array":"iterable",console.error("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>",i,t,i),!1):!0}function yh(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function vh(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Ao(e){return{lane:e,tag:MN,payload:null,callback:null,next:null}}function Do(e,t,i){var n=e.updateQueue;if(n===null)return null;if(n=n.shared,Lb===n&&!HN){var a=le(e);console.error(`An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback.

Please update the following component: %s`,a),HN=!0}return(Le&Bt)!==Xt?(a=n.pending,a===null?t.next=t:(t.next=a.next,a.next=t),n.pending=t,t=ad(e),nv(e,null,i),t):(nd(e,n,t,i),ad(e))}function ou(e,t,i){if(t=t.updateQueue,t!==null&&(t=t.shared,(i&4194048)!==0)){var n=t.lanes;n&=e.pendingLanes,i|=n,t.lanes=i,Qr(e,i)}}function yd(e,t){var i=e.updateQueue,n=e.alternate;if(n!==null&&(n=n.updateQueue,i===n)){var a=null,o=null;if(i=i.firstBaseUpdate,i!==null){do{var s={lane:i.lane,tag:i.tag,payload:i.payload,callback:null,next:null};o===null?a=o=s:o=o.next=s,i=i.next}while(i!==null);o===null?a=o=t:o=o.next=t}else a=o=t;i={baseState:n.baseState,firstBaseUpdate:a,lastBaseUpdate:o,shared:n.shared,callbacks:n.callbacks},e.updateQueue=i;return}e=i.lastBaseUpdate,e===null?i.firstBaseUpdate=t:e.next=t,i.lastBaseUpdate=t}function lu(){if(Hb){var e=ur;if(e!==null)throw e}}function su(e,t,i,n){Hb=!1;var a=e.updateQueue;Zo=!1,Lb=a.shared;var o=a.firstBaseUpdate,s=a.lastBaseUpdate,d=a.shared.pending;if(d!==null){a.shared.pending=null;var m=d,g=m.next;m.next=null,s===null?o=g:s.next=g,s=m;var U=e.alternate;U!==null&&(U=U.updateQueue,d=U.lastBaseUpdate,d!==s&&(d===null?U.firstBaseUpdate=g:d.next=g,U.lastBaseUpdate=m))}if(o!==null){var T=a.baseState;s=0,U=g=m=null,d=o;do{var _=d.lane&-536870913,j=_!==d.lane;if(j?(Ae&_)===_:(n&_)===_){_!==0&&_===Yl&&(Hb=!0),U!==null&&(U=U.next={lane:0,tag:d.tag,payload:d.payload,callback:null,next:null});e:{_=e;var Q=d,K=t,st=i;switch(Q.tag){case BN:if(Q=Q.payload,typeof Q=="function"){sr=!0;var Ve=Q.call(st,T,K);if(_.mode&ai){ne(!0);try{Q.call(st,T,K)}finally{ne(!1)}}sr=!1,T=Ve;break e}T=Q;break e;case Bb:_.flags=_.flags&-65537|128;case MN:if(Ve=Q.payload,typeof Ve=="function"){if(sr=!0,Q=Ve.call(st,T,K),_.mode&ai){ne(!0);try{Ve.call(st,T,K)}finally{ne(!1)}}sr=!1}else Q=Ve;if(Q==null)break e;T=Ce({},T,Q);break e;case LN:Zo=!0}}_=d.callback,_!==null&&(e.flags|=64,j&&(e.flags|=8192),j=a.callbacks,j===null?a.callbacks=[_]:j.push(_))}else j={lane:_,tag:d.tag,payload:d.payload,callback:d.callback,next:null},U===null?(g=U=j,m=T):U=U.next=j,s|=_;if(d=d.next,d===null){if(d=a.shared.pending,d===null)break;j=d,d=j.next,j.next=null,a.lastBaseUpdate=j,a.shared.pending=null}}while(!0);U===null&&(m=T),a.baseState=m,a.firstBaseUpdate=g,a.lastBaseUpdate=U,o===null&&(a.shared.lanes=0),Io|=s,e.lanes=s,e.memoizedState=T}Lb=null}function Rv(e,t){if(typeof e!="function")throw Error("Invalid argument passed as callback. Expected a function. Instead received: "+e);e.call(t)}function dw(e,t){var i=e.shared.hiddenCallbacks;if(i!==null)for(e.shared.hiddenCallbacks=null,e=0;e<i.length;e++)Rv(i[e],t)}function Cv(e,t){var i=e.callbacks;if(i!==null)for(e.callbacks=null,e=0;e<i.length;e++)Rv(i[e],t)}function kv(e,t){var i=ma;ke(Tf,i,e),ke(fr,t,e),ma=i|t.baseLanes}function xh(e){ke(Tf,ma,e),ke(fr,fr.current,e)}function Nh(e){ma=Tf.current,ve(fr,e),ve(Tf,e)}function Uo(e){var t=e.alternate;ke(Et,Et.current&pr,e),ke(qi,e,e),dn===null&&(t===null||fr.current!==null||t.memoizedState!==null)&&(dn=e)}function Sh(e){ke(Et,Et.current,e),ke(qi,e,e),dn===null&&(dn=e)}function Ov(e){e.tag===22?(ke(Et,Et.current,e),ke(qi,e,e),dn===null&&(dn=e)):To(e)}function To(e){ke(Et,Et.current,e),ke(qi,qi.current,e)}function Vi(e){ve(qi,e),dn===e&&(dn=null),ve(Et,e)}function vd(e){for(var t=e;t!==null;){if(t.tag===13){var i=t.memoizedState;if(i!==null&&(i=i.dehydrated,i===null||jm(i)||Vm(i)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}function Re(){var e=V;pn===null?pn=[e]:pn.push(e)}function q(){var e=V;if(pn!==null&&(Qa++,pn[Qa]!==e)){var t=le(ge);if(!qN.has(t)&&(qN.add(t),pn!==null)){for(var i="",n=0;n<=Qa;n++){var a=pn[n],o=n===Qa?e:a;for(a=n+1+". "+a;30>a.length;)a+=" ";a+=o+`
`,i+=a}console.error(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://react.dev/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`,t,i)}}}function Cs(e){e==null||$t(e)||console.error("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.",V,typeof e)}function xd(){var e=le(ge);GN.has(e)||(GN.add(e),console.error("ReactDOM.useFormState has been renamed to React.useActionState. Please update %s to use React.useActionState.",e))}function xt(){throw Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`)}function Eh(e,t){if(nc)return!1;if(t===null)return console.error("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.",V),!1;e.length!==t.length&&console.error(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`,V,"["+t.join(", ")+"]","["+e.join(", ")+"]");for(var i=0;i<t.length&&i<e.length;i++)if(!mi(e[i],t[i]))return!1;return!0}function _h(e,t,i,n,a,o){Ga=o,ge=t,pn=e!==null?e._debugHookTypes:null,Qa=-1,nc=e!==null&&e.type!==t.type,(Object.prototype.toString.call(i)==="[object AsyncFunction]"||Object.prototype.toString.call(i)==="[object AsyncGeneratorFunction]")&&(o=le(ge),qb.has(o)||(qb.add(o),console.error("%s is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.",o===null?"An unknown Component":"<"+o+">"))),t.memoizedState=null,t.updateQueue=null,t.lanes=0,M.H=e!==null&&e.memoizedState!==null?Gb:pn!==null?XN:Yb,Pl=o=(t.mode&ai)!==he;var s=jb(i,n,a);if(Pl=!1,mr&&(s=wh(t,i,n,a)),o){ne(!0);try{s=wh(t,i,n,a)}finally{ne(!1)}}return zv(e,t),s}function zv(e,t){t._debugHookTypes=pn,t.dependencies===null?Xa!==null&&(t.dependencies={lanes:0,firstContext:null,_debugThenableState:Xa}):t.dependencies._debugThenableState=Xa,M.H=ac;var i=it!==null&&it.next!==null;if(Ga=0,pn=V=Rt=it=ge=null,Qa=-1,e!==null&&(e.flags&65011712)!==(t.flags&65011712)&&console.error("Internal React error: Expected static flag was missing. Please notify the React team."),Cf=!1,ic=0,Xa=null,i)throw Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");e===null||Ct||(e=e.dependencies,e!==null&&rd(e)&&(Ct=!0)),Fu?(Fu=!1,e=!0):e=!1,e&&(t=le(t)||"Unknown",YN.has(t)||qb.has(t)||(YN.add(t),console.error("`use` was called from inside a try/catch block. This is not allowed and can lead to unexpected behavior. To handle errors triggered by `use`, wrap your component in a error boundary.")))}function wh(e,t,i,n){ge=e;var a=0;do{if(mr&&(Xa=null),ic=0,mr=!1,a>=KD)throw Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");if(a+=1,nc=!1,Rt=it=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}Qa=-1,M.H=QN,o=jb(t,i,n)}while(mr);return o}function fw(){var e=M.H,t=e.useState()[0];return t=typeof t.then=="function"?ru(t):t,e=e.useState()[0],(it!==null?it.memoizedState:null)!==e&&(ge.flags|=1024),t}function Ah(){var e=kf!==0;return kf=0,e}function Dh(e,t,i){t.updateQueue=e.updateQueue,t.flags=(t.mode&Dn)!==he?t.flags&-402655237:t.flags&-2053,e.lanes&=~i}function Uh(e){if(Cf){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Cf=!1}Ga=0,pn=Rt=it=ge=null,Qa=-1,V=null,mr=!1,ic=kf=0,Xa=null}function di(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Rt===null?ge.memoizedState=Rt=e:Rt=Rt.next=e,Rt}function We(){if(it===null){var e=ge.alternate;e=e!==null?e.memoizedState:null}else e=it.next;var t=Rt===null?ge.memoizedState:Rt.next;if(t!==null)Rt=t,it=e;else{if(e===null)throw ge.alternate===null?Error("Update hook called on initial render. This is likely a bug in React. Please file an issue."):Error("Rendered more hooks than during the previous render.");it=e,e={memoizedState:it.memoizedState,baseState:it.baseState,baseQueue:it.baseQueue,queue:it.queue,next:null},Rt===null?ge.memoizedState=Rt=e:Rt=Rt.next=e}return Rt}function Nd(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ru(e){var t=ic;return ic+=1,Xa===null&&(Xa=xv()),e=Sv(Xa,e,t),t=ge,(Rt===null?t.memoizedState:Rt.next)===null&&(t=t.alternate,M.H=t!==null&&t.memoizedState!==null?Gb:Yb),e}function Ro(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return ru(e);if(e.$$typeof===la)return ft(e)}throw Error("An unsupported type was passed to use(): "+String(e))}function Rl(e){var t=null,i=ge.updateQueue;if(i!==null&&(t=i.memoCache),t==null){var n=ge.alternate;n!==null&&(n=n.updateQueue,n!==null&&(n=n.memoCache,n!=null&&(t={data:n.data.map(function(a){return a.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),i===null&&(i=Nd(),ge.updateQueue=i),i.memoCache=t,i=t.data[t.index],i===void 0||nc)for(i=t.data[t.index]=Array(e),n=0;n<e;n++)i[n]=UA;else i.length!==e&&console.error("Expected a constant size argument for each invocation of useMemoCache. The previous cache was allocated with size %s but size %s was requested.",i.length,e);return t.index++,i}function _n(e,t){return typeof t=="function"?t(e):t}function Th(e,t,i){var n=di();if(i!==void 0){var a=i(t);if(Pl){ne(!0);try{i(t)}finally{ne(!1)}}}else a=t;return n.memoizedState=n.baseState=a,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:a},n.queue=e,e=e.dispatch=gw.bind(null,ge,e),[n.memoizedState,e]}function ks(e){var t=We();return Rh(t,it,e)}function Rh(e,t,i){var n=e.queue;if(n===null)throw Error("Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)");n.lastRenderedReducer=i;var a=e.baseQueue,o=n.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue!==a&&console.error("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."),t.baseQueue=a=o,n.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var d=s=null,m=null,g=t,U=!1;do{var T=g.lane&-536870913;if(T!==g.lane?(Ae&T)===T:(Ga&T)===T){var _=g.revertLane;if(_===0)m!==null&&(m=m.next={lane:0,revertLane:0,gesture:null,action:g.action,hasEagerState:g.hasEagerState,eagerState:g.eagerState,next:null}),T===Yl&&(U=!0);else if((Ga&_)===_){g=g.next,_===Yl&&(U=!0);continue}else T={lane:0,revertLane:g.revertLane,gesture:null,action:g.action,hasEagerState:g.hasEagerState,eagerState:g.eagerState,next:null},m===null?(d=m=T,s=o):m=m.next=T,ge.lanes|=_,Io|=_;T=g.action,Pl&&i(o,T),o=g.hasEagerState?g.eagerState:i(o,T)}else _={lane:T,revertLane:g.revertLane,gesture:g.gesture,action:g.action,hasEagerState:g.hasEagerState,eagerState:g.eagerState,next:null},m===null?(d=m=_,s=o):m=m.next=_,ge.lanes|=T,Io|=T;g=g.next}while(g!==null&&g!==t);if(m===null?s=o:m.next=d,!mi(o,e.memoizedState)&&(Ct=!0,U&&(i=ur,i!==null)))throw i;e.memoizedState=o,e.baseState=s,e.baseQueue=m,n.lastRenderedState=o}return a===null&&(n.lanes=0),[e.memoizedState,n.dispatch]}function uu(e){var t=We(),i=t.queue;if(i===null)throw Error("Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)");i.lastRenderedReducer=e;var n=i.dispatch,a=i.pending,o=t.memoizedState;if(a!==null){i.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);mi(o,t.memoizedState)||(Ct=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),i.lastRenderedState=o}return[o,n]}function Ch(e,t,i){var n=ge,a=di();if(Oe){if(i===void 0)throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");var o=i();hr||o===i()||(console.error("The result of getServerSnapshot should be cached to avoid an infinite loop"),hr=!0)}else{if(o=t(),hr||(i=t(),mi(o,i)||(console.error("The result of getSnapshot should be cached to avoid an infinite loop"),hr=!0)),nt===null)throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");(Ae&127)!==0||jv(n,t,o)}return a.memoizedState=o,i={value:o,getSnapshot:t},a.queue=i,wd($v.bind(null,n,i,e),[e]),n.flags|=2048,zs(fn|yi,{destroy:void 0},Vv.bind(null,n,i,o,t),null),o}function Sd(e,t,i){var n=ge,a=We(),o=Oe;if(o){if(i===void 0)throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");i=i()}else if(i=t(),!hr){var s=t();mi(i,s)||(console.error("The result of getSnapshot should be cached to avoid an infinite loop"),hr=!0)}(s=!mi((it||a).memoizedState,i))&&(a.memoizedState=i,Ct=!0),a=a.queue;var d=$v.bind(null,n,a,e);if(Si(2048,yi,d,[e]),a.getSnapshot!==t||s||Rt!==null&&Rt.memoizedState.tag&fn){if(n.flags|=2048,zs(fn|yi,{destroy:void 0},Vv.bind(null,n,a,i,t),null),nt===null)throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");o||(Ga&127)!==0||jv(n,t,i)}return i}function jv(e,t,i){e.flags|=16384,e={getSnapshot:t,value:i},t=ge.updateQueue,t===null?(t=Nd(),ge.updateQueue=t,t.stores=[e]):(i=t.stores,i===null?t.stores=[e]:i.push(e))}function Vv(e,t,i,n){t.value=i,t.getSnapshot=n,Mv(t)&&Bv(e)}function $v(e,t,i){return i(function(){Mv(t)&&(Qn(2,"updateSyncExternalStore()",e),Bv(e))})}function Mv(e){var t=e.getSnapshot;e=e.value;try{var i=t();return!mi(e,i)}catch{return!0}}function Bv(e){var t=ii(e,2);t!==null&&yt(t,e,2)}function kh(e){var t=di();if(typeof e=="function"){var i=e;if(e=i(),Pl){ne(!0);try{i()}finally{ne(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:_n,lastRenderedState:e},t}function Oh(e){e=kh(e);var t=e.queue,i=a0.bind(null,ge,t);return t.dispatch=i,[e.memoizedState,i]}function zh(e){var t=di();t.memoizedState=t.baseState=e;var i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=i,t=Ph.bind(null,ge,!0,i),i.dispatch=t,[e,t]}function Lv(e,t){var i=We();return Hv(i,it,e,t)}function Hv(e,t,i,n){return e.baseState=i,Rh(e,it,typeof n=="function"?n:_n)}function qv(e,t){var i=We();return it!==null?Hv(i,it,e,t):(i.baseState=e,[e,i.queue.dispatch])}function pw(e,t,i,n,a){if(Cd(e))throw Error("Cannot update form state while rendering.");if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(s){o.listeners.push(s)}};M.T!==null?i(!0):o.isTransition=!1,n(o),i=t.pending,i===null?(o.next=t.pending=o,Yv(t,o)):(o.next=i.next,t.pending=i.next=o)}}function Yv(e,t){var i=t.action,n=t.payload,a=e.state;if(t.isTransition){var o=M.T,s={};s._updatedFibers=new Set,M.T=s;try{var d=i(a,n),m=M.S;m!==null&&m(s,d),Gv(e,t,d)}catch(g){jh(e,t,g)}finally{o!==null&&s.types!==null&&(o.types!==null&&o.types!==s.types&&console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."),o.types=s.types),M.T=o,o===null&&s._updatedFibers&&(e=s._updatedFibers.size,s._updatedFibers.clear(),10<e&&console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."))}}else try{s=i(a,n),Gv(e,t,s)}catch(g){jh(e,t,g)}}function Gv(e,t,i){i!==null&&typeof i=="object"&&typeof i.then=="function"?(M.asyncTransitions++,i.then(Rd,Rd),i.then(function(n){Xv(e,t,n)},function(n){return jh(e,t,n)}),t.isTransition||console.error("An async function with useActionState was called outside of a transition. This is likely not what you intended (for example, isPending will not update correctly). Either call the returned function inside startTransition, or pass it to an `action` or `formAction` prop.")):Xv(e,t,i)}function Xv(e,t,i){t.status="fulfilled",t.value=i,Qv(t),e.state=i,t=e.pending,t!==null&&(i=t.next,i===t?e.pending=null:(i=i.next,t.next=i,Yv(e,i)))}function jh(e,t,i){var n=e.pending;if(e.pending=null,n!==null){n=n.next;do t.status="rejected",t.reason=i,Qv(t),t=t.next;while(t!==n)}e.action=null}function Qv(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Zv(e,t){return t}function Os(e,t){if(Oe){var i=nt.formState;if(i!==null){e:{var n=ge;if(Oe){if(ut){t:{for(var a=ut,o=un;a.nodeType!==8;){if(!o){a=null;break t}if(a=Mi(a.nextSibling),a===null){a=null;break t}}o=a.data,a=o===pg||o===CS?a:null}if(a){ut=Mi(a.nextSibling),n=a.data===pg;break e}}Eo(n)}n=!1}n&&(t=i[0])}}return i=di(),i.memoizedState=i.baseState=t,n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Zv,lastRenderedState:t},i.queue=n,i=a0.bind(null,ge,n),n.dispatch=i,n=kh(!1),o=Ph.bind(null,ge,!1,n.queue),n=di(),a={state:t,dispatch:null,action:e,pending:null},n.queue=a,i=pw.bind(null,ge,a,o,i),a.dispatch=i,n.memoizedState=e,[t,i,!1]}function Ed(e){var t=We();return Pv(t,it,e)}function Pv(e,t,i){if(t=Rh(e,t,Zv)[0],e=ks(_n)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var n=ru(t)}catch(s){throw s===cr?Df:s}else n=t;t=We();var a=t.queue,o=a.dispatch;return i!==t.memoizedState&&(ge.flags|=2048,zs(fn|yi,{destroy:void 0},hw.bind(null,a,i),null)),[n,o,e]}function hw(e,t){e.action=t}function _d(e){var t=We(),i=it;if(i!==null)return Pv(t,i,e);We(),t=t.memoizedState,i=We();var n=i.queue.dispatch;return i.memoizedState=e,[t,n,!1]}function zs(e,t,i,n){return e={tag:e,create:i,deps:n,inst:t,next:null},t=ge.updateQueue,t===null&&(t=Nd(),ge.updateQueue=t),i=t.lastEffect,i===null?t.lastEffect=e.next=e:(n=i.next,i.next=e,e.next=n,t.lastEffect=e),e}function Vh(e){var t=di();return e={current:e},t.memoizedState=e}function Cl(e,t,i,n){var a=di();ge.flags|=e,a.memoizedState=zs(fn|t,{destroy:void 0},i,n===void 0?null:n)}function Si(e,t,i,n){var a=We();n=n===void 0?null:n;var o=a.memoizedState.inst;it!==null&&n!==null&&Eh(n,it.memoizedState.deps)?a.memoizedState=zs(t,o,i,n):(ge.flags|=e,a.memoizedState=zs(fn|t,o,i,n))}function wd(e,t){(ge.mode&Dn)!==he?Cl(276826112,yi,e,t):Cl(8390656,yi,e,t)}function mw(e){ge.flags|=4;var t=ge.updateQueue;if(t===null)t=Nd(),ge.updateQueue=t,t.events=[e];else{var i=t.events;i===null?t.events=[e]:i.push(e)}}function $h(e){var t=di(),i={impl:e};return t.memoizedState=i,function(){if((Le&Bt)!==Xt)throw Error("A function wrapped in useEffectEvent can't be called during rendering.");return i.impl.apply(void 0,arguments)}}function Ad(e){var t=We().memoizedState;return mw({ref:t,nextImpl:e}),function(){if((Le&Bt)!==Xt)throw Error("A function wrapped in useEffectEvent can't be called during rendering.");return t.impl.apply(void 0,arguments)}}function Mh(e,t){var i=4194308;return(ge.mode&Dn)!==he&&(i|=134217728),Cl(i,Yi,e,t)}function Jv(e,t){if(typeof t=="function"){e=e();var i=t(e);return function(){typeof i=="function"?i():t(null)}}if(t!=null)return t.hasOwnProperty("current")||console.error("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.","an object with keys {"+Object.keys(t).join(", ")+"}"),e=e(),t.current=e,function(){t.current=null}}function Bh(e,t,i){typeof t!="function"&&console.error("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",t!==null?typeof t:"null"),i=i!=null?i.concat([e]):null;var n=4194308;(ge.mode&Dn)!==he&&(n|=134217728),Cl(n,Yi,Jv.bind(null,t,e),i)}function Dd(e,t,i){typeof t!="function"&&console.error("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",t!==null?typeof t:"null"),i=i!=null?i.concat([e]):null,Si(4,Yi,Jv.bind(null,t,e),i)}function Lh(e,t){return di().memoizedState=[e,t===void 0?null:t],e}function Ud(e,t){var i=We();t=t===void 0?null:t;var n=i.memoizedState;return t!==null&&Eh(t,n[1])?n[0]:(i.memoizedState=[e,t],e)}function Hh(e,t){var i=di();t=t===void 0?null:t;var n=e();if(Pl){ne(!0);try{e()}finally{ne(!1)}}return i.memoizedState=[n,t],n}function Td(e,t){var i=We();t=t===void 0?null:t;var n=i.memoizedState;if(t!==null&&Eh(t,n[1]))return n[0];if(n=e(),Pl){ne(!0);try{e()}finally{ne(!1)}}return i.memoizedState=[n,t],n}function qh(e,t){var i=di();return Yh(i,e,t)}function Iv(e,t){var i=We();return Wv(i,it.memoizedState,e,t)}function Kv(e,t){var i=We();return it===null?Yh(i,e,t):Wv(i,it.memoizedState,e,t)}function Yh(e,t,i){return i===void 0||(Ga&1073741824)!==0&&(Ae&261930)===0?e.memoizedState=t:(e.memoizedState=i,e=F0(),ge.lanes|=e,Io|=e,i)}function Wv(e,t,i,n){return mi(i,t)?i:fr.current!==null?(e=Yh(e,i,n),mi(e,t)||(Ct=!0),e):(Ga&42)===0||(Ga&1073741824)!==0&&(Ae&261930)===0?(Ct=!0,e.memoizedState=i):(e=F0(),ge.lanes|=e,Io|=e,t)}function Rd(){M.asyncTransitions--}function Fv(e,t,i,n,a){var o=Je.p;Je.p=o!==0&&o<ca?o:ca;var s=M.T,d={};d._updatedFibers=new Set,M.T=d,Ph(e,!1,t,i);try{var m=a(),g=M.S;if(g!==null&&g(d,m),m!==null&&typeof m=="object"&&typeof m.then=="function"){M.asyncTransitions++,m.then(Rd,Rd);var U=cw(m,n);cu(e,t,U,$i(e))}else cu(e,t,n,$i(e))}catch(T){cu(e,t,{then:function(){},status:"rejected",reason:T},$i(e))}finally{Je.p=o,s!==null&&d.types!==null&&(s.types!==null&&s.types!==d.types&&console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."),s.types=d.types),M.T=s,s===null&&d._updatedFibers&&(e=d._updatedFibers.size,d._updatedFibers.clear(),10<e&&console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."))}}function Gh(e,t,i,n){if(e.tag!==5)throw Error("Expected the form instance to be a HostComponent. This is a bug in React.");var a=e0(e).queue;rw(e),Fv(e,a,t,os,i===null?O:function(){return t0(e),i(n)})}function e0(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:os,baseState:os,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:_n,lastRenderedState:os},next:null};var i={};return t.next={memoizedState:i,baseState:i,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:_n,lastRenderedState:i},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function t0(e){M.T===null&&console.error("requestFormReset was called outside a transition or action. To fix, move to an action, or wrap with startTransition.");var t=e0(e);t.next===null&&(t=e.alternate.memoizedState),cu(e,t.next.queue,{},$i(e))}function Xh(){var e=kh(!1);return e=Fv.bind(null,ge,e.queue,!0,!1),di().memoizedState=e,[!1,e]}function i0(){var e=ks(_n)[0],t=We().memoizedState;return[typeof e=="boolean"?e:ru(e),t]}function n0(){var e=uu(_n)[0],t=We().memoizedState;return[typeof e=="boolean"?e:ru(e),t]}function kl(){return ft(vc)}function Qh(){var e=di(),t=nt.identifierPrefix;if(Oe){var i=Ba,n=Ma;i=(n&~(1<<32-fi(n)-1)).toString(32)+i,t="_"+t+"R_"+i,i=kf++,0<i&&(t+="H"+i.toString(32)),t+="_"}else i=ID++,t="_"+t+"r_"+i.toString(32)+"_";return e.memoizedState=t}function Zh(){return di().memoizedState=bw.bind(null,ge)}function bw(e,t){for(var i=e.return;i!==null;){switch(i.tag){case 24:case 3:var n=$i(i),a=Ao(n),o=Do(i,a,n);o!==null&&(Qn(n,"refresh()",e),yt(o,i,n),ou(o,i,n)),e=ph(),t!=null&&o!==null&&console.error("The seed argument is not enabled outside experimental channels."),a.payload={cache:e};return}i=i.return}}function gw(e,t,i){var n=arguments;typeof n[3]=="function"&&console.error("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."),n=$i(e);var a={lane:n,revertLane:0,gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null};Cd(e)?o0(t,a):(a=th(e,t,a,n),a!==null&&(Qn(n,"dispatch()",e),yt(a,e,n),l0(a,t,n)))}function a0(e,t,i){var n=arguments;typeof n[3]=="function"&&console.error("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."),n=$i(e),cu(e,t,i,n)&&Qn(n,"setState()",e)}function cu(e,t,i,n){var a={lane:n,revertLane:0,gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null};if(Cd(e))o0(t,a);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null)){var s=M.H;M.H=Tn;try{var d=t.lastRenderedState,m=o(d,i);if(a.hasEagerState=!0,a.eagerState=m,mi(m,d))return nd(e,t,a,0),nt===null&&id(),!1}catch{}finally{M.H=s}}if(i=th(e,t,a,n),i!==null)return yt(i,e,n),l0(i,t,n),!0}return!1}function Ph(e,t,i,n){if(M.T===null&&Yl===0&&console.error("An optimistic state update occurred outside a transition or action. To fix, move the update to an action, or wrap with startTransition."),n={lane:2,revertLane:_m(),gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Cd(e)){if(t)throw Error("Cannot update optimistic state while rendering.");console.error("Cannot call startTransition while rendering.")}else t=th(e,i,n,2),t!==null&&(Qn(2,"setOptimistic()",e),yt(t,e,2))}function Cd(e){var t=e.alternate;return e===ge||t!==null&&t===ge}function o0(e,t){mr=Cf=!0;var i=e.pending;i===null?t.next=t:(t.next=i.next,i.next=t),e.pending=t}function l0(e,t,i){if((i&4194048)!==0){var n=t.lanes;n&=e.pendingLanes,i|=n,t.lanes=i,Qr(e,i)}}function Jh(e){if(e!==null&&typeof e!="function"){var t=String(e);nS.has(t)||(nS.add(t),console.error("Expected the last optional `callback` argument to be a function. Instead received: %s.",e))}}function Ih(e,t,i,n){var a=e.memoizedState,o=i(n,a);if(e.mode&ai){ne(!0);try{o=i(n,a)}finally{ne(!1)}}o===void 0&&(t=et(t)||"Component",FN.has(t)||(FN.add(t),console.error("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.",t))),a=o==null?a:Ce({},a,o),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}function s0(e,t,i,n,a,o,s){var d=e.stateNode;if(typeof d.shouldComponentUpdate=="function"){if(i=d.shouldComponentUpdate(n,o,s),e.mode&ai){ne(!0);try{i=d.shouldComponentUpdate(n,o,s)}finally{ne(!1)}}return i===void 0&&console.error("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.",et(t)||"Component"),i}return t.prototype&&t.prototype.isPureReactComponent?!Fr(i,n)||!Fr(a,o):!0}function r0(e,t,i,n){var a=t.state;typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(i,n),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(i,n),t.state!==a&&(e=le(e)||"Component",PN.has(e)||(PN.add(e),console.error("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",e)),Xb.enqueueReplaceState(t,t.state,null))}function Ol(e,t){var i=t;if("ref"in t){i={};for(var n in t)n!=="ref"&&(i[n]=t[n])}if(e=e.defaultProps){i===t&&(i=Ce({},i));for(var a in e)i[a]===void 0&&(i[a]=e[a])}return i}function u0(e){Sb(e),console.warn(`%s

%s
`,br?"An error occurred in the <"+br+"> component.":"An error occurred in one of your React components.",`Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://react.dev/link/error-boundaries to learn more about error boundaries.`)}function c0(e){var t=br?"The above error occurred in the <"+br+"> component.":"The above error occurred in one of your React components.",i="React will try to recreate this component tree from scratch using the error boundary you provided, "+((Qb||"Anonymous")+".");if(typeof e=="object"&&e!==null&&typeof e.environmentName=="string"){var n=e.environmentName;e=[`%o

%s

%s
`,e,t,i].slice(0),typeof e[0]=="string"?e.splice(0,1,BS+" "+e[0],LS,np+n+np,HS):e.splice(0,0,BS,LS,np+n+np,HS),e.unshift(console),n=gU.apply(console.error,e),n()}else console.error(`%o

%s

%s
`,e,t,i)}function d0(e){Sb(e)}function kd(e,t){try{br=t.source?le(t.source):null,Qb=null;var i=t.value;if(M.actQueue!==null)M.thrownErrors.push(i);else{var n=e.onUncaughtError;n(i,{componentStack:t.stack})}}catch(a){setTimeout(function(){throw a})}}function f0(e,t,i){try{br=i.source?le(i.source):null,Qb=le(t);var n=e.onCaughtError;n(i.value,{componentStack:i.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(a){setTimeout(function(){throw a})}}function Kh(e,t,i){return i=Ao(i),i.tag=Bb,i.payload={element:null},i.callback=function(){F(t.source,kd,e,t)},i}function Wh(e){return e=Ao(e),e.tag=Bb,e}function Fh(e,t,i,n){var a=i.type.getDerivedStateFromError;if(typeof a=="function"){var o=n.value;e.payload=function(){return a(o)},e.callback=function(){ov(i),F(n.source,f0,t,i,n)}}var s=i.stateNode;s!==null&&typeof s.componentDidCatch=="function"&&(e.callback=function(){ov(i),F(n.source,f0,t,i,n),typeof a!="function"&&(Wo===null?Wo=new Set([this]):Wo.add(this)),QD(this,n),typeof a=="function"||(i.lanes&2)===0&&console.error("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.",le(i)||"Unknown")})}function yw(e,t,i,n,a){if(i.flags|=32768,ua&&yu(e,a),n!==null&&typeof n=="object"&&typeof n.then=="function"){if(t=i.alternate,t!==null&&Rs(t,i,a,!0),Oe&&(fa=!0),i=qi.current,i!==null){switch(i.tag){case 31:case 13:return dn===null?Hd():i.alternate===null&&mt===Pa&&(mt=jf),i.flags&=-257,i.flags|=65536,i.lanes=a,n===Uf?i.flags|=16384:(t=i.updateQueue,t===null?i.updateQueue=new Set([n]):t.add(n),xm(e,n,a)),!1;case 22:return i.flags|=65536,n===Uf?i.flags|=16384:(t=i.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([n])},i.updateQueue=t):(i=t.retryQueue,i===null?t.retryQueue=new Set([n]):i.add(n)),xm(e,n,a)),!1}throw Error("Unexpected Suspense handler tag ("+i.tag+"). This is a bug in React.")}return xm(e,n,a),Hd(),!1}if(Oe)return fa=!0,t=qi.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=a,n!==Ub&&eu(Oi(Error("There was an error while hydrating but React was able to recover by instead client rendering from the nearest Suspense boundary.",{cause:n}),i))):(n!==Ub&&eu(Oi(Error("There was an error while hydrating but React was able to recover by instead client rendering the entire root.",{cause:n}),i)),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,n=Oi(n,i),a=Kh(e.stateNode,n,a),yd(e,a),mt!==Po&&(mt=Jl)),!1;var o=Oi(Error("There was an error during concurrent rendering but React was able to recover by instead synchronously rendering the entire root.",{cause:n}),i);if(cc===null?cc=[o]:cc.push(o),mt!==Po&&(mt=Jl),t===null)return!0;n=Oi(n,i),i=t;do{switch(i.tag){case 3:return i.flags|=65536,e=a&-a,i.lanes|=e,e=Kh(i.stateNode,n,e),yd(i,e),!1;case 1:if(t=i.type,o=i.stateNode,(i.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||o!==null&&typeof o.componentDidCatch=="function"&&(Wo===null||!Wo.has(o))))return i.flags|=65536,a&=-a,i.lanes|=a,a=Wh(a),Fh(a,e,i,n),yd(i,a),!1}i=i.return}while(i!==null);return!1}function It(e,t,i,n){t.child=e===null?$N(t,null,i,n):Zl(t,e.child,i,n)}function p0(e,t,i,n,a){i=i.render;var o=t.ref;if("ref"in n){var s={};for(var d in n)d!=="ref"&&(s[d]=n[d])}else s=n;return Ul(t),n=_h(e,t,i,s,o,a),d=Ah(),e!==null&&!Ct?(Dh(e,t,a),Ca(e,t,a)):(Oe&&d&&sh(t),t.flags|=1,It(e,t,n,a),t.child)}function h0(e,t,i,n,a){if(e===null){var o=i.type;return typeof o=="function"&&!nh(o)&&o.defaultProps===void 0&&i.compare===null?(i=_l(o),t.tag=15,t.type=i,tm(t,o),m0(e,t,i,n,a)):(e=ah(i.type,null,n,t,t.mode,a),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,!sm(e,a)){var s=o.memoizedProps;if(i=i.compare,i=i!==null?i:Fr,i(s,n)&&e.ref===t.ref)return Ca(e,t,a)}return t.flags|=1,e=Da(o,n),e.ref=t.ref,e.return=t,t.child=e}function m0(e,t,i,n,a){if(e!==null){var o=e.memoizedProps;if(Fr(o,n)&&e.ref===t.ref&&t.type===e.type)if(Ct=!1,t.pendingProps=n=o,sm(e,a))(e.flags&131072)!==0&&(Ct=!0);else return t.lanes=e.lanes,Ca(e,t,a)}return em(e,t,i,n,a)}function b0(e,t,i,n){var a=n.children,o=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:Bu,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.mode==="hidden"){if((t.flags&128)!==0){if(o=o!==null?o.baseLanes|i:i,e!==null){for(n=t.child=e.child,a=0;n!==null;)a=a|n.lanes|n.childLanes,n=n.sibling;n=a&~o}else n=0,t.child=null;return g0(e,t,o,i,n)}if((i&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&fd(t,o!==null?o.cachePool:null),o!==null?kv(t,o):xh(t),Ov(t);else return n=t.lanes=536870912,g0(e,t,o!==null?o.baseLanes|i:i,i,n)}else o!==null?(fd(t,o.cachePool),kv(t,o),To(t),t.memoizedState=null):(e!==null&&fd(t,null),xh(t),To(t));return It(e,t,a,i),t.child}function du(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:Bu,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function g0(e,t,i,n,a){var o=bh();return o=o===null?null:{parent:Ut._currentValue,pool:o},t.memoizedState={baseLanes:i,cachePool:o},e!==null&&fd(t,null),xh(t),Ov(t),e!==null&&Rs(e,t,n,!0),t.childLanes=a,null}function Od(e,t){var i=t.hidden;return i!==void 0&&console.error(`<Activity> doesn't accept a hidden prop. Use mode="hidden" instead.
- <Activity %s>
+ <Activity %s>`,i===!0?"hidden":i===!1?"hidden={false}":"hidden={...}",i?'mode="hidden"':'mode="visible"'),t=jd({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function y0(e,t,i){return Zl(t,e.child,null,i),e=Od(t,t.pendingProps),e.flags|=2,Vi(t),t.memoizedState=null,e}function vw(e,t,i){var n=t.pendingProps,a=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(Oe){if(n.mode==="hidden")return e=Od(t,n),t.lanes=536870912,du(null,e);if(Sh(t),(e=ut)?(i=Y1(e,un),i=i!==null&&i.data===ts?i:null,i!==null&&(n={dehydrated:i,treeContext:cv(),retryLane:536870912,hydrationErrors:null},t.memoizedState=n,n=rv(i),n.return=t,t.child=n,Ft=t,ut=null)):i=null,i===null)throw ld(t,e),Eo(t);return t.lanes=536870912,null}return Od(t,n)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(Sh(t),a)if(t.flags&256)t.flags&=-257,t=y0(e,t,i);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error("Client rendering an Activity suspended it again. This is a bug in React.");else if(fv(),(i&536870912)!==0&&Ld(t),Ct||Rs(e,t,i,!1),a=(i&e.childLanes)!==0,Ct||a){if(n=nt,n!==null&&(s=vl(n,i),s!==0&&s!==o.retryLane))throw o.retryLane=s,ii(e,s),yt(n,e,s),Zb;Hd(),t=y0(e,t,i)}else e=o.treeContext,ut=Mi(s.nextSibling),Ft=t,Oe=!0,qo=null,fa=!1,Hi=null,un=!1,e!==null&&dv(t,e),t=Od(t,n),t.flags|=4096;return t}return o=e.child,n={mode:n.mode,children:n.children},(i&536870912)!==0&&(i&e.lanes)!==0&&Ld(t),e=Da(o,n),e.ref=t.ref,t.child=e,e.return=t,e}function zd(e,t){var i=t.ref;if(i===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof i!="function"&&typeof i!="object")throw Error("Expected ref to be a function, an object returned by React.createRef(), or undefined/null.");(e===null||e.ref!==i)&&(t.flags|=4194816)}}function em(e,t,i,n,a){if(i.prototype&&typeof i.prototype.render=="function"){var o=et(i)||"Unknown";aS[o]||(console.error("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.",o,o),aS[o]=!0)}return t.mode&ai&&Un.recordLegacyContextWarning(t,null),e===null&&(tm(t,t.type),i.contextTypes&&(o=et(i)||"Unknown",lS[o]||(lS[o]=!0,console.error("%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with React.useContext() instead. (https://react.dev/link/legacy-context)",o)))),Ul(t),i=_h(e,t,i,n,void 0,a),n=Ah(),e!==null&&!Ct?(Dh(e,t,a),Ca(e,t,a)):(Oe&&n&&sh(t),t.flags|=1,It(e,t,i,a),t.child)}function v0(e,t,i,n,a,o){return Ul(t),Qa=-1,nc=e!==null&&e.type!==t.type,t.updateQueue=null,i=wh(t,n,i,a),zv(e,t),n=Ah(),e!==null&&!Ct?(Dh(e,t,o),Ca(e,t,o)):(Oe&&n&&sh(t),t.flags|=1,It(e,t,i,o),t.child)}function x0(e,t,i,n,a){switch(b(t)){case!1:var o=t.stateNode,s=new t.type(t.memoizedProps,o.context).state;o.updater.enqueueSetState(o,s,null);break;case!0:t.flags|=128,t.flags|=65536,o=Error("Simulated error coming from DevTools");var d=a&-a;if(t.lanes|=d,s=nt,s===null)throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");d=Wh(d),Fh(d,s,t,Oi(o,t)),yd(t,d)}if(Ul(t),t.stateNode===null){if(s=Ho,o=i.contextType,"contextType"in i&&o!==null&&(o===void 0||o.$$typeof!==la)&&!iS.has(i)&&(iS.add(i),d=o===void 0?" However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file.":typeof o!="object"?" However, it is set to a "+typeof o+".":o.$$typeof===Pm?" Did you accidentally pass the Context.Consumer instead?":" However, it is set to an object with keys {"+Object.keys(o).join(", ")+"}.",console.error("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s",et(i)||"Component",d)),typeof o=="object"&&o!==null&&(s=ft(o)),o=new i(n,s),t.mode&ai){ne(!0);try{o=new i(n,s)}finally{ne(!1)}}if(s=t.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,o.updater=Xb,t.stateNode=o,o._reactInternals=t,o._reactInternalInstance=ZN,typeof i.getDerivedStateFromProps=="function"&&s===null&&(s=et(i)||"Component",JN.has(s)||(JN.add(s),console.error("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.",s,o.state===null?"null":"undefined",s))),typeof i.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"){var m=d=s=null;if(typeof o.componentWillMount=="function"&&o.componentWillMount.__suppressDeprecationWarning!==!0?s="componentWillMount":typeof o.UNSAFE_componentWillMount=="function"&&(s="UNSAFE_componentWillMount"),typeof o.componentWillReceiveProps=="function"&&o.componentWillReceiveProps.__suppressDeprecationWarning!==!0?d="componentWillReceiveProps":typeof o.UNSAFE_componentWillReceiveProps=="function"&&(d="UNSAFE_componentWillReceiveProps"),typeof o.componentWillUpdate=="function"&&o.componentWillUpdate.__suppressDeprecationWarning!==!0?m="componentWillUpdate":typeof o.UNSAFE_componentWillUpdate=="function"&&(m="UNSAFE_componentWillUpdate"),s!==null||d!==null||m!==null){o=et(i)||"Component";var g=typeof i.getDerivedStateFromProps=="function"?"getDerivedStateFromProps()":"getSnapshotBeforeUpdate()";KN.has(o)||(KN.add(o),console.error(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://react.dev/link/unsafe-component-lifecycles`,o,g,s!==null?`
  `+s:"",d!==null?`
  `+d:"",m!==null?`
  `+m:""))}}o=t.stateNode,s=et(i)||"Component",o.render||(i.prototype&&typeof i.prototype.render=="function"?console.error("No `render` method found on the %s instance: did you accidentally return an object from the constructor?",s):console.error("No `render` method found on the %s instance: you may have forgotten to define `render`.",s)),!o.getInitialState||o.getInitialState.isReactClassApproved||o.state||console.error("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?",s),o.getDefaultProps&&!o.getDefaultProps.isReactClassApproved&&console.error("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.",s),o.contextType&&console.error("contextType was defined as an instance property on %s. Use a static property to define contextType instead.",s),i.childContextTypes&&!tS.has(i)&&(tS.add(i),console.error("%s uses the legacy childContextTypes API which was removed in React 19. Use React.createContext() instead. (https://react.dev/link/legacy-context)",s)),i.contextTypes&&!eS.has(i)&&(eS.add(i),console.error("%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with static contextType instead. (https://react.dev/link/legacy-context)",s)),typeof o.componentShouldUpdate=="function"&&console.error("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.",s),i.prototype&&i.prototype.isPureReactComponent&&typeof o.shouldComponentUpdate<"u"&&console.error("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.",et(i)||"A pure component"),typeof o.componentDidUnmount=="function"&&console.error("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?",s),typeof o.componentDidReceiveProps=="function"&&console.error("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().",s),typeof o.componentWillRecieveProps=="function"&&console.error("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?",s),typeof o.UNSAFE_componentWillRecieveProps=="function"&&console.error("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?",s),d=o.props!==n,o.props!==void 0&&d&&console.error("When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.",s),o.defaultProps&&console.error("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.",s,s),typeof o.getSnapshotBeforeUpdate!="function"||typeof o.componentDidUpdate=="function"||IN.has(i)||(IN.add(i),console.error("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.",et(i))),typeof o.getDerivedStateFromProps=="function"&&console.error("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.",s),typeof o.getDerivedStateFromError=="function"&&console.error("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.",s),typeof i.getSnapshotBeforeUpdate=="function"&&console.error("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.",s),(d=o.state)&&(typeof d!="object"||$t(d))&&console.error("%s.state: must be set to an object or null",s),typeof o.getChildContext=="function"&&typeof i.childContextTypes!="object"&&console.error("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().",s),o=t.stateNode,o.props=n,o.state=t.memoizedState,o.refs={},yh(t),s=i.contextType,o.context=typeof s=="object"&&s!==null?ft(s):Ho,o.state===n&&(s=et(i)||"Component",WN.has(s)||(WN.add(s),console.error("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.",s))),t.mode&ai&&Un.recordLegacyContextWarning(t,o),Un.recordUnsafeLifecycleWarnings(t,o),o.state=t.memoizedState,s=i.getDerivedStateFromProps,typeof s=="function"&&(Ih(t,i,s,n),o.state=t.memoizedState),typeof i.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(s=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),s!==o.state&&(console.error("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",le(t)||"Component"),Xb.enqueueReplaceState(o,o.state,null)),su(t,n,o,a),lu(),o.state=t.memoizedState),typeof o.componentDidMount=="function"&&(t.flags|=4194308),(t.mode&Dn)!==he&&(t.flags|=134217728),o=!0}else if(e===null){o=t.stateNode;var U=t.memoizedProps;d=Ol(i,U),o.props=d;var T=o.context;m=i.contextType,s=Ho,typeof m=="object"&&m!==null&&(s=ft(m)),g=i.getDerivedStateFromProps,m=typeof g=="function"||typeof o.getSnapshotBeforeUpdate=="function",U=t.pendingProps!==U,m||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(U||T!==s)&&r0(t,o,n,s),Zo=!1;var _=t.memoizedState;o.state=_,su(t,n,o,a),lu(),T=t.memoizedState,U||_!==T||Zo?(typeof g=="function"&&(Ih(t,i,g,n),T=t.memoizedState),(d=Zo||s0(t,i,d,n,_,T,s))?(m||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308),(t.mode&Dn)!==he&&(t.flags|=134217728)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),(t.mode&Dn)!==he&&(t.flags|=134217728),t.memoizedProps=n,t.memoizedState=T),o.props=n,o.state=T,o.context=s,o=d):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),(t.mode&Dn)!==he&&(t.flags|=134217728),o=!1)}else{o=t.stateNode,vh(e,t),s=t.memoizedProps,m=Ol(i,s),o.props=m,g=t.pendingProps,_=o.context,T=i.contextType,d=Ho,typeof T=="object"&&T!==null&&(d=ft(T)),U=i.getDerivedStateFromProps,(T=typeof U=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(s!==g||_!==d)&&r0(t,o,n,d),Zo=!1,_=t.memoizedState,o.state=_,su(t,n,o,a),lu();var j=t.memoizedState;s!==g||_!==j||Zo||e!==null&&e.dependencies!==null&&rd(e.dependencies)?(typeof U=="function"&&(Ih(t,i,U,n),j=t.memoizedState),(m=Zo||s0(t,i,m,n,_,j,d)||e!==null&&e.dependencies!==null&&rd(e.dependencies))?(T||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(n,j,d),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(n,j,d)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||s===e.memoizedProps&&_===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&_===e.memoizedState||(t.flags|=1024),t.memoizedProps=n,t.memoizedState=j),o.props=n,o.state=j,o.context=d,o=m):(typeof o.componentDidUpdate!="function"||s===e.memoizedProps&&_===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&_===e.memoizedState||(t.flags|=1024),o=!1)}if(d=o,zd(e,t),s=(t.flags&128)!==0,d||s){if(d=t.stateNode,xs(t),s&&typeof i.getDerivedStateFromError!="function")i=null,bi=-1;else if(i=EN(d),t.mode&ai){ne(!0);try{EN(d)}finally{ne(!1)}}t.flags|=1,e!==null&&s?(t.child=Zl(t,e.child,null,a),t.child=Zl(t,null,i,a)):It(e,t,i,a),t.memoizedState=d.state,e=t.child}else e=Ca(e,t,a);return a=t.stateNode,o&&a.props!==n&&(gr||console.error("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.",le(t)||"a component"),gr=!0),e}function N0(e,t,i,n){return Dl(),t.flags|=256,It(e,t,i,n),t.child}function tm(e,t){t&&t.childContextTypes&&console.error(`childContextTypes cannot be defined on a function component.
  %s.childContextTypes = ...`,t.displayName||t.name||"Component"),typeof t.getDerivedStateFromProps=="function"&&(e=et(t)||"Unknown",sS[e]||(console.error("%s: Function components do not support getDerivedStateFromProps.",e),sS[e]=!0)),typeof t.contextType=="object"&&t.contextType!==null&&(t=et(t)||"Unknown",oS[t]||(console.error("%s: Function components do not support contextType.",t),oS[t]=!0))}function im(e){return{baseLanes:e,cachePool:vv()}}function nm(e,t,i){return e=e!==null?e.childLanes&~i:0,t&&(e|=Di),e}function S0(e,t,i){var n,a=t.pendingProps;f(t)&&(t.flags|=128);var o=!1,s=(t.flags&128)!==0;if((n=s)||(n=e!==null&&e.memoizedState===null?!1:(Et.current&tc)!==0),n&&(o=!0,t.flags&=-129),n=(t.flags&32)!==0,t.flags&=-33,e===null){if(Oe){if(o?Uo(t):To(t),(e=ut)?(i=Y1(e,un),i=i!==null&&i.data!==ts?i:null,i!==null&&(n={dehydrated:i,treeContext:cv(),retryLane:536870912,hydrationErrors:null},t.memoizedState=n,n=rv(i),n.return=t,t.child=n,Ft=t,ut=null)):i=null,i===null)throw ld(t,e),Eo(t);return Vm(i)?t.lanes=32:t.lanes=536870912,null}var d=a.children;if(a=a.fallback,o){To(t);var m=t.mode;return d=jd({mode:"hidden",children:d},m),a=wl(a,m,i,null),d.return=t,a.return=t,d.sibling=a,t.child=d,a=t.child,a.memoizedState=im(i),a.childLanes=nm(e,n,i),t.memoizedState=Pb,du(null,a)}return Uo(t),am(t,d)}var g=e.memoizedState;if(g!==null){var U=g.dehydrated;if(U!==null){if(s)t.flags&256?(Uo(t),t.flags&=-257,t=om(e,t,i)):t.memoizedState!==null?(To(t),t.child=e.child,t.flags|=128,t=null):(To(t),d=a.fallback,m=t.mode,a=jd({mode:"visible",children:a.children},m),d=wl(d,m,i,null),d.flags|=2,a.return=t,d.return=t,a.sibling=d,t.child=a,Zl(t,e.child,null,i),a=t.child,a.memoizedState=im(i),a.childLanes=nm(e,n,i),t.memoizedState=Pb,t=du(null,a));else if(Uo(t),fv(),(i&536870912)!==0&&Ld(t),Vm(U)){if(n=U.nextSibling&&U.nextSibling.dataset,n){d=n.dgst;var T=n.msg;m=n.stck;var _=n.cstck}o=T,n=d,a=m,U=_,d=o,m=U,d=Error(d||"The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering."),d.stack=a||"",d.digest=n,n=m===void 0?null:m,a={value:d,source:null,stack:n},typeof n=="string"&&Db.set(d,a),eu(a),t=om(e,t,i)}else if(Ct||Rs(e,t,i,!1),n=(i&e.childLanes)!==0,Ct||n){if(n=nt,n!==null&&(a=vl(n,i),a!==0&&a!==g.retryLane))throw g.retryLane=a,ii(e,a),yt(n,e,a),Zb;jm(U)||Hd(),t=om(e,t,i)}else jm(U)?(t.flags|=192,t.child=e.child,t=null):(e=g.treeContext,ut=Mi(U.nextSibling),Ft=t,Oe=!0,qo=null,fa=!1,Hi=null,un=!1,e!==null&&dv(t,e),t=am(t,a.children),t.flags|=4096);return t}}return o?(To(t),d=a.fallback,m=t.mode,_=e.child,U=_.sibling,a=Da(_,{mode:"hidden",children:a.children}),a.subtreeFlags=_.subtreeFlags&65011712,U!==null?d=Da(U,d):(d=wl(d,m,i,null),d.flags|=2),d.return=t,a.return=t,a.sibling=d,t.child=a,du(null,a),a=t.child,d=e.child.memoizedState,d===null?d=im(i):(m=d.cachePool,m!==null?(_=Ut._currentValue,m=m.parent!==_?{parent:_,pool:_}:m):m=vv(),d={baseLanes:d.baseLanes|i,cachePool:m}),a.memoizedState=d,a.childLanes=nm(e,n,i),t.memoizedState=Pb,du(e.child,a)):(g!==null&&(i&62914560)===i&&(i&e.lanes)!==0&&Ld(t),Uo(t),i=e.child,e=i.sibling,i=Da(i,{mode:"visible",children:a.children}),i.return=t,i.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=i,t.memoizedState=null,i)}function am(e,t){return t=jd({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function jd(e,t){return e=x(22,e,null,t),e.lanes=0,e}function om(e,t,i){return Zl(t,e.child,null,i),e=am(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function E0(e,t,i){e.lanes|=t;var n=e.alternate;n!==null&&(n.lanes|=t),dh(e.return,t,i)}function lm(e,t,i,n,a,o){var s=e.memoizedState;s===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:n,tail:i,tailMode:a,treeForkCount:o}:(s.isBackwards=t,s.rendering=null,s.renderingStartTime=0,s.last=n,s.tail=i,s.tailMode=a,s.treeForkCount=o)}function _0(e,t,i){var n=t.pendingProps,a=n.revealOrder,o=n.tail,s=n.children,d=Et.current;if((n=(d&tc)!==0)?(d=d&pr|tc,t.flags|=128):d&=pr,ke(Et,d,t),d=a??"null",a!=="forwards"&&a!=="unstable_legacy-backwards"&&a!=="together"&&a!=="independent"&&!rS[d])if(rS[d]=!0,a==null)console.error('The default for the <SuspenseList revealOrder="..."> prop is changing. To be future compatible you must explictly specify either "independent" (the current default), "together", "forwards" or "legacy_unstable-backwards".');else if(a==="backwards")console.error('The rendering order of <SuspenseList revealOrder="backwards"> is changing. To be future compatible you must specify revealOrder="legacy_unstable-backwards" instead.');else if(typeof a=="string")switch(a.toLowerCase()){case"together":case"forwards":case"backwards":case"independent":console.error('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.',a,a.toLowerCase());break;case"forward":case"backward":console.error('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.',a,a.toLowerCase());break;default:console.error('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "independent", "together", "forwards" or "backwards"?',a)}else console.error('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "independent", "together", "forwards" or "backwards"?',a);d=o??"null",zf[d]||(o==null?(a==="forwards"||a==="backwards"||a==="unstable_legacy-backwards")&&(zf[d]=!0,console.error('The default for the <SuspenseList tail="..."> prop is changing. To be future compatible you must explictly specify either "visible" (the current default), "collapsed" or "hidden".')):o!=="visible"&&o!=="collapsed"&&o!=="hidden"?(zf[d]=!0,console.error('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "visible", "collapsed" or "hidden"?',o)):a!=="forwards"&&a!=="backwards"&&a!=="unstable_legacy-backwards"&&(zf[d]=!0,console.error('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?',o)));e:if((a==="forwards"||a==="backwards"||a==="unstable_legacy-backwards")&&s!==void 0&&s!==null&&s!==!1)if($t(s)){for(d=0;d<s.length;d++)if(!Tv(s[d],d))break e}else if(d=jt(s),typeof d=="function"){if(d=d.call(s))for(var m=d.next(),g=0;!m.done;m=d.next()){if(!Tv(m.value,g))break e;g++}}else console.error('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?',a);if(It(e,t,s,i),Oe?(So(),s=Lu):s=0,!n&&e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&E0(e,i,t);else if(e.tag===19)E0(e,i,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(a){case"forwards":for(i=t.child,a=null;i!==null;)e=i.alternate,e!==null&&vd(e)===null&&(a=i),i=i.sibling;i=a,i===null?(a=t.child,t.child=null):(a=i.sibling,i.sibling=null),lm(t,!1,a,i,o,s);break;case"backwards":case"unstable_legacy-backwards":for(i=null,a=t.child,t.child=null;a!==null;){if(e=a.alternate,e!==null&&vd(e)===null){t.child=a;break}e=a.sibling,a.sibling=i,i=a,a=e}lm(t,!0,i,null,o,s);break;case"together":lm(t,!1,null,null,void 0,s);break;default:t.memoizedState=null}return t.child}function Ca(e,t,i){if(e!==null&&(t.dependencies=e.dependencies),bi=-1,Io|=t.lanes,(i&t.childLanes)===0)if(e!==null){if(Rs(e,t,i,!1),(i&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error("Resuming work not yet implemented.");if(t.child!==null){for(e=t.child,i=Da(e,e.pendingProps),t.child=i,i.return=t;e.sibling!==null;)e=e.sibling,i=i.sibling=Da(e,e.pendingProps),i.return=t;i.sibling=null}return t.child}function sm(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&rd(e)))}function xw(e,t,i){switch(t.tag){case 3:ui(t,t.stateNode.containerInfo),_o(t,Ut,e.memoizedState.cache),Dl();break;case 27:case 5:be(t);break;case 4:ui(t,t.stateNode.containerInfo);break;case 10:_o(t,t.type,t.memoizedProps.value);break;case 12:(i&t.childLanes)!==0&&(t.flags|=4),t.flags|=2048;var n=t.stateNode;n.effectDuration=-0,n.passiveEffectDuration=-0;break;case 31:if(t.memoizedState!==null)return t.flags|=128,Sh(t),null;break;case 13:if(n=t.memoizedState,n!==null)return n.dehydrated!==null?(Uo(t),t.flags|=128,null):(i&t.child.childLanes)!==0?S0(e,t,i):(Uo(t),e=Ca(e,t,i),e!==null?e.sibling:null);Uo(t);break;case 19:var a=(e.flags&128)!==0;if(n=(i&t.childLanes)!==0,n||(Rs(e,t,i,!1),n=(i&t.childLanes)!==0),a){if(n)return _0(e,t,i);t.flags|=128}if(a=t.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),ke(Et,Et.current,t),n)break;return null;case 22:return t.lanes=0,b0(e,t,i,t.pendingProps);case 24:_o(t,Ut,e.memoizedState.cache)}return Ca(e,t,i)}function rm(e,t,i){if(t._debugNeedsRemount&&e!==null){i=ah(t.type,t.key,t.pendingProps,t._debugOwner||null,t.mode,t.lanes),i._debugStack=t._debugStack,i._debugTask=t._debugTask;var n=t.return;if(n===null)throw Error("Cannot swap the root fiber.");if(e.alternate=null,t.alternate=null,i.index=t.index,i.sibling=t.sibling,i.return=t.return,i.ref=t.ref,i._debugInfo=t._debugInfo,t===n.child)n.child=i;else{var a=n.child;if(a===null)throw Error("Expected parent to have a child.");for(;a.sibling!==t;)if(a=a.sibling,a===null)throw Error("Expected to find the previous sibling.");a.sibling=i}return t=n.deletions,t===null?(n.deletions=[e],n.flags|=16):t.push(e),i.flags|=2,i}if(e!==null)if(e.memoizedProps!==t.pendingProps||t.type!==e.type)Ct=!0;else{if(!sm(e,i)&&(t.flags&128)===0)return Ct=!1,xw(e,t,i);Ct=(e.flags&131072)!==0}else Ct=!1,(n=Oe)&&(So(),n=(t.flags&1048576)!==0),n&&(n=t.index,So(),uv(t,Lu,n));switch(t.lanes=0,t.tag){case 16:e:if(n=t.pendingProps,e=wo(t.elementType),t.type=e,typeof e=="function")nh(e)?(n=Ol(e,n),t.tag=1,t.type=e=_l(e),t=x0(null,t,e,n,i)):(t.tag=0,tm(t,e),t.type=e=_l(e),t=em(null,t,e,n,i));else{if(e!=null){if(a=e.$$typeof,a===Du){t.tag=11,t.type=e=ih(e),t=p0(null,t,e,n,i);break e}else if(a===tf){t.tag=14,t=h0(null,t,e,n,i);break e}}throw t="",e!==null&&typeof e=="object"&&e.$$typeof===Bi&&(t=" Did you wrap a component in React.lazy() more than once?"),i=et(e)||e,Error("Element type is invalid. Received a promise that resolves to: "+i+". Lazy element type must resolve to a class or function."+t)}return t;case 0:return em(e,t,t.type,t.pendingProps,i);case 1:return n=t.type,a=Ol(n,t.pendingProps),x0(e,t,n,a,i);case 3:e:{if(ui(t,t.stateNode.containerInfo),e===null)throw Error("Should have a current fiber. This is a bug in React.");n=t.pendingProps;var o=t.memoizedState;a=o.element,vh(e,t),su(t,n,null,i);var s=t.memoizedState;if(n=s.cache,_o(t,Ut,n),n!==o.cache&&fh(t,[Ut],i,!0),lu(),n=s.element,o.isDehydrated)if(o={element:n,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=N0(e,t,n,i);break e}else if(n!==a){a=Oi(Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."),t),eu(a),t=N0(e,t,n,i);break e}else for(e=t.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,ut=Mi(e.firstChild),Ft=t,Oe=!0,qo=null,fa=!1,Hi=null,un=!0,i=$N(t,null,n,i),t.child=i;i;)i.flags=i.flags&-3|4096,i=i.sibling;else{if(Dl(),n===a){t=Ca(e,t,i);break e}It(e,t,n,i)}t=t.child}return t;case 26:return zd(e,t),e===null?(i=J1(t.type,null,t.pendingProps,null))?t.memoizedState=i:Oe||(i=t.type,e=t.pendingProps,n=Pt(jo.current),n=Xd(n).createElement(i),n[Wt]=t,n[pi]=e,Kt(n,i,e),se(n),t.stateNode=n):t.memoizedState=J1(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return be(t),e===null&&Oe&&(n=Pt(jo.current),a=de(),n=t.stateNode=Z1(t.type,t.pendingProps,n,a,!1),fa||(a=j1(n,t.type,t.pendingProps,a),a!==null&&(Al(t,0).serverProps=a)),Ft=t,un=!0,a=ut,Oo(t.type)?(gg=a,ut=Mi(n.firstChild)):ut=a),It(e,t,t.pendingProps.children,i),zd(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&Oe&&(o=de(),n=Zp(t.type,o.ancestorInfo),a=ut,(s=!a)||(s=rA(a,t.type,t.pendingProps,un),s!==null?(t.stateNode=s,fa||(o=j1(s,t.type,t.pendingProps,o),o!==null&&(Al(t,0).serverProps=o)),Ft=t,ut=Mi(s.firstChild),un=!1,o=!0):o=!1,s=!o),s&&(n&&ld(t,a),Eo(t))),be(t),a=t.type,o=t.pendingProps,s=e!==null?e.memoizedProps:null,n=o.children,Om(a,o)?n=null:s!==null&&Om(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=_h(e,t,fw,null,null,i),vc._currentValue=a),zd(e,t),It(e,t,n,i),t.child;case 6:return e===null&&Oe&&(i=t.pendingProps,e=de(),n=e.ancestorInfo.current,i=n!=null?Ic(i,n.tag,e.ancestorInfo.implicitRootScope):!0,e=ut,(n=!e)||(n=uA(e,t.pendingProps,un),n!==null?(t.stateNode=n,Ft=t,ut=null,n=!0):n=!1,n=!n),n&&(i&&ld(t,e),Eo(t))),null;case 13:return S0(e,t,i);case 4:return ui(t,t.stateNode.containerInfo),n=t.pendingProps,e===null?t.child=Zl(t,null,n,i):It(e,t,n,i),t.child;case 11:return p0(e,t,t.type,t.pendingProps,i);case 7:return It(e,t,t.pendingProps,i),t.child;case 8:return It(e,t,t.pendingProps.children,i),t.child;case 12:return t.flags|=4,t.flags|=2048,n=t.stateNode,n.effectDuration=-0,n.passiveEffectDuration=-0,It(e,t,t.pendingProps.children,i),t.child;case 10:return n=t.type,a=t.pendingProps,o=a.value,"value"in a||uS||(uS=!0,console.error("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?")),_o(t,n,o),It(e,t,a.children,i),t.child;case 9:return a=t.type._context,n=t.pendingProps.children,typeof n!="function"&&console.error("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."),Ul(t),a=ft(a),n=jb(n,a,void 0),t.flags|=1,It(e,t,n,i),t.child;case 14:return h0(e,t,t.type,t.pendingProps,i);case 15:return m0(e,t,t.type,t.pendingProps,i);case 19:return _0(e,t,i);case 31:return vw(e,t,i);case 22:return b0(e,t,i,t.pendingProps);case 24:return Ul(t),n=ft(Ut),e===null?(a=bh(),a===null&&(a=nt,o=ph(),a.pooledCache=o,Tl(o),o!==null&&(a.pooledCacheLanes|=i),a=o),t.memoizedState={parent:n,cache:a},yh(t),_o(t,Ut,a)):((e.lanes&i)!==0&&(vh(e,t),su(t,null,null,i),lu()),a=e.memoizedState,o=t.memoizedState,a.parent!==n?(a={parent:n,cache:n},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),_o(t,Ut,n)):(n=o.cache,_o(t,Ut,n),n!==a.cache&&fh(t,[Ut],i,!0))),It(e,t,t.pendingProps.children,i),t.child;case 29:throw t.pendingProps}throw Error("Unknown unit of work tag ("+t.tag+"). This error is likely caused by a bug in React. Please file an issue.")}function ka(e){e.flags|=4}function um(e,t,i,n,a){if((t=(e.mode&HD)!==he)&&(t=!1),t){if(e.flags|=16777216,(a&335544128)===a)if(e.stateNode.complete)e.flags|=8192;else if(n1())e.flags|=8192;else throw Ql=Uf,$b}else e.flags&=-16777217}function w0(e,t){if(t.type!=="stylesheet"||(t.state.loading&hn)!==as)e.flags&=-16777217;else if(e.flags|=16777216,!ex(t))if(n1())e.flags|=8192;else throw Ql=Uf,$b}function Vd(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?Yr():536870912,e.lanes|=t,Wl|=t)}function fu(e,t){if(!Oe)switch(e.tailMode){case"hidden":t=e.tail;for(var i=null;t!==null;)t.alternate!==null&&(i=t),t=t.sibling;i===null?e.tail=null:i.sibling=null;break;case"collapsed":i=e.tail;for(var n=null;i!==null;)i.alternate!==null&&(n=i),i=i.sibling;n===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:n.sibling=null}}function lt(e){var t=e.alternate!==null&&e.alternate.child===e.child,i=0,n=0;if(t)if((e.mode&_e)!==he){for(var a=e.selfBaseDuration,o=e.child;o!==null;)i|=o.lanes|o.childLanes,n|=o.subtreeFlags&65011712,n|=o.flags&65011712,a+=o.treeBaseDuration,o=o.sibling;e.treeBaseDuration=a}else for(a=e.child;a!==null;)i|=a.lanes|a.childLanes,n|=a.subtreeFlags&65011712,n|=a.flags&65011712,a.return=e,a=a.sibling;else if((e.mode&_e)!==he){a=e.actualDuration,o=e.selfBaseDuration;for(var s=e.child;s!==null;)i|=s.lanes|s.childLanes,n|=s.subtreeFlags,n|=s.flags,a+=s.actualDuration,o+=s.treeBaseDuration,s=s.sibling;e.actualDuration=a,e.treeBaseDuration=o}else for(a=e.child;a!==null;)i|=a.lanes|a.childLanes,n|=a.subtreeFlags,n|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=n,e.childLanes=i,t}function Nw(e,t,i){var n=t.pendingProps;switch(rh(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return lt(t),null;case 1:return lt(t),null;case 3:return i=t.stateNode,n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Ta(Ut,t),Z(t),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(e===null||e.child===null)&&(Ts(t)?(ch(),ka(t)):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,uh())),lt(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(ka(t),o!==null?(lt(t),w0(t,o)):(lt(t),um(t,a,null,n,i))):o?o!==e.memoizedState?(ka(t),lt(t),w0(t,o)):(lt(t),t.flags&=-16777217):(e=e.memoizedProps,e!==n&&ka(t),lt(t),um(t,a,e,n,i)),null;case 27:if(Ge(t),i=Pt(jo.current),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==n&&ka(t);else{if(!n){if(t.stateNode===null)throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");return lt(t),null}e=de(),Ts(t)?pv(t):(e=Z1(a,n,i,e,!0),t.stateNode=e,ka(t))}return lt(t),null;case 5:if(Ge(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==n&&ka(t);else{if(!n){if(t.stateNode===null)throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");return lt(t),null}var s=de();if(Ts(t))pv(t);else{switch(o=Pt(jo.current),Zp(a,s.ancestorInfo),s=s.context,o=Xd(o),s){case wr:o=o.createElementNS(Js,a);break;case ep:o=o.createElementNS(uf,a);break;default:switch(a){case"svg":o=o.createElementNS(Js,a);break;case"math":o=o.createElementNS(uf,a);break;case"script":o=o.createElement("div"),o.innerHTML="<script><\/script>",o=o.removeChild(o.firstChild);break;case"select":o=typeof n.is=="string"?o.createElement("select",{is:n.is}):o.createElement("select"),n.multiple?o.multiple=!0:n.size&&(o.size=n.size);break;default:o=typeof n.is=="string"?o.createElement(a,{is:n.is}):o.createElement(a),a.indexOf("-")===-1&&(a!==a.toLowerCase()&&console.error("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.",a),Object.prototype.toString.call(o)!=="[object HTMLUnknownElement]"||An.call(OS,a)||(OS[a]=!0,console.error("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.",a)))}}o[Wt]=t,o[pi]=n;e:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break e;for(;s.sibling===null;){if(s.return===null||s.return===t)break e;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;e:switch(Kt(o,a,n),a){case"button":case"input":case"select":case"textarea":n=!!n.autoFocus;break e;case"img":n=!0;break e;default:n=!1}n&&ka(t)}}return lt(t),um(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,i),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==n&&ka(t);else{if(typeof n!="string"&&t.stateNode===null)throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");if(e=Pt(jo.current),i=de(),Ts(t)){if(e=t.stateNode,i=t.memoizedProps,a=!fa,n=null,o=Ft,o!==null)switch(o.tag){case 3:a&&(a=X1(e,i,n),a!==null&&(Al(t,0).serverProps=a));break;case 27:case 5:n=o.memoizedProps,a&&(a=X1(e,i,n),a!==null&&(Al(t,0).serverProps=a))}e[Wt]=t,e=!!(e.nodeValue===i||n!==null&&n.suppressHydrationWarning===!0||R1(e.nodeValue,i)),e||Eo(t,!0)}else a=i.ancestorInfo.current,a!=null&&Ic(n,a.tag,i.ancestorInfo.implicitRootScope),e=Xd(e).createTextNode(n),e[Wt]=t,t.stateNode=e}return lt(t),null;case 31:if(i=t.memoizedState,e===null||e.memoizedState!==null){if(n=Ts(t),i!==null){if(e===null){if(!n)throw Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error("Expected to have a hydrated activity instance. This error is likely caused by a bug in React. Please file an issue.");e[Wt]=t,lt(t),(t.mode&_e)!==he&&i!==null&&(e=t.child,e!==null&&(t.treeBaseDuration-=e.treeBaseDuration))}else ch(),Dl(),(t.flags&128)===0&&(i=t.memoizedState=null),t.flags|=4,lt(t),(t.mode&_e)!==he&&i!==null&&(e=t.child,e!==null&&(t.treeBaseDuration-=e.treeBaseDuration));e=!1}else i=uh(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=i),e=!0;if(!e)return t.flags&256?(Vi(t),t):(Vi(t),null);if((t.flags&128)!==0)throw Error("Client rendering an Activity suspended it again. This is a bug in React.")}return lt(t),null;case 13:if(n=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=n,o=Ts(t),a!==null&&a.dehydrated!==null){if(e===null){if(!o)throw Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");o[Wt]=t,lt(t),(t.mode&_e)!==he&&a!==null&&(a=t.child,a!==null&&(t.treeBaseDuration-=a.treeBaseDuration))}else ch(),Dl(),(t.flags&128)===0&&(a=t.memoizedState=null),t.flags|=4,lt(t),(t.mode&_e)!==he&&a!==null&&(a=t.child,a!==null&&(t.treeBaseDuration-=a.treeBaseDuration));a=!1}else a=uh(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(Vi(t),t):(Vi(t),null)}return Vi(t),(t.flags&128)!==0?(t.lanes=i,(t.mode&_e)!==he&&nu(t),t):(i=n!==null,e=e!==null&&e.memoizedState!==null,i&&(n=t.child,a=null,n.alternate!==null&&n.alternate.memoizedState!==null&&n.alternate.memoizedState.cachePool!==null&&(a=n.alternate.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==a&&(n.flags|=2048)),i!==e&&i&&(t.child.flags|=8192),Vd(t,t.updateQueue),lt(t),(t.mode&_e)!==he&&i&&(e=t.child,e!==null&&(t.treeBaseDuration-=e.treeBaseDuration)),null);case 4:return Z(t),e===null&&Am(t.stateNode.containerInfo),lt(t),null;case 10:return Ta(t.type,t),lt(t),null;case 19:if(ve(Et,t),n=t.memoizedState,n===null)return lt(t),null;if(a=(t.flags&128)!==0,o=n.rendering,o===null)if(a)fu(n,!1);else{if(mt!==Pa||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(o=vd(e),o!==null){for(t.flags|=128,fu(n,!1),e=o.updateQueue,t.updateQueue=e,Vd(t,e),t.subtreeFlags=0,e=i,i=t.child;i!==null;)sv(i,e),i=i.sibling;return ke(Et,Et.current&pr|tc,t),Oe&&Ua(t,n.treeForkCount),t.child}e=e.sibling}n.tail!==null&&qt()>Hf&&(t.flags|=128,a=!0,fu(n,!1),t.lanes=4194304)}else{if(!a)if(e=vd(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,Vd(t,e),fu(n,!0),n.tail===null&&n.tailMode==="hidden"&&!o.alternate&&!Oe)return lt(t),null}else 2*qt()-n.renderingStartTime>Hf&&i!==536870912&&(t.flags|=128,a=!0,fu(n,!1),t.lanes=4194304);n.isBackwards?(o.sibling=t.child,t.child=o):(e=n.last,e!==null?e.sibling=o:t.child=o,n.last=o)}return n.tail!==null?(e=n.tail,n.rendering=e,n.tail=e.sibling,n.renderingStartTime=qt(),e.sibling=null,i=Et.current,i=a?i&pr|tc:i&pr,ke(Et,i,t),Oe&&Ua(t,n.treeForkCount),e):(lt(t),null);case 22:case 23:return Vi(t),Nh(t),n=t.memoizedState!==null,e!==null?e.memoizedState!==null!==n&&(t.flags|=8192):n&&(t.flags|=8192),n?(i&536870912)!==0&&(t.flags&128)===0&&(lt(t),t.subtreeFlags&6&&(t.flags|=8192)):lt(t),i=t.updateQueue,i!==null&&Vd(t,i.retryQueue),i=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(i=e.memoizedState.cachePool.pool),n=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),n!==i&&(t.flags|=2048),e!==null&&ve(Gl,t),null;case 24:return i=null,e!==null&&(i=e.memoizedState.cache),t.memoizedState.cache!==i&&(t.flags|=2048),Ta(Ut,t),lt(t),null;case 25:return null;case 30:return null}throw Error("Unknown unit of work tag ("+t.tag+"). This error is likely caused by a bug in React. Please file an issue.")}function Sw(e,t){switch(rh(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,(t.mode&_e)!==he&&nu(t),t):null;case 3:return Ta(Ut,t),Z(t),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Ge(t),null;case 31:if(t.memoizedState!==null){if(Vi(t),t.alternate===null)throw Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");Dl()}return e=t.flags,e&65536?(t.flags=e&-65537|128,(t.mode&_e)!==he&&nu(t),t):null;case 13:if(Vi(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");Dl()}return e=t.flags,e&65536?(t.flags=e&-65537|128,(t.mode&_e)!==he&&nu(t),t):null;case 19:return ve(Et,t),null;case 4:return Z(t),null;case 10:return Ta(t.type,t),null;case 22:case 23:return Vi(t),Nh(t),e!==null&&ve(Gl,t),e=t.flags,e&65536?(t.flags=e&-65537|128,(t.mode&_e)!==he&&nu(t),t):null;case 24:return Ta(Ut,t),null;case 25:return null;default:return null}}function A0(e,t){switch(rh(t),t.tag){case 3:Ta(Ut,t),Z(t);break;case 26:case 27:case 5:Ge(t);break;case 4:Z(t);break;case 31:t.memoizedState!==null&&Vi(t);break;case 13:Vi(t);break;case 19:ve(Et,t);break;case 10:Ta(t.type,t);break;case 22:case 23:Vi(t),Nh(t),e!==null&&ve(Gl,t);break;case 24:Ta(Ut,t)}}function Fn(e){return(e.mode&_e)!==he}function D0(e,t){Fn(e)?(Wn(),pu(t,e),Kn()):pu(t,e)}function cm(e,t,i){Fn(e)?(Wn(),js(i,e,t),Kn()):js(i,e,t)}function pu(e,t){try{var i=t.updateQueue,n=i!==null?i.lastEffect:null;if(n!==null){var a=n.next;i=a;do{if((i.tag&e)===e&&(n=void 0,(e&gi)!==Rf&&(Sr=!0),n=F(t,ZD,i),(e&gi)!==Rf&&(Sr=!1),n!==void 0&&typeof n!="function")){var o=void 0;o=(i.tag&Yi)!==0?"useLayoutEffect":(i.tag&gi)!==0?"useInsertionEffect":"useEffect";var s=void 0;s=n===null?" You returned null. If your effect does not require clean up, return undefined (or nothing).":typeof n.then=="function"?`

It looks like you wrote `+o+`(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

`+o+`(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://react.dev/link/hooks-data-fetching`:" You returned: "+n,F(t,function(d,m){console.error("%s must not return anything besides a function, which is used for clean-up.%s",d,m)},o,s)}i=i.next}while(i!==a)}}catch(d){Pe(t,t.return,d)}}function js(e,t,i){try{var n=t.updateQueue,a=n!==null?n.lastEffect:null;if(a!==null){var o=a.next;n=o;do{if((n.tag&e)===e){var s=n.inst,d=s.destroy;d!==void 0&&(s.destroy=void 0,(e&gi)!==Rf&&(Sr=!0),a=t,F(a,PD,a,i,d),(e&gi)!==Rf&&(Sr=!1))}n=n.next}while(n!==o)}}catch(m){Pe(t,t.return,m)}}function U0(e,t){Fn(e)?(Wn(),pu(t,e),Kn()):pu(t,e)}function dm(e,t,i){Fn(e)?(Wn(),js(i,e,t),Kn()):js(i,e,t)}function T0(e){var t=e.updateQueue;if(t!==null){var i=e.stateNode;e.type.defaultProps||"ref"in e.memoizedProps||gr||(i.props!==e.memoizedProps&&console.error("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",le(e)||"instance"),i.state!==e.memoizedState&&console.error("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",le(e)||"instance"));try{F(e,Cv,t,i)}catch(n){Pe(e,e.return,n)}}}function Ew(e,t,i){return e.getSnapshotBeforeUpdate(t,i)}function _w(e,t){var i=t.memoizedProps,n=t.memoizedState;t=e.stateNode,e.type.defaultProps||"ref"in e.memoizedProps||gr||(t.props!==e.memoizedProps&&console.error("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",le(e)||"instance"),t.state!==e.memoizedState&&console.error("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",le(e)||"instance"));try{var a=Ol(e.type,i),o=F(e,Ew,t,a,n);i=cS,o!==void 0||i.has(e.type)||(i.add(e.type),F(e,function(){console.error("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.",le(e))})),t.__reactInternalSnapshotBeforeUpdate=o}catch(s){Pe(e,e.return,s)}}function R0(e,t,i){i.props=Ol(e.type,e.memoizedProps),i.state=e.memoizedState,Fn(e)?(Wn(),F(e,TN,e,t,i),Kn()):F(e,TN,e,t,i)}function ww(e){var t=e.ref;if(t!==null){switch(e.tag){case 26:case 27:case 5:var i=e.stateNode;break;case 30:i=e.stateNode;break;default:i=e.stateNode}if(typeof t=="function")if(Fn(e))try{Wn(),e.refCleanup=t(i)}finally{Kn()}else e.refCleanup=t(i);else typeof t=="string"?console.error("String refs are no longer supported."):t.hasOwnProperty("current")||console.error("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().",le(e)),t.current=i}}function hu(e,t){try{F(e,ww,e)}catch(i){Pe(e,t,i)}}function ea(e,t){var i=e.ref,n=e.refCleanup;if(i!==null)if(typeof n=="function")try{if(Fn(e))try{Wn(),F(e,n)}finally{Kn(e)}else F(e,n)}catch(a){Pe(e,t,a)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof i=="function")try{if(Fn(e))try{Wn(),F(e,i,null)}finally{Kn(e)}else F(e,i,null)}catch(a){Pe(e,t,a)}else i.current=null}function C0(e,t,i,n){var a=e.memoizedProps,o=a.id,s=a.onCommit;a=a.onRender,t=t===null?"mount":"update",_f&&(t="nested-update"),typeof a=="function"&&a(o,t,e.actualDuration,e.treeBaseDuration,e.actualStartTime,i),typeof s=="function"&&s(o,t,n,i)}function Aw(e,t,i,n){var a=e.memoizedProps;e=a.id,a=a.onPostCommit,t=t===null?"mount":"update",_f&&(t="nested-update"),typeof a=="function"&&a(e,t,n,i)}function k0(e){var t=e.type,i=e.memoizedProps,n=e.stateNode;try{F(e,Iw,n,t,i,e)}catch(a){Pe(e,e.return,a)}}function fm(e,t,i){try{F(e,Ww,e.stateNode,e.type,i,t,e)}catch(n){Pe(e,e.return,n)}}function O0(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Oo(e.type)||e.tag===4}function pm(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||O0(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Oo(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function hm(e,t,i){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?(L1(i),(i.nodeType===9?i.body:i.nodeName==="HTML"?i.ownerDocument.body:i).insertBefore(e,t)):(L1(i),t=i.nodeType===9?i.body:i.nodeName==="HTML"?i.ownerDocument.body:i,t.appendChild(e),i=i._reactRootContainer,i!=null||t.onclick!==null||(t.onclick=Aa));else if(n!==4&&(n===27&&Oo(e.type)&&(i=e.stateNode,t=null),e=e.child,e!==null))for(hm(e,t,i),e=e.sibling;e!==null;)hm(e,t,i),e=e.sibling}function $d(e,t,i){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?i.insertBefore(e,t):i.appendChild(e);else if(n!==4&&(n===27&&Oo(e.type)&&(i=e.stateNode),e=e.child,e!==null))for($d(e,t,i),e=e.sibling;e!==null;)$d(e,t,i),e=e.sibling}function Dw(e){for(var t,i=e.return;i!==null;){if(O0(i)){t=i;break}i=i.return}if(t==null)throw Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");switch(t.tag){case 27:t=t.stateNode,i=pm(e),$d(e,i,t);break;case 5:i=t.stateNode,t.flags&32&&(B1(i),t.flags&=-33),t=pm(e),$d(e,t,i);break;case 3:case 4:t=t.stateNode.containerInfo,i=pm(e),hm(e,i,t);break;default:throw Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.")}}function z0(e){var t=e.stateNode,i=e.memoizedProps;try{F(e,hA,e.type,i,t,e)}catch(n){Pe(e,e.return,n)}}function j0(e,t){return t.tag===31?(t=t.memoizedState,e.memoizedState!==null&&t===null):t.tag===13?(e=e.memoizedState,t=t.memoizedState,e!==null&&e.dehydrated!==null&&(t===null||t.dehydrated===null)):t.tag===3?e.memoizedState.isDehydrated&&(t.flags&256)===0:!1}function Uw(e,t){if(e=e.containerInfo,hg=ap,e=Ky(e),Ip(e)){if("selectionStart"in e)var i={start:e.selectionStart,end:e.selectionEnd};else e:{i=(i=e.ownerDocument)&&i.defaultView||window;var n=i.getSelection&&i.getSelection();if(n&&n.rangeCount!==0){i=n.anchorNode;var a=n.anchorOffset,o=n.focusNode;n=n.focusOffset;try{i.nodeType,o.nodeType}catch{i=null;break e}var s=0,d=-1,m=-1,g=0,U=0,T=e,_=null;t:for(;;){for(var j;T!==i||a!==0&&T.nodeType!==3||(d=s+a),T!==o||n!==0&&T.nodeType!==3||(m=s+n),T.nodeType===3&&(s+=T.nodeValue.length),(j=T.firstChild)!==null;)_=T,T=j;for(;;){if(T===e)break t;if(_===i&&++g===a&&(d=s),_===o&&++U===n&&(m=s),(j=T.nextSibling)!==null)break;T=_,_=T.parentNode}T=j}i=d===-1||m===-1?null:{start:d,end:m}}else i=null}i=i||{start:0,end:0}}else i=null;for(mg={focusedElem:e,selectionRange:i},ap=!1,Gt=t;Gt!==null;)if(t=Gt,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,Gt=e;else for(;Gt!==null;){switch(e=t=Gt,i=e.alternate,a=e.flags,e.tag){case 0:if((a&4)!==0&&(e=e.updateQueue,e=e!==null?e.events:null,e!==null))for(i=0;i<e.length;i++)a=e[i],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:(a&1024)!==0&&i!==null&&_w(e,i);break;case 3:if((a&1024)!==0){if(e=e.stateNode.containerInfo,i=e.nodeType,i===9)zm(e);else if(i===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":zm(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((a&1024)!==0)throw Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.")}if(e=t.sibling,e!==null){e.return=t.return,Gt=e;break}Gt=t.return}}function V0(e,t,i){var n=zi(),a=Zn(),o=Jn(),s=In(),d=i.flags;switch(i.tag){case 0:case 11:case 15:ta(e,i),d&4&&D0(i,Yi|fn);break;case 1:if(ta(e,i),d&4)if(e=i.stateNode,t===null)i.type.defaultProps||"ref"in i.memoizedProps||gr||(e.props!==i.memoizedProps&&console.error("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",le(i)||"instance"),e.state!==i.memoizedState&&console.error("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",le(i)||"instance")),Fn(i)?(Wn(),F(i,Vb,i,e),Kn()):F(i,Vb,i,e);else{var m=Ol(i.type,t.memoizedProps);t=t.memoizedState,i.type.defaultProps||"ref"in i.memoizedProps||gr||(e.props!==i.memoizedProps&&console.error("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",le(i)||"instance"),e.state!==i.memoizedState&&console.error("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",le(i)||"instance")),Fn(i)?(Wn(),F(i,AN,i,e,m,t,e.__reactInternalSnapshotBeforeUpdate),Kn()):F(i,AN,i,e,m,t,e.__reactInternalSnapshotBeforeUpdate)}d&64&&T0(i),d&512&&hu(i,i.return);break;case 3:if(t=Ra(),ta(e,i),d&64&&(d=i.updateQueue,d!==null)){if(m=null,i.child!==null)switch(i.child.tag){case 27:case 5:m=i.child.stateNode;break;case 1:m=i.child.stateNode}try{F(i,Cv,d,m)}catch(U){Pe(i,i.return,U)}}e.effectDuration+=cd(t);break;case 27:t===null&&d&4&&z0(i);case 26:case 5:if(ta(e,i),t===null){if(d&4)k0(i);else if(d&64){e=i.type,t=i.memoizedProps,m=i.stateNode;try{F(i,Kw,m,e,t,i)}catch(U){Pe(i,i.return,U)}}}d&512&&hu(i,i.return);break;case 12:if(d&4){d=Ra(),ta(e,i),e=i.stateNode,e.effectDuration+=iu(d);try{F(i,C0,i,t,Yo,e.effectDuration)}catch(U){Pe(i,i.return,U)}}else ta(e,i);break;case 31:ta(e,i),d&4&&B0(e,i);break;case 13:ta(e,i),d&4&&L0(e,i),d&64&&(e=i.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(d=$w.bind(null,i),cA(e,d))));break;case 22:if(d=i.memoizedState!==null||Za,!d){t=t!==null&&t.memoizedState!==null||kt,m=Za;var g=kt;Za=d,(kt=t)&&!g?(ia(e,i,(i.subtreeFlags&8772)!==0),(i.mode&_e)!==he&&0<=ue&&0<=fe&&.05<fe-ue&&ed(i,ue,fe)):ta(e,i),Za=m,kt=g}break;case 30:break;default:ta(e,i)}(i.mode&_e)!==he&&0<=ue&&0<=fe&&((vt||.05<ht)&&Xn(i,ue,fe,ht,pt),i.alternate===null&&i.return!==null&&i.return.alternate!==null&&.05<fe-ue&&(j0(i.return.alternate,i.return)||Gn(i,ue,fe,"Mount"))),ji(n),Pn(a),pt=o,vt=s}function $0(e){var t=e.alternate;t!==null&&(e.alternate=null,$0(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&k(t)),e.stateNode=null,e._debugOwner=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Oa(e,t,i){for(i=i.child;i!==null;)M0(e,t,i),i=i.sibling}function M0(e,t,i){if(ni&&typeof ni.onCommitFiberUnmount=="function")try{ni.onCommitFiberUnmount(Zs,i)}catch(g){ra||(ra=!0,console.error("React instrumentation encountered an error: %o",g))}var n=zi(),a=Zn(),o=Jn(),s=In();switch(i.tag){case 26:kt||ea(i,t),Oa(e,t,i),i.memoizedState?i.memoizedState.count--:i.stateNode&&(e=i.stateNode,e.parentNode.removeChild(e));break;case 27:kt||ea(i,t);var d=Ot,m=wi;Oo(i.type)&&(Ot=i.stateNode,wi=!1),Oa(e,t,i),F(i,Eu,i.stateNode),Ot=d,wi=m;break;case 5:kt||ea(i,t);case 6:if(d=Ot,m=wi,Ot=null,Oa(e,t,i),Ot=d,wi=m,Ot!==null)if(wi)try{F(i,tA,Ot,i.stateNode)}catch(g){Pe(i,t,g)}else try{F(i,eA,Ot,i.stateNode)}catch(g){Pe(i,t,g)}break;case 18:Ot!==null&&(wi?(e=Ot,H1(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,i.stateNode),Ys(e)):H1(Ot,i.stateNode));break;case 4:d=Ot,m=wi,Ot=i.stateNode.containerInfo,wi=!0,Oa(e,t,i),Ot=d,wi=m;break;case 0:case 11:case 14:case 15:js(gi,i,t),kt||cm(i,t,Yi),Oa(e,t,i);break;case 1:kt||(ea(i,t),d=i.stateNode,typeof d.componentWillUnmount=="function"&&R0(i,t,d)),Oa(e,t,i);break;case 21:Oa(e,t,i);break;case 22:kt=(d=kt)||i.memoizedState!==null,Oa(e,t,i),kt=d;break;default:Oa(e,t,i)}(i.mode&_e)!==he&&0<=ue&&0<=fe&&(vt||.05<ht)&&Xn(i,ue,fe,ht,pt),ji(n),Pn(a),pt=o,vt=s}function B0(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{F(t,fA,e)}catch(i){Pe(t,t.return,i)}}}function L0(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{F(t,pA,e)}catch(i){Pe(t,t.return,i)}}function Tw(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new dS),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new dS),t;default:throw Error("Unexpected Suspense handler tag ("+e.tag+"). This is a bug in React.")}}function Md(e,t){var i=Tw(e);t.forEach(function(n){if(!i.has(n)){if(i.add(n),ua)if(yr!==null&&vr!==null)yu(vr,yr);else throw Error("Expected finished root and lanes to be set. This is a bug in React.");var a=Mw.bind(null,e,n);n.then(a,a)}})}function Ei(e,t){var i=t.deletions;if(i!==null)for(var n=0;n<i.length;n++){var a=e,o=t,s=i[n],d=zi(),m=o;e:for(;m!==null;){switch(m.tag){case 27:if(Oo(m.type)){Ot=m.stateNode,wi=!1;break e}break;case 5:Ot=m.stateNode,wi=!1;break e;case 3:case 4:Ot=m.stateNode.containerInfo,wi=!0;break e}m=m.return}if(Ot===null)throw Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");M0(a,o,s),Ot=null,wi=!1,(s.mode&_e)!==he&&0<=ue&&0<=fe&&.05<fe-ue&&Gn(s,ue,fe,"Unmount"),ji(d),a=s,o=a.alternate,o!==null&&(o.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)H0(t,e),t=t.sibling}function H0(e,t){var i=zi(),n=Zn(),a=Jn(),o=In(),s=e.alternate,d=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Ei(t,e),_i(e),d&4&&(js(gi|fn,e,e.return),pu(gi|fn,e),cm(e,e.return,Yi|fn));break;case 1:if(Ei(t,e),_i(e),d&512&&(kt||s===null||ea(s,s.return)),d&64&&Za&&(d=e.updateQueue,d!==null&&(s=d.callbacks,s!==null))){var m=d.shared.hiddenCallbacks;d.shared.hiddenCallbacks=m===null?s:m.concat(s)}break;case 26:if(m=Rn,Ei(t,e),_i(e),d&512&&(kt||s===null||ea(s,s.return)),d&4){var g=s!==null?s.memoizedState:null;if(d=e.memoizedState,s===null)if(d===null)if(e.stateNode===null){e:{d=e.type,s=e.memoizedProps,m=m.ownerDocument||m;t:switch(d){case"title":g=m.getElementsByTagName("title")[0],(!g||g[Ru]||g[Wt]||g.namespaceURI===Js||g.hasAttribute("itemprop"))&&(g=m.createElement(d),m.head.insertBefore(g,m.querySelector("head > title"))),Kt(g,d,s),g[Wt]=e,se(g),d=g;break e;case"link":var U=W1("link","href",m).get(d+(s.href||""));if(U){for(var T=0;T<U.length;T++)if(g=U[T],g.getAttribute("href")===(s.href==null||s.href===""?null:s.href)&&g.getAttribute("rel")===(s.rel==null?null:s.rel)&&g.getAttribute("title")===(s.title==null?null:s.title)&&g.getAttribute("crossorigin")===(s.crossOrigin==null?null:s.crossOrigin)){U.splice(T,1);break t}}g=m.createElement(d),Kt(g,d,s),m.head.appendChild(g);break;case"meta":if(U=W1("meta","content",m).get(d+(s.content||""))){for(T=0;T<U.length;T++)if(g=U[T],Ke(s.content,"content"),g.getAttribute("content")===(s.content==null?null:""+s.content)&&g.getAttribute("name")===(s.name==null?null:s.name)&&g.getAttribute("property")===(s.property==null?null:s.property)&&g.getAttribute("http-equiv")===(s.httpEquiv==null?null:s.httpEquiv)&&g.getAttribute("charset")===(s.charSet==null?null:s.charSet)){U.splice(T,1);break t}}g=m.createElement(d),Kt(g,d,s),m.head.appendChild(g);break;default:throw Error('getNodesForType encountered a type it did not expect: "'+d+'". This is a bug in React.')}g[Wt]=e,se(g),d=g}e.stateNode=d}else F1(m,e.type,e.stateNode);else e.stateNode=K1(m,d,e.memoizedProps);else g!==d?(g===null?s.stateNode!==null&&(s=s.stateNode,s.parentNode.removeChild(s)):g.count--,d===null?F1(m,e.type,e.stateNode):K1(m,d,e.memoizedProps)):d===null&&e.stateNode!==null&&fm(e,e.memoizedProps,s.memoizedProps)}break;case 27:Ei(t,e),_i(e),d&512&&(kt||s===null||ea(s,s.return)),s!==null&&d&4&&fm(e,e.memoizedProps,s.memoizedProps);break;case 5:if(Ei(t,e),_i(e),d&512&&(kt||s===null||ea(s,s.return)),e.flags&32){m=e.stateNode;try{F(e,B1,m)}catch(K){Pe(e,e.return,K)}}d&4&&e.stateNode!=null&&(m=e.memoizedProps,fm(e,m,s!==null?s.memoizedProps:m)),d&1024&&(Jb=!0,e.type!=="form"&&console.error("Unexpected host component type. Expected a form. This is a bug in React."));break;case 6:if(Ei(t,e),_i(e),d&4){if(e.stateNode===null)throw Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");d=e.memoizedProps,s=s!==null?s.memoizedProps:d,m=e.stateNode;try{F(e,Fw,m,s,d)}catch(K){Pe(e,e.return,K)}}break;case 3:if(m=Ra(),tp=null,g=Rn,Rn=Qd(t.containerInfo),Ei(t,e),Rn=g,_i(e),d&4&&s!==null&&s.memoizedState.isDehydrated)try{F(e,dA,t.containerInfo)}catch(K){Pe(e,e.return,K)}Jb&&(Jb=!1,q0(e)),t.effectDuration+=cd(m);break;case 4:d=Rn,Rn=Qd(e.stateNode.containerInfo),Ei(t,e),_i(e),Rn=d;break;case 12:d=Ra(),Ei(t,e),_i(e),e.stateNode.effectDuration+=iu(d);break;case 31:Ei(t,e),_i(e),d&4&&(d=e.updateQueue,d!==null&&(e.updateQueue=null,Md(e,d)));break;case 13:Ei(t,e),_i(e),e.child.flags&8192&&e.memoizedState!==null!=(s!==null&&s.memoizedState!==null)&&(Lf=qt()),d&4&&(d=e.updateQueue,d!==null&&(e.updateQueue=null,Md(e,d)));break;case 22:m=e.memoizedState!==null;var _=s!==null&&s.memoizedState!==null,j=Za,Q=kt;if(Za=j||m,kt=Q||_,Ei(t,e),kt=Q,Za=j,_&&!m&&!j&&!Q&&(e.mode&_e)!==he&&0<=ue&&0<=fe&&.05<fe-ue&&ed(e,ue,fe),_i(e),d&8192)e:for(t=e.stateNode,t._visibility=m?t._visibility&~Bu:t._visibility|Bu,!m||s===null||_||Za||kt||(zl(e),(e.mode&_e)!==he&&0<=ue&&0<=fe&&.05<fe-ue&&Gn(e,ue,fe,"Disconnect")),s=null,t=e;;){if(t.tag===5||t.tag===26){if(s===null){_=s=t;try{g=_.stateNode,m?F(_,nA,g):F(_,lA,_.stateNode,_.memoizedProps)}catch(K){Pe(_,_.return,K)}}}else if(t.tag===6){if(s===null){_=t;try{U=_.stateNode,m?F(_,aA,U):F(_,sA,U,_.memoizedProps)}catch(K){Pe(_,_.return,K)}}}else if(t.tag===18){if(s===null){_=t;try{T=_.stateNode,m?F(_,iA,T):F(_,oA,_.stateNode)}catch(K){Pe(_,_.return,K)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;s===t&&(s=null),t=t.return}s===t&&(s=null),t.sibling.return=t.return,t=t.sibling}d&4&&(d=e.updateQueue,d!==null&&(s=d.retryQueue,s!==null&&(d.retryQueue=null,Md(e,s))));break;case 19:Ei(t,e),_i(e),d&4&&(d=e.updateQueue,d!==null&&(e.updateQueue=null,Md(e,d)));break;case 30:break;case 21:break;default:Ei(t,e),_i(e)}(e.mode&_e)!==he&&0<=ue&&0<=fe&&((vt||.05<ht)&&Xn(e,ue,fe,ht,pt),e.alternate===null&&e.return!==null&&e.return.alternate!==null&&.05<fe-ue&&(j0(e.return.alternate,e.return)||Gn(e,ue,fe,"Mount"))),ji(i),Pn(n),pt=a,vt=o}function _i(e){var t=e.flags;if(t&2){try{F(e,Dw,e)}catch(i){Pe(e,e.return,i)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function q0(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;q0(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function ta(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)V0(e,t.alternate,t),t=t.sibling}function Y0(e){var t=zi(),i=Zn(),n=Jn(),a=In();switch(e.tag){case 0:case 11:case 14:case 15:cm(e,e.return,Yi),zl(e);break;case 1:ea(e,e.return);var o=e.stateNode;typeof o.componentWillUnmount=="function"&&R0(e,e.return,o),zl(e);break;case 27:F(e,Eu,e.stateNode);case 26:case 5:ea(e,e.return),zl(e);break;case 22:e.memoizedState===null&&zl(e);break;case 30:zl(e);break;default:zl(e)}(e.mode&_e)!==he&&0<=ue&&0<=fe&&(vt||.05<ht)&&Xn(e,ue,fe,ht,pt),ji(t),Pn(i),pt=n,vt=a}function zl(e){for(e=e.child;e!==null;)Y0(e),e=e.sibling}function G0(e,t,i,n){var a=zi(),o=Zn(),s=Jn(),d=In(),m=i.flags;switch(i.tag){case 0:case 11:case 15:ia(e,i,n),D0(i,Yi);break;case 1:if(ia(e,i,n),t=i.stateNode,typeof t.componentDidMount=="function"&&F(i,Vb,i,t),t=i.updateQueue,t!==null){e=i.stateNode;try{F(i,dw,t,e)}catch(g){Pe(i,i.return,g)}}n&&m&64&&T0(i),hu(i,i.return);break;case 27:z0(i);case 26:case 5:ia(e,i,n),n&&t===null&&m&4&&k0(i),hu(i,i.return);break;case 12:if(n&&m&4){m=Ra(),ia(e,i,n),n=i.stateNode,n.effectDuration+=iu(m);try{F(i,C0,i,t,Yo,n.effectDuration)}catch(g){Pe(i,i.return,g)}}else ia(e,i,n);break;case 31:ia(e,i,n),n&&m&4&&B0(e,i);break;case 13:ia(e,i,n),n&&m&4&&L0(e,i);break;case 22:i.memoizedState===null&&ia(e,i,n),hu(i,i.return);break;case 30:break;default:ia(e,i,n)}(i.mode&_e)!==he&&0<=ue&&0<=fe&&(vt||.05<ht)&&Xn(i,ue,fe,ht,pt),ji(a),Pn(o),pt=s,vt=d}function ia(e,t,i){for(i=i&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;)G0(e,t.alternate,t,i),t=t.sibling}function mm(e,t){var i=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(i=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==i&&(e!=null&&Tl(e),i!=null&&tu(i))}function bm(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(Tl(t),e!=null&&tu(e))}function wn(e,t,i,n,a){if(t.subtreeFlags&10256||t.actualDuration!==0&&(t.alternate===null||t.alternate.child!==t.child))for(t=t.child;t!==null;){var o=t.sibling;X0(e,t,i,n,o!==null?o.actualStartTime:a),t=o}}function X0(e,t,i,n,a){var o=zi(),s=Zn(),d=Jn(),m=In(),g=Bo,U=t.flags;switch(t.tag){case 0:case 11:case 15:(t.mode&_e)!==he&&0<t.actualStartTime&&(t.flags&1)!==0&&td(t,t.actualStartTime,a,Mt,i),wn(e,t,i,n,a),U&2048&&U0(t,yi|fn);break;case 1:(t.mode&_e)!==he&&0<t.actualStartTime&&((t.flags&128)!==0?Wp(t,t.actualStartTime,a,[]):(t.flags&1)!==0&&td(t,t.actualStartTime,a,Mt,i)),wn(e,t,i,n,a);break;case 3:var T=Ra(),_=Mt;Mt=t.alternate!==null&&t.alternate.memoizedState.isDehydrated&&(t.flags&256)===0,wn(e,t,i,n,a),Mt=_,U&2048&&(i=null,t.alternate!==null&&(i=t.alternate.memoizedState.cache),n=t.memoizedState.cache,n!==i&&(Tl(n),i!=null&&tu(i))),e.passiveEffectDuration+=cd(T);break;case 12:if(U&2048){U=Ra(),wn(e,t,i,n,a),e=t.stateNode,e.passiveEffectDuration+=iu(U);try{F(t,Aw,t,t.alternate,Yo,e.passiveEffectDuration)}catch(j){Pe(t,t.return,j)}}else wn(e,t,i,n,a);break;case 31:U=Mt,T=t.alternate!==null?t.alternate.memoizedState:null,_=t.memoizedState,T!==null&&_===null?(_=t.deletions,_!==null&&0<_.length&&_[0].tag===18?(Mt=!1,T=T.hydrationErrors,T!==null&&Wp(t,t.actualStartTime,a,T)):Mt=!0):Mt=!1,wn(e,t,i,n,a),Mt=U;break;case 13:U=Mt,T=t.alternate!==null?t.alternate.memoizedState:null,_=t.memoizedState,T===null||T.dehydrated===null||_!==null&&_.dehydrated!==null?Mt=!1:(_=t.deletions,_!==null&&0<_.length&&_[0].tag===18?(Mt=!1,T=T.hydrationErrors,T!==null&&Wp(t,t.actualStartTime,a,T)):Mt=!0),wn(e,t,i,n,a),Mt=U;break;case 23:break;case 22:_=t.stateNode,T=t.alternate,t.memoizedState!==null?_._visibility&$a?wn(e,t,i,n,a):mu(e,t,i,n,a):_._visibility&$a?wn(e,t,i,n,a):(_._visibility|=$a,Vs(e,t,i,n,(t.subtreeFlags&10256)!==0||t.actualDuration!==0&&(t.alternate===null||t.alternate.child!==t.child),a),(t.mode&_e)===he||Mt||(e=t.actualStartTime,0<=e&&.05<a-e&&ed(t,e,a),0<=ue&&0<=fe&&.05<fe-ue&&ed(t,ue,fe))),U&2048&&mm(T,t);break;case 24:wn(e,t,i,n,a),U&2048&&bm(t.alternate,t);break;default:wn(e,t,i,n,a)}(t.mode&_e)!==he&&((e=!Mt&&t.alternate===null&&t.return!==null&&t.return.alternate!==null)&&(i=t.actualStartTime,0<=i&&.05<a-i&&Gn(t,i,a,"Mount")),0<=ue&&0<=fe&&((vt||.05<ht)&&Xn(t,ue,fe,ht,pt),e&&.05<fe-ue&&Gn(t,ue,fe,"Mount"))),ji(o),Pn(s),pt=d,vt=m,Bo=g}function Vs(e,t,i,n,a,o){for(a=a&&((t.subtreeFlags&10256)!==0||t.actualDuration!==0&&(t.alternate===null||t.alternate.child!==t.child)),t=t.child;t!==null;){var s=t.sibling;Q0(e,t,i,n,a,s!==null?s.actualStartTime:o),t=s}}function Q0(e,t,i,n,a,o){var s=zi(),d=Zn(),m=Jn(),g=In(),U=Bo;a&&(t.mode&_e)!==he&&0<t.actualStartTime&&(t.flags&1)!==0&&td(t,t.actualStartTime,o,Mt,i);var T=t.flags;switch(t.tag){case 0:case 11:case 15:Vs(e,t,i,n,a,o),U0(t,yi);break;case 23:break;case 22:var _=t.stateNode;t.memoizedState!==null?_._visibility&$a?Vs(e,t,i,n,a,o):mu(e,t,i,n,o):(_._visibility|=$a,Vs(e,t,i,n,a,o)),a&&T&2048&&mm(t.alternate,t);break;case 24:Vs(e,t,i,n,a,o),a&&T&2048&&bm(t.alternate,t);break;default:Vs(e,t,i,n,a,o)}(t.mode&_e)!==he&&0<=ue&&0<=fe&&(vt||.05<ht)&&Xn(t,ue,fe,ht,pt),ji(s),Pn(d),pt=m,vt=g,Bo=U}function mu(e,t,i,n,a){if(t.subtreeFlags&10256||t.actualDuration!==0&&(t.alternate===null||t.alternate.child!==t.child))for(var o=t.child;o!==null;){t=o.sibling;var s=e,d=i,m=n,g=t!==null?t.actualStartTime:a,U=Bo;(o.mode&_e)!==he&&0<o.actualStartTime&&(o.flags&1)!==0&&td(o,o.actualStartTime,g,Mt,d);var T=o.flags;switch(o.tag){case 22:mu(s,o,d,m,g),T&2048&&mm(o.alternate,o);break;case 24:mu(s,o,d,m,g),T&2048&&bm(o.alternate,o);break;default:mu(s,o,d,m,g)}Bo=U,o=t}}function $s(e,t,i){if(e.subtreeFlags&oc)for(e=e.child;e!==null;)Z0(e,t,i),e=e.sibling}function Z0(e,t,i){switch(e.tag){case 26:$s(e,t,i),e.flags&oc&&e.memoizedState!==null&&gA(i,Rn,e.memoizedState,e.memoizedProps);break;case 5:$s(e,t,i);break;case 3:case 4:var n=Rn;Rn=Qd(e.stateNode.containerInfo),$s(e,t,i),Rn=n;break;case 22:e.memoizedState===null&&(n=e.alternate,n!==null&&n.memoizedState!==null?(n=oc,oc=16777216,$s(e,t,i),oc=n):$s(e,t,i));break;default:$s(e,t,i)}}function P0(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function bu(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var i=0;i<t.length;i++){var n=t[i],a=zi();Gt=n,K0(n,e),(n.mode&_e)!==he&&0<=ue&&0<=fe&&.05<fe-ue&&Gn(n,ue,fe,"Unmount"),ji(a)}P0(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)J0(e),e=e.sibling}function J0(e){var t=zi(),i=Zn(),n=Jn(),a=In();switch(e.tag){case 0:case 11:case 15:bu(e),e.flags&2048&&dm(e,e.return,yi|fn);break;case 3:var o=Ra();bu(e),e.stateNode.passiveEffectDuration+=cd(o);break;case 12:o=Ra(),bu(e),e.stateNode.passiveEffectDuration+=iu(o);break;case 22:o=e.stateNode,e.memoizedState!==null&&o._visibility&$a&&(e.return===null||e.return.tag!==13)?(o._visibility&=~$a,Bd(e),(e.mode&_e)!==he&&0<=ue&&0<=fe&&.05<fe-ue&&Gn(e,ue,fe,"Disconnect")):bu(e);break;default:bu(e)}(e.mode&_e)!==he&&0<=ue&&0<=fe&&(vt||.05<ht)&&Xn(e,ue,fe,ht,pt),ji(t),Pn(i),vt=a,pt=n}function Bd(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var i=0;i<t.length;i++){var n=t[i],a=zi();Gt=n,K0(n,e),(n.mode&_e)!==he&&0<=ue&&0<=fe&&.05<fe-ue&&Gn(n,ue,fe,"Unmount"),ji(a)}P0(e)}for(e=e.child;e!==null;)I0(e),e=e.sibling}function I0(e){var t=zi(),i=Zn(),n=Jn(),a=In();switch(e.tag){case 0:case 11:case 15:dm(e,e.return,yi),Bd(e);break;case 22:var o=e.stateNode;o._visibility&$a&&(o._visibility&=~$a,Bd(e));break;default:Bd(e)}(e.mode&_e)!==he&&0<=ue&&0<=fe&&(vt||.05<ht)&&Xn(e,ue,fe,ht,pt),ji(t),Pn(i),vt=a,pt=n}function K0(e,t){for(;Gt!==null;){var i=Gt,n=i,a=t,o=zi(),s=Zn(),d=Jn(),m=In();switch(n.tag){case 0:case 11:case 15:dm(n,a,yi);break;case 23:case 22:n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(a=n.memoizedState.cachePool.pool,a!=null&&Tl(a));break;case 24:tu(n.memoizedState.cache)}if((n.mode&_e)!==he&&0<=ue&&0<=fe&&(vt||.05<ht)&&Xn(n,ue,fe,ht,pt),ji(o),Pn(s),vt=m,pt=d,n=i.child,n!==null)n.return=i,Gt=n;else e:for(i=e;Gt!==null;){if(n=Gt,o=n.sibling,s=n.return,$0(n),n===i){Gt=null;break e}if(o!==null){o.return=s,Gt=o;break e}Gt=s}}}function Rw(){FD.forEach(function(e){return e()})}function W0(){var e=typeof IS_REACT_ACT_ENVIRONMENT<"u"?IS_REACT_ACT_ENVIRONMENT:void 0;return e||M.actQueue===null||console.error("The current testing environment is not configured to support act(...)"),e}function $i(e){if((Le&Bt)!==Xt&&Ae!==0)return Ae&-Ae;var t=M.T;return t!==null?(t._updatedFibers||(t._updatedFibers=new Set),t._updatedFibers.add(e),_m()):No()}function F0(){if(Di===0)if((Ae&536870912)===0||Oe){var e=of;of<<=1,(of&3932160)===0&&(of=262144),Di=e}else Di=536870912;return e=qi.current,e!==null&&(e.flags|=32),Di}function yt(e,t,i){if(Sr&&console.error("useInsertionEffect must not schedule updates."),lg&&(Gf=!0),(e===nt&&(Fe===Il||Fe===Kl)||e.cancelPendingCommit!==null)&&(Bs(e,0),Co(e,Ae,Di,!1)),vo(e,i),(Le&Bt)!==Xt&&e===nt){if(sa)switch(t.tag){case 0:case 11:case 15:e=Ue&&le(Ue)||"Unknown",AS.has(e)||(AS.add(e),t=le(t)||"Unknown",console.error("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://react.dev/link/setstate-in-render",t,e,e));break;case 1:wS||(console.error("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."),wS=!0)}}else ua&&xl(e,t,i),Lw(t),e===nt&&((Le&Bt)===Xt&&(Ko|=i),mt===Po&&Co(e,Ae,Di,!1)),na(e)}function e1(e,t,i){if((Le&(Bt|Gi))!==Xt)throw Error("Should not already be working.");if(Ae!==0&&Ue!==null){var n=Ue,a=qt();switch(yN){case rc:case Il:var o=Xu;rt&&((n=n._debugTask)?n.run(console.timeStamp.bind(console,"Suspended",o,a,an,void 0,"primary-light")):console.timeStamp("Suspended",o,a,an,void 0,"primary-light"));break;case Kl:o=Xu,rt&&((n=n._debugTask)?n.run(console.timeStamp.bind(console,"Action",o,a,an,void 0,"primary-light")):console.timeStamp("Action",o,a,an,void 0,"primary-light"));break;default:rt&&(n=a-Xu,3>n||console.timeStamp("Blocked",Xu,a,an,void 0,5>n?"primary-light":10>n?"primary":100>n?"primary-dark":"error"))}}o=(i=!i&&(t&127)===0&&(t&e.expiredLanes)===0||yo(e,t))?kw(e,t):ym(e,t,!0);var s=i;do{if(o===Pa){xr&&!i&&Co(e,t,0,!1),t=Fe,Xu=Tt(),yN=t;break}else{if(n=qt(),a=e.current.alternate,s&&!Cw(a)){En(t),a=Yt,o=n,!rt||o<=a||(Nt?Nt.run(console.timeStamp.bind(console,"Teared Render",a,o,Me,je,"error")):console.timeStamp("Teared Render",a,o,Me,je,"error")),jl(t,n),o=ym(e,t,!1),s=!1;continue}if(o===Jl){if(s=t,e.errorRecoveryDisabledLanes&s)var d=0;else d=e.pendingLanes&-536870913,d=d!==0?d:d&536870912?536870912:0;if(d!==0){En(t),Fp(Yt,n,t,Nt),jl(t,n),t=d;e:{n=e,o=s,s=cc;var m=n.current.memoizedState.isDehydrated;if(m&&(Bs(n,d).flags|=256),d=ym(n,d,!1),d!==Jl){if(Wb&&!m){n.errorRecoveryDisabledLanes|=o,Ko|=o,o=Po;break e}n=vi,vi=s,n!==null&&(vi===null?vi=n:vi.push.apply(vi,n))}o=d}if(s=!1,o!==Jl)continue;n=qt()}}if(o===sc){En(t),Fp(Yt,n,t,Nt),jl(t,n),Bs(e,0),Co(e,t,0,!0);break}e:{switch(i=e,o){case Pa:case sc:throw Error("Root did not complete. This is a bug in React.");case Po:if((t&4194048)!==t)break;case Vf:En(t),ev(Yt,n,t,Nt),jl(t,n),a=t,(a&127)!==0?Nf=n:(a&4194048)!==0&&(Sf=n),Co(i,t,Di,!Jo);break e;case Jl:vi=null;break;case jf:case fS:break;default:throw Error("Unknown root exit status.")}if(M.actQueue!==null)vm(i,a,t,vi,dc,Bf,Di,Ko,Wl,o,null,null,Yt,n);else{if((t&62914560)===t&&(s=Lf+mS-qt(),10<s)){if(Co(i,t,Di,!Jo),yl(i,0,!0)!==0)break e;Cn=t,i.timeoutHandle=zS(t1.bind(null,i,a,vi,dc,Bf,t,Di,Ko,Wl,Jo,o,"Throttled",Yt,n),s);break e}t1(i,a,vi,dc,Bf,t,Di,Ko,Wl,Jo,o,null,Yt,n)}}}break}while(!0);na(e)}function t1(e,t,i,n,a,o,s,d,m,g,U,T,_,j){e.timeoutHandle=ns;var Q=t.subtreeFlags,K=null;if((Q&8192||(Q&16785408)===16785408)&&(K={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Aa},Z0(t,o,K),Q=(o&62914560)===o?Lf-qt():(o&4194048)===o?hS-qt():0,Q=yA(K,Q),Q!==null)){Cn=o,e.cancelPendingCommit=Q(vm.bind(null,e,t,o,i,n,a,s,d,m,U,K,K.waitingForViewTransition?"Waiting for the previous Animation":0<K.count?0<K.imgCount?"Suspended on CSS and Images":"Suspended on CSS":K.imgCount===1?"Suspended on an Image":0<K.imgCount?"Suspended on Images":null,_,j)),Co(e,o,s,!g);return}vm(e,t,o,i,n,a,s,d,m,U,K,T,_,j)}function Cw(e){for(var t=e;;){var i=t.tag;if((i===0||i===11||i===15)&&t.flags&16384&&(i=t.updateQueue,i!==null&&(i=i.stores,i!==null)))for(var n=0;n<i.length;n++){var a=i[n],o=a.getSnapshot;a=a.value;try{if(!mi(o(),a))return!1}catch{return!1}}if(i=t.child,t.subtreeFlags&16384&&i!==null)i.return=t,t=i;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Co(e,t,i,n){t&=~Fb,t&=~Ko,e.suspendedLanes|=t,e.pingedLanes&=~t,n&&(e.warmLanes|=t),n=e.expirationTimes;for(var a=t;0<a;){var o=31-fi(a),s=1<<o;n[o]=-1,a&=~s}i!==0&&Xr(e,i,t)}function Ms(){return(Le&(Bt|Gi))===Xt?(vu(0),!1):!0}function gm(){if(Ue!==null){if(Fe===Ai)var e=Ue.return;else e=Ue,sd(),Uh(e),dr=null,ec=0,e=Ue;for(;e!==null;)A0(e.alternate,e),e=e.return;Ue=null}}function jl(e,t){(e&127)!==0&&(Ll=t),(e&4194048)!==0&&(qa=t),(e&62914560)!==0&&(bN=t),(e&2080374784)!==0&&(gN=t)}function Bs(e,t){rt&&(console.timeStamp("Blocking Track",.003,.003,"Blocking",je,"primary-light"),console.timeStamp("Transition Track",.003,.003,"Transition",je,"primary-light"),console.timeStamp("Suspense Track",.003,.003,"Suspense",je,"primary-light"),console.timeStamp("Idle Track",.003,.003,"Idle",je,"primary-light"));var i=Yt;if(Yt=Tt(),Ae!==0&&0<i){if(En(Ae),mt===jf||mt===Po)ev(i,Yt,t,Nt);else{var n=Yt,a=Nt;if(rt&&!(n<=i)){var o=(t&738197653)===t?"tertiary-dark":"primary-dark",s=(t&536870912)===t?"Prewarm":(t&201326741)===t?"Interrupted Hydration":"Interrupted Render";a?a.run(console.timeStamp.bind(console,s,i,n,Me,je,o)):console.timeStamp(s,i,n,Me,je,o)}}jl(Ae,Yt)}if(i=Nt,Nt=null,(t&127)!==0){Nt=qu,a=0<=pa&&pa<Ll?Ll:pa,n=0<=Hl&&Hl<Ll?Ll:Hl,o=0<=n?n:0<=a?a:Yt,0<=Nf?(En(2),tv(Nf,o,t,i)):Ef&127,i=a;var d=n,m=Yu,g=0<rr,U=Go===Hu,T=Go===xf;if(a=Yt,n=qu,o=Cb,s=kb,rt){if(Me="Blocking",0<i?i>a&&(i=a):i=a,0<d?d>i&&(d=i):d=i,m!==null&&i>d){var _=g?"secondary-light":"warning";n?n.run(console.timeStamp.bind(console,g?"Consecutive":"Event: "+m,d,i,Me,je,_)):console.timeStamp(g?"Consecutive":"Event: "+m,d,i,Me,je,_)}a>i&&(d=U?"error":(t&738197653)===t?"tertiary-light":"primary-light",U=T?"Promise Resolved":U?"Cascading Update":5<a-i?"Update Blocked":"Update",T=[],s!=null&&T.push(["Component name",s]),o!=null&&T.push(["Method name",o]),i={start:i,end:a,detail:{devtools:{properties:T,track:Me,trackGroup:je,color:d}}},n?n.run(performance.measure.bind(performance,U,i)):performance.measure(U,i))}pa=-1.1,Go=0,kb=Cb=null,Nf=-1.1,rr=Hl,Hl=-1.1,Ll=Tt()}if((t&4194048)!==0&&(Nt=Gu,a=0<=Ya&&Ya<qa?qa:Ya,i=0<=cn&&cn<qa?qa:cn,n=0<=Xo&&Xo<qa?qa:Xo,o=0<=n?n:0<=i?i:Yt,0<=Sf?(En(256),tv(Sf,o,t,Nt)):Ef&4194048,T=n,d=ql,m=0<Qo,g=Ob===xf,o=Yt,n=Gu,s=hN,U=mN,rt&&(Me="Transition",0<i?i>o&&(i=o):i=o,0<a?a>i&&(a=i):a=i,0<T?T>a&&(T=a):T=a,a>T&&d!==null&&(_=m?"secondary-light":"warning",n?n.run(console.timeStamp.bind(console,m?"Consecutive":"Event: "+d,T,a,Me,je,_)):console.timeStamp(m?"Consecutive":"Event: "+d,T,a,Me,je,_)),i>a&&(n?n.run(console.timeStamp.bind(console,"Action",a,i,Me,je,"primary-dark")):console.timeStamp("Action",a,i,Me,je,"primary-dark")),o>i&&(a=g?"Promise Resolved":5<o-i?"Update Blocked":"Update",T=[],U!=null&&T.push(["Component name",U]),s!=null&&T.push(["Method name",s]),i={start:i,end:o,detail:{devtools:{properties:T,track:Me,trackGroup:je,color:"primary-light"}}},n?n.run(performance.measure.bind(performance,a,i)):performance.measure(a,i))),cn=Ya=-1.1,Ob=0,Sf=-1.1,Qo=Xo,Xo=-1.1,qa=Tt()),(t&62914560)!==0&&(Ef&62914560)!==0&&(En(4194304),eh(bN,Yt)),(t&2080374784)!==0&&(Ef&2080374784)!==0&&(En(268435456),eh(gN,Yt)),i=e.timeoutHandle,i!==ns&&(e.timeoutHandle=ns,fU(i)),i=e.cancelPendingCommit,i!==null&&(e.cancelPendingCommit=null,i()),Cn=0,gm(),nt=e,Ue=i=Da(e.current,null),Ae=t,Fe=Ai,Xi=null,Jo=!1,xr=yo(e,t),Wb=!1,mt=Pa,Wl=Di=Fb=Ko=Io=0,vi=cc=null,Bf=!1,(t&8)!==0&&(t|=t&32),n=e.entangledLanes,n!==0)for(e=e.entanglements,n&=t;0<n;)a=31-fi(n),o=1<<a,t|=e[a],n&=~o;return ma=t,id(),e=rN(),1e3<e-sN&&(M.recentlyCreatedOwnerStacks=0,sN=e),Un.discardPendingWarnings(),i}function i1(e,t){ge=null,M.H=ac,M.getCurrentStack=null,sa=!1,Li=null,t===cr||t===Df?(t=Ev(),Fe=rc):t===$b?(t=Ev(),Fe=pS):Fe=t===Zb?Kb:t!==null&&typeof t=="object"&&typeof t.then=="function"?uc:$f,Xi=t;var i=Ue;i===null?(mt=sc,kd(e,Oi(t,e.current))):i.mode&_e&&mh(i)}function n1(){var e=qi.current;return e===null?!0:(Ae&4194048)===Ae?dn===null:(Ae&62914560)===Ae||(Ae&536870912)!==0?e===dn:!1}function a1(){var e=M.H;return M.H=ac,e===null?ac:e}function o1(){var e=M.A;return M.A=WD,e}function Ld(e){Nt===null&&(Nt=e._debugTask==null?null:e._debugTask)}function Hd(){mt=Po,Jo||(Ae&4194048)!==Ae&&qi.current!==null||(xr=!0),(Io&134217727)===0&&(Ko&134217727)===0||nt===null||Co(nt,Ae,Di,!1)}function ym(e,t,i){var n=Le;Le|=Bt;var a=a1(),o=o1();if(nt!==e||Ae!==t){if(ua){var s=e.memoizedUpdaters;0<s.size&&(yu(e,Ae),s.clear()),Es(e,t)}dc=null,Bs(e,t)}t=!1,s=mt;e:do try{if(Fe!==Ai&&Ue!==null){var d=Ue,m=Xi;switch(Fe){case Kb:gm(),s=Vf;break e;case rc:case Il:case Kl:case uc:qi.current===null&&(t=!0);var g=Fe;if(Fe=Ai,Xi=null,Ls(e,d,m,g),i&&xr){s=Pa;break e}break;default:g=Fe,Fe=Ai,Xi=null,Ls(e,d,m,g)}}l1(),s=mt;break}catch(U){i1(e,U)}while(!0);return t&&e.shellSuspendCounter++,sd(),Le=n,M.H=a,M.A=o,Ue===null&&(nt=null,Ae=0,id()),s}function l1(){for(;Ue!==null;)s1(Ue)}function kw(e,t){var i=Le;Le|=Bt;var n=a1(),a=o1();if(nt!==e||Ae!==t){if(ua){var o=e.memoizedUpdaters;0<o.size&&(yu(e,Ae),o.clear()),Es(e,t)}dc=null,Hf=qt()+bS,Bs(e,t)}else xr=yo(e,t);e:do try{if(Fe!==Ai&&Ue!==null)t:switch(t=Ue,o=Xi,Fe){case $f:Fe=Ai,Xi=null,Ls(e,t,o,$f);break;case Il:case Kl:if(Nv(o)){Fe=Ai,Xi=null,r1(t);break}t=function(){Fe!==Il&&Fe!==Kl||nt!==e||(Fe=Mf),na(e)},o.then(t,t);break e;case rc:Fe=Mf;break e;case pS:Fe=Ib;break e;case Mf:Nv(o)?(Fe=Ai,Xi=null,r1(t)):(Fe=Ai,Xi=null,Ls(e,t,o,Mf));break;case Ib:var s=null;switch(Ue.tag){case 26:s=Ue.memoizedState;case 5:case 27:var d=Ue;if(s?ex(s):d.stateNode.complete){Fe=Ai,Xi=null;var m=d.sibling;if(m!==null)Ue=m;else{var g=d.return;g!==null?(Ue=g,qd(g)):Ue=null}break t}break;default:console.error("Unexpected type of fiber triggered a suspensey commit. This is a bug in React.")}Fe=Ai,Xi=null,Ls(e,t,o,Ib);break;case uc:Fe=Ai,Xi=null,Ls(e,t,o,uc);break;case Kb:gm(),mt=Vf;break e;default:throw Error("Unexpected SuspendedReason. This is a bug in React.")}M.actQueue!==null?l1():Ow();break}catch(U){i1(e,U)}while(!0);return sd(),M.H=n,M.A=a,Le=i,Ue!==null?Pa:(nt=null,Ae=0,id(),mt)}function Ow(){for(;Ue!==null&&!kA();)s1(Ue)}function s1(e){var t=e.alternate;(e.mode&_e)!==he?(hh(e),t=F(e,rm,t,e,ma),mh(e)):t=F(e,rm,t,e,ma),e.memoizedProps=e.pendingProps,t===null?qd(e):Ue=t}function r1(e){var t=F(e,zw,e);e.memoizedProps=e.pendingProps,t===null?qd(e):Ue=t}function zw(e){var t=e.alternate,i=(e.mode&_e)!==he;switch(i&&hh(e),e.tag){case 15:case 0:t=v0(t,e,e.pendingProps,e.type,void 0,Ae);break;case 11:t=v0(t,e,e.pendingProps,e.type.render,e.ref,Ae);break;case 5:Uh(e);default:A0(t,e),e=Ue=sv(e,ma),t=rm(t,e,ma)}return i&&mh(e),t}function Ls(e,t,i,n){sd(),Uh(t),dr=null,ec=0;var a=t.return;try{if(yw(e,a,t,i,Ae)){mt=sc,kd(e,Oi(i,e.current)),Ue=null;return}}catch(o){if(a!==null)throw Ue=a,o;mt=sc,kd(e,Oi(i,e.current)),Ue=null;return}t.flags&32768?(Oe||n===$f?e=!0:xr||(Ae&536870912)!==0?e=!1:(Jo=e=!0,(n===Il||n===Kl||n===rc||n===uc)&&(n=qi.current,n!==null&&n.tag===13&&(n.flags|=16384))),u1(t,e)):qd(t)}function qd(e){var t=e;do{if((t.flags&32768)!==0){u1(t,Jo);return}var i=t.alternate;if(e=t.return,hh(t),i=F(t,Nw,i,t,ma),(t.mode&_e)!==he&&bv(t),i!==null){Ue=i;return}if(t=t.sibling,t!==null){Ue=t;return}Ue=t=e}while(t!==null);mt===Pa&&(mt=fS)}function u1(e,t){do{var i=Sw(e.alternate,e);if(i!==null){i.flags&=32767,Ue=i;return}if((e.mode&_e)!==he){bv(e),i=e.actualDuration;for(var n=e.child;n!==null;)i+=n.actualDuration,n=n.sibling;e.actualDuration=i}if(i=e.return,i!==null&&(i.flags|=32768,i.subtreeFlags=0,i.deletions=null),!t&&(e=e.sibling,e!==null)){Ue=e;return}Ue=e=i}while(e!==null);mt=Vf,Ue=null}function vm(e,t,i,n,a,o,s,d,m,g,U,T,_,j){e.cancelPendingCommit=null;do gu();while(zt!==Fo);if(Un.flushLegacyContextWarning(),Un.flushPendingUnsafeLifecycleWarnings(),(Le&(Bt|Gi))!==Xt)throw Error("Should not already be working.");if(En(i),g===Jl?Fp(_,j,i,Nt):n!==null?ow(_,j,i,n,t!==null&&t.alternate!==null&&t.alternate.memoizedState.isDehydrated&&(t.flags&256)!==0,Nt):aw(_,j,i,Nt),t!==null){if(i===0&&console.error("finishedLanes should not be empty during a commit. This is a bug in React."),t===e.current)throw Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");if(o=t.lanes|t.childLanes,o|=Ab,Xc(e,i,o,s,d,m),e===nt&&(Ue=nt=null,Ae=0),Nr=t,el=e,Cn=i,ig=o,ag=a,SS=n,ng=j,ES=T,kn=qf,_S=null,t.actualDuration!==0||(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,Bw(Qs,function(){return gc=window.event,kn===qf&&(kn=tg),h1(),null})):(e.callbackNode=null,e.callbackPriority=0),Ha=null,Yo=Tt(),T!==null&&lw(j,Yo,T,Nt),n=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||n){n=M.T,M.T=null,a=Je.p,Je.p=nn,s=Le,Le|=Gi;try{Uw(e,t,i)}finally{Le=s,Je.p=a,M.T=n}}zt=yS,c1(),d1(),f1()}}function c1(){if(zt===yS){zt=Fo;var e=el,t=Nr,i=Cn,n=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||n){n=M.T,M.T=null;var a=Je.p;Je.p=nn;var o=Le;Le|=Gi;try{yr=i,vr=e,dd(),H0(t,e),vr=yr=null,i=mg;var s=Ky(e.containerInfo),d=i.focusedElem,m=i.selectionRange;if(s!==d&&d&&d.ownerDocument&&Iy(d.ownerDocument.documentElement,d)){if(m!==null&&Ip(d)){var g=m.start,U=m.end;if(U===void 0&&(U=g),"selectionStart"in d)d.selectionStart=g,d.selectionEnd=Math.min(U,d.value.length);else{var T=d.ownerDocument||document,_=T&&T.defaultView||window;if(_.getSelection){var j=_.getSelection(),Q=d.textContent.length,K=Math.min(m.start,Q),st=m.end===void 0?K:Math.min(m.end,Q);!j.extend&&K>st&&(s=st,st=K,K=s);var Ve=Jy(d,K),S=Jy(d,st);if(Ve&&S&&(j.rangeCount!==1||j.anchorNode!==Ve.node||j.anchorOffset!==Ve.offset||j.focusNode!==S.node||j.focusOffset!==S.offset)){var w=T.createRange();w.setStart(Ve.node,Ve.offset),j.removeAllRanges(),K>st?(j.addRange(w),j.extend(S.node,S.offset)):(w.setEnd(S.node,S.offset),j.addRange(w))}}}}for(T=[],j=d;j=j.parentNode;)j.nodeType===1&&T.push({element:j,left:j.scrollLeft,top:j.scrollTop});for(typeof d.focus=="function"&&d.focus(),d=0;d<T.length;d++){var D=T[d];D.element.scrollLeft=D.left,D.element.scrollTop=D.top}}ap=!!hg,mg=hg=null}finally{Le=o,Je.p=a,M.T=n}}e.current=t,zt=vS}}function d1(){if(zt===vS){zt=Fo;var e=_S;if(e!==null){Yo=Tt();var t=La,i=Yo;!rt||i<=t||console.timeStamp(e,t,i,Me,je,"secondary-light")}e=el,t=Nr,i=Cn;var n=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||n){n=M.T,M.T=null;var a=Je.p;Je.p=nn;var o=Le;Le|=Gi;try{yr=i,vr=e,dd(),V0(e,t.alternate,t),vr=yr=null}finally{Le=o,Je.p=a,M.T=n}}e=ng,t=ES,La=Tt(),e=t===null?e:Yo,t=La,i=kn===eg,n=Nt,Ha!==null?iv(e,t,Ha,!1,n):!rt||t<=e||(n?n.run(console.timeStamp.bind(console,i?"Commit Interrupted View Transition":"Commit",e,t,Me,je,i?"error":"secondary-dark")):console.timeStamp(i?"Commit Interrupted View Transition":"Commit",e,t,Me,je,i?"error":"secondary-dark")),zt=xS}}function f1(){if(zt===NS||zt===xS){if(zt===NS){var e=La;La=Tt();var t=La,i=kn===eg;!rt||t<=e||console.timeStamp(i?"Interrupted View Transition":"Starting Animation",e,t,Me,je,i?" error":"secondary-light"),kn!==eg&&(kn=gS)}zt=Fo,OA(),e=el;var n=Nr;t=Cn,i=SS;var a=n.actualDuration!==0||(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0;a?zt=Yf:(zt=Fo,Nr=el=null,p1(e,e.pendingLanes),Fl=0,pc=null);var o=e.pendingLanes;if(o===0&&(Wo=null),a||y1(e),o=_s(t),n=n.stateNode,ni&&typeof ni.onCommitFiberRoot=="function")try{var s=(n.current.flags&128)===128;switch(o){case nn:var d=ab;break;case ca:d=ob;break;case ja:d=Qs;break;case sf:d=lb;break;default:d=Qs}ni.onCommitFiberRoot(Zs,n,d,s)}catch(T){ra||(ra=!0,console.error("React instrumentation encountered an error: %o",T))}if(ua&&e.memoizedUpdaters.clear(),Rw(),i!==null){s=M.T,d=Je.p,Je.p=nn,M.T=null;try{var m=e.onRecoverableError;for(n=0;n<i.length;n++){var g=i[n],U=jw(g.stack);F(g.source,m,g.value,U)}}finally{M.T=s,Je.p=d}}(Cn&3)!==0&&gu(),na(e),o=e.pendingLanes,(t&261930)!==0&&(o&42)!==0?(wf=!0,e===og?fc++:(fc=0,og=e)):fc=0,a||jl(t,La),vu(0)}}function jw(e){return e={componentStack:e},Object.defineProperty(e,"digest",{get:function(){console.error('You are accessing "digest" from the errorInfo object passed to onRecoverableError. This property is no longer provided as part of errorInfo but can be accessed as a property of the Error instance itself.')}}),e}function p1(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,tu(t)))}function gu(){return c1(),d1(),f1(),h1()}function h1(){if(zt!==Yf)return!1;var e=el,t=ig;ig=0;var i=_s(Cn),n=ja>i?ja:i;i=M.T;var a=Je.p;try{Je.p=n,M.T=null;var o=ag;ag=null,n=el;var s=Cn;if(zt=Fo,Nr=el=null,Cn=0,(Le&(Bt|Gi))!==Xt)throw Error("Cannot flush passive effects while already rendering.");En(s),lg=!0,Gf=!1;var d=0;if(Ha=null,d=qt(),kn===gS)eh(La,d,XD);else{var m=La,g=d,U=kn===tg;!rt||g<=m||(Nt?Nt.run(console.timeStamp.bind(console,U?"Waiting for Paint":"Waiting",m,g,Me,je,"secondary-light")):console.timeStamp(U?"Waiting for Paint":"Waiting",m,g,Me,je,"secondary-light"))}m=Le,Le|=Gi;var T=n.current;dd(),J0(T);var _=n.current;T=ng,dd(),X0(n,_,s,o,T),y1(n),Le=m;var j=qt();if(_=d,T=Nt,Ha!==null?iv(_,j,Ha,!0,T):!rt||j<=_||(T?T.run(console.timeStamp.bind(console,"Remaining Effects",_,j,Me,je,"secondary-dark")):console.timeStamp("Remaining Effects",_,j,Me,je,"secondary-dark")),jl(s,j),vu(0,!1),Gf?n===pc?Fl++:(Fl=0,pc=n):Fl=0,Gf=lg=!1,ni&&typeof ni.onPostCommitFiberRoot=="function")try{ni.onPostCommitFiberRoot(Zs,n)}catch(K){ra||(ra=!0,console.error("React instrumentation encountered an error: %o",K))}var Q=n.current.stateNode;return Q.effectDuration=0,Q.passiveEffectDuration=0,!0}finally{Je.p=a,M.T=i,p1(e,t)}}function m1(e,t,i){t=Oi(i,t),gv(t),t=Kh(e.stateNode,t,2),e=Do(e,t,2),e!==null&&(vo(e,2),na(e))}function Pe(e,t,i){if(Sr=!1,e.tag===3)m1(e,e,i);else{for(;t!==null;){if(t.tag===3){m1(t,e,i);return}if(t.tag===1){var n=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof n.componentDidCatch=="function"&&(Wo===null||!Wo.has(n))){e=Oi(i,e),gv(e),i=Wh(2),n=Do(t,i,2),n!==null&&(Fh(i,n,t,e),vo(n,2),na(n));return}}t=t.return}console.error(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Potential causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`,i)}}function xm(e,t,i){var n=e.pingCache;if(n===null){n=e.pingCache=new eU;var a=new Set;n.set(t,a)}else a=n.get(t),a===void 0&&(a=new Set,n.set(t,a));a.has(i)||(Wb=!0,a.add(i),n=Vw.bind(null,e,t,i),ua&&yu(e,i),t.then(n,n))}function Vw(e,t,i){var n=e.pingCache;n!==null&&n.delete(t),e.pingedLanes|=e.suspendedLanes&i,e.warmLanes&=~i,(i&127)!==0?0>pa&&(Ll=pa=Tt(),qu=vf("Promise Resolved"),Go=xf):(i&4194048)!==0&&0>cn&&(qa=cn=Tt(),Gu=vf("Promise Resolved"),Ob=xf),W0()&&M.actQueue===null&&console.error(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act`),nt===e&&(Ae&i)===i&&(mt===Po||mt===jf&&(Ae&62914560)===Ae&&qt()-Lf<mS?(Le&Bt)===Xt&&Bs(e,0):Fb|=i,Wl===Ae&&(Wl=0)),na(e)}function b1(e,t){t===0&&(t=Yr()),e=ii(e,t),e!==null&&(vo(e,t),na(e))}function $w(e){var t=e.memoizedState,i=0;t!==null&&(i=t.retryLane),b1(e,i)}function Mw(e,t){var i=0;switch(e.tag){case 31:case 13:var n=e.stateNode,a=e.memoizedState;a!==null&&(i=a.retryLane);break;case 19:n=e.stateNode;break;case 22:n=e.stateNode._retryCache;break;default:throw Error("Pinged unknown suspense boundary type. This is probably a bug in React.")}n!==null&&n.delete(t),b1(e,i)}function Nm(e,t,i){if((t.subtreeFlags&67117056)!==0)for(t=t.child;t!==null;){var n=e,a=t,o=a.type===ef;o=i||o,a.tag!==22?a.flags&67108864?o&&F(a,g1,n,a):Nm(n,a,o):a.memoizedState===null&&(o&&a.flags&8192?F(a,g1,n,a):a.subtreeFlags&67108864&&F(a,Nm,n,a,o)),t=t.sibling}}function g1(e,t){ne(!0);try{Y0(t),I0(t),G0(e,t.alternate,t,!1),Q0(e,t,0,null,!1,0)}finally{ne(!1)}}function y1(e){var t=!0;e.current.mode&(ai|Dn)||(t=!1),Nm(e,e.current,t)}function v1(e){if((Le&Bt)===Xt){var t=e.tag;if(t===3||t===1||t===0||t===11||t===14||t===15){if(t=le(e)||"ReactComponent",Xf!==null){if(Xf.has(t))return;Xf.add(t)}else Xf=new Set([t]);F(e,function(){console.error("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously tries to update the component. Move this work to useEffect instead.")})}}}function yu(e,t){ua&&e.memoizedUpdaters.forEach(function(i){xl(e,i,t)})}function Bw(e,t){var i=M.actQueue;return i!==null?(i.push(t),nU):nb(e,t)}function Lw(e){W0()&&M.actQueue===null&&F(e,function(){console.error(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act`,le(e))})}function na(e){e!==Er&&e.next===null&&(Er===null?Qf=Er=e:Er=Er.next=e),Zf=!0,M.actQueue!==null?rg||(rg=!0,E1()):sg||(sg=!0,E1())}function vu(e,t){if(!ug&&Zf){ug=!0;do for(var i=!1,n=Qf;n!==null;){if(e!==0){var a=n.pendingLanes;if(a===0)var o=0;else{var s=n.suspendedLanes,d=n.pingedLanes;o=(1<<31-fi(42|e)+1)-1,o&=a&~(s&~d),o=o&201326741?o&201326741|1:o?o|2:0}o!==0&&(i=!0,S1(n,o))}else o=Ae,o=yl(n,n===nt?o:0,n.cancelPendingCommit!==null||n.timeoutHandle!==ns),(o&3)===0||yo(n,o)||(i=!0,S1(n,o));n=n.next}while(i);ug=!1}}function Hw(){gc=window.event,Sm()}function Sm(){Zf=rg=sg=!1;var e=0;tl!==0&&Pw()&&(e=tl);for(var t=qt(),i=null,n=Qf;n!==null;){var a=n.next,o=x1(n,t);o===0?(n.next=null,i===null?Qf=a:i.next=a,a===null&&(Er=i)):(i=n,(e!==0||(o&3)!==0)&&(Zf=!0)),n=a}zt!==Fo&&zt!==Yf||vu(e),tl!==0&&(tl=0)}function x1(e,t){for(var i=e.suspendedLanes,n=e.pingedLanes,a=e.expirationTimes,o=e.pendingLanes&-62914561;0<o;){var s=31-fi(o),d=1<<s,m=a[s];m===-1?((d&i)===0||(d&n)!==0)&&(a[s]=Gc(d,t)):m<=t&&(e.expiredLanes|=d),o&=~d}if(t=nt,i=Ae,i=yl(e,e===t?i:0,e.cancelPendingCommit!==null||e.timeoutHandle!==ns),n=e.callbackNode,i===0||e===t&&(Fe===Il||Fe===Kl)||e.cancelPendingCommit!==null)return n!==null&&Em(n),e.callbackNode=null,e.callbackPriority=0;if((i&3)===0||yo(e,i)){if(t=i&-i,t!==e.callbackPriority||M.actQueue!==null&&n!==cg)Em(n);else return t;switch(_s(i)){case nn:case ca:i=ob;break;case ja:i=Qs;break;case sf:i=lb;break;default:i=Qs}return n=N1.bind(null,e),M.actQueue!==null?(M.actQueue.push(n),i=cg):i=nb(i,n),e.callbackPriority=t,e.callbackNode=i,t}return n!==null&&Em(n),e.callbackPriority=2,e.callbackNode=null,2}function N1(e,t){if(wf=_f=!1,gc=window.event,zt!==Fo&&zt!==Yf)return e.callbackNode=null,e.callbackPriority=0,null;var i=e.callbackNode;if(kn===qf&&(kn=tg),gu()&&e.callbackNode!==i)return null;var n=Ae;return n=yl(e,e===nt?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==ns),n===0?null:(e1(e,n,t),x1(e,qt()),e.callbackNode!=null&&e.callbackNode===i?N1.bind(null,e):null)}function S1(e,t){if(gu())return null;_f=wf,wf=!1,e1(e,t,!0)}function Em(e){e!==cg&&e!==null&&CA(e)}function E1(){M.actQueue!==null&&M.actQueue.push(function(){return Sm(),null}),pU(function(){(Le&(Bt|Gi))!==Xt?nb(ab,Hw):Sm()})}function _m(){if(tl===0){var e=Yl;e===0&&(e=af,af<<=1,(af&261888)===0&&(af=256)),tl=e}return tl}function _1(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:(Ke(e,"action"),Kr(""+e))}function w1(e,t){var i=t.ownerDocument.createElement("input");return i.name=t.name,i.value=t.value,e.id&&i.setAttribute("form",e.id),t.parentNode.insertBefore(i,t),e=new FormData(e),i.parentNode.removeChild(i),e}function qw(e,t,i,n,a){if(t==="submit"&&i&&i.stateNode===a){var o=_1((a[pi]||null).action),s=n.submitter;s&&(t=(t=s[pi]||null)?_1(t.formAction):s.getAttribute("formAction"),t!==null&&(o=t,s=null));var d=new ff("action","action",null,n,a);e.push({event:d,listeners:[{instance:null,listener:function(){if(n.defaultPrevented){if(tl!==0){var m=s?w1(a,s):new FormData(a),g={pending:!0,data:m,method:a.method,action:o};Object.freeze(g),Gh(i,g,null,m)}}else typeof o=="function"&&(d.preventDefault(),m=s?w1(a,s):new FormData(a),g={pending:!0,data:m,method:a.method,action:o},Object.freeze(g),Gh(i,g,o,m))},currentTarget:a}]})}}function Yd(e,t,i){e.currentTarget=i;try{t(e)}catch(n){Sb(n)}e.currentTarget=null}function A1(e,t){t=(t&4)!==0;for(var i=0;i<e.length;i++){var n=e[i];e:{var a=void 0,o=n.event;if(n=n.listeners,t)for(var s=n.length-1;0<=s;s--){var d=n[s],m=d.instance,g=d.currentTarget;if(d=d.listener,m!==a&&o.isPropagationStopped())break e;m!==null?F(m,Yd,o,d,g):Yd(o,d,g),a=m}else for(s=0;s<n.length;s++){if(d=n[s],m=d.instance,g=d.currentTarget,d=d.listener,m!==a&&o.isPropagationStopped())break e;m!==null?F(m,Yd,o,d,g):Yd(o,d,g),a=m}}}}function ze(e,t){dg.has(e)||console.error('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.',e);var i=t[sb];i===void 0&&(i=t[sb]=new Set);var n=e+"__bubble";i.has(n)||(D1(t,e,2,!1),i.add(n))}function wm(e,t,i){dg.has(e)&&!t&&console.error('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.',e);var n=0;t&&(n|=4),D1(i,e,n,t)}function Am(e){if(!e[Pf]){e[Pf]=!0,Ex.forEach(function(i){i!=="selectionchange"&&(dg.has(i)||wm(i,!1,e),wm(i,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Pf]||(t[Pf]=!0,wm("selectionchange",!1,t))}}function D1(e,t,i,n){switch(lx(t)){case nn:var a=SA;break;case ca:a=EA;break;default:a=qm}i=a.bind(null,t,i,e),a=void 0,!fb||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(a=!0),n?a!==void 0?e.addEventListener(t,i,{capture:!0,passive:a}):e.addEventListener(t,i,!0):a!==void 0?e.addEventListener(t,i,{passive:a}):e.addEventListener(t,i,!1)}function Dm(e,t,i,n,a){var o=n;if((t&1)===0&&(t&2)===0&&n!==null)e:for(;;){if(n===null)return;var s=n.tag;if(s===3||s===4){var d=n.stateNode.containerInfo;if(d===a)break;if(s===4)for(s=n.return;s!==null;){var m=s.tag;if((m===3||m===4)&&s.stateNode.containerInfo===a)return;s=s.return}for(;d!==null;){if(s=Y(d),s===null)return;if(m=s.tag,m===5||m===6||m===26||m===27){n=o=s;continue e}d=d.parentNode}}n=n.return}My(function(){var g=o,U=Pp(i),T=[];e:{var _=lN.get(e);if(_!==void 0){var j=ff,Q=e;switch(e){case"keypress":if(Kc(i)===0)break e;case"keydown":case"keyup":j=yD;break;case"focusin":Q="focus",j=bb;break;case"focusout":Q="blur",j=bb;break;case"beforeblur":case"afterblur":j=bb;break;case"click":if(i.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":j=Qx;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":j=lD;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":j=ND;break;case iN:case nN:case aN:j=uD;break;case oN:j=ED;break;case"scroll":case"scrollend":j=aD;break;case"wheel":j=wD;break;case"copy":case"cut":case"paste":j=dD;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":j=Px;break;case"toggle":case"beforetoggle":j=DD}var K=(t&4)!==0,st=!K&&(e==="scroll"||e==="scrollend"),Ve=K?_!==null?_+"Capture":null:_;K=[];for(var S=g,w;S!==null;){var D=S;if(w=D.stateNode,D=D.tag,D!==5&&D!==26&&D!==27||w===null||Ve===null||(D=Wr(S,Ve),D!=null&&K.push(xu(S,D,w))),st)break;S=S.return}0<K.length&&(_=new j(_,Q,null,i,U),T.push({event:_,listeners:K}))}}if((t&7)===0){e:{if(_=e==="mouseover"||e==="pointerover",j=e==="mouseout"||e==="pointerout",_&&i!==Cu&&(Q=i.relatedTarget||i.fromElement)&&(Y(Q)||Q[$o]))break e;if((j||_)&&(_=U.window===U?U:(_=U.ownerDocument)?_.defaultView||_.parentWindow:window,j?(Q=i.relatedTarget||i.toElement,j=g,Q=Q?Y(Q):null,Q!==null&&(st=I(Q),K=Q.tag,Q!==st||K!==5&&K!==27&&K!==6)&&(Q=null)):(j=null,Q=g),j!==Q)){if(K=Qx,D="onMouseLeave",Ve="onMouseEnter",S="mouse",(e==="pointerout"||e==="pointerover")&&(K=Px,D="onPointerLeave",Ve="onPointerEnter",S="pointer"),st=j==null?_:ae(j),w=Q==null?_:ae(Q),_=new K(D,S+"leave",j,i,U),_.target=st,_.relatedTarget=w,D=null,Y(U)===g&&(K=new K(Ve,S+"enter",Q,i,U),K.target=w,K.relatedTarget=st,D=K),st=D,j&&Q)t:{for(K=Yw,Ve=j,S=Q,w=0,D=Ve;D;D=K(D))w++;D=0;for(var L=S;L;L=K(L))D++;for(;0<w-D;)Ve=K(Ve),w--;for(;0<D-w;)S=K(S),D--;for(;w--;){if(Ve===S||S!==null&&Ve===S.alternate){K=Ve;break t}Ve=K(Ve),S=K(S)}K=null}else K=null;j!==null&&U1(T,_,j,K,!1),Q!==null&&st!==null&&U1(T,st,Q,K,!0)}}e:{if(_=g?ae(g):window,j=_.nodeName&&_.nodeName.toLowerCase(),j==="select"||j==="input"&&_.type==="file")var P=Xy;else if(Yy(_))if(eN)P=tw;else{P=F_;var ye=W_}else j=_.nodeName,!j||j.toLowerCase()!=="input"||_.type!=="checkbox"&&_.type!=="radio"?g&&Ir(g.elementType)&&(P=Xy):P=ew;if(P&&(P=P(e,g))){Gy(T,P,i,U);break e}ye&&ye(e,_,g),e==="focusout"&&g&&_.type==="number"&&g.memoizedProps.value!=null&&qp(_,"number",_.value)}switch(ye=g?ae(g):window,e){case"focusin":(Yy(ye)||ye.contentEditable==="true")&&(er=ye,yb=g,Mu=null);break;case"focusout":Mu=yb=er=null;break;case"mousedown":vb=!0;break;case"contextmenu":case"mouseup":case"dragend":vb=!1,Wy(T,i,U);break;case"selectionchange":if(CD)break;case"keydown":case"keyup":Wy(T,i,U)}var re;if(gb)e:{switch(e){case"compositionstart":var oe="onCompositionStart";break e;case"compositionend":oe="onCompositionEnd";break e;case"compositionupdate":oe="onCompositionUpdate";break e}oe=void 0}else Fs?Hy(e,i)&&(oe="onCompositionEnd"):e==="keydown"&&i.keyCode===Jx&&(oe="onCompositionStart");oe&&(Ix&&i.locale!=="ko"&&(Fs||oe!=="onCompositionStart"?oe==="onCompositionEnd"&&Fs&&(re=By()):(Mo=U,pb="value"in Mo?Mo.value:Mo.textContent,Fs=!0)),ye=Gd(g,oe),0<ye.length&&(oe=new Zx(oe,e,null,i,U),T.push({event:oe,listeners:ye}),re?oe.data=re:(re=qy(i),re!==null&&(oe.data=re)))),(re=TD?P_(e,i):J_(e,i))&&(oe=Gd(g,"onBeforeInput"),0<oe.length&&(ye=new pD("onBeforeInput","beforeinput",null,i,U),T.push({event:ye,listeners:oe}),ye.data=re)),qw(T,e,g,i,U)}A1(T,t)})}function xu(e,t,i){return{instance:e,listener:t,currentTarget:i}}function Gd(e,t){for(var i=t+"Capture",n=[];e!==null;){var a=e,o=a.stateNode;if(a=a.tag,a!==5&&a!==26&&a!==27||o===null||(a=Wr(e,i),a!=null&&n.unshift(xu(e,a,o)),a=Wr(e,t),a!=null&&n.push(xu(e,a,o))),e.tag===3)return n;e=e.return}return[]}function Yw(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function U1(e,t,i,n,a){for(var o=t._reactName,s=[];i!==null&&i!==n;){var d=i,m=d.alternate,g=d.stateNode;if(d=d.tag,m!==null&&m===n)break;d!==5&&d!==26&&d!==27||g===null||(m=g,a?(g=Wr(i,o),g!=null&&s.unshift(xu(i,g,m))):a||(g=Wr(i,o),g!=null&&s.push(xu(i,g,m)))),i=i.return}s.length!==0&&e.push({event:t,listeners:s})}function Um(e,t){G_(e,t),e!=="input"&&e!=="textarea"&&e!=="select"||t==null||t.value!==null||Gx||(Gx=!0,e==="select"&&t.multiple?console.error("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.",e):console.error("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.",e));var i={registrationNameDependencies:Vl,possibleRegistrationNames:rb};Ir(e)||typeof t.is=="string"||Q_(e,t,i),t.contentEditable&&!t.suppressContentEditableWarning&&t.children!=null&&console.error("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional.")}function Ht(e,t,i,n){t!==i&&(i=ko(i),ko(t)!==i&&(n[e]=t))}function Gw(e,t,i){t.forEach(function(n){i[C1(n)]=n==="style"?Rm(e):e.getAttribute(n)})}function aa(e,t){t===!1?console.error("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.",e,e,e):console.error("Expected `%s` listener to be a function, instead got a value of `%s` type.",e,typeof t)}function T1(e,t){return e=e.namespaceURI===uf||e.namespaceURI===Js?e.ownerDocument.createElementNS(e.namespaceURI,e.tagName):e.ownerDocument.createElement(e.tagName),e.innerHTML=t,e.innerHTML}function ko(e){return gl(e)&&(console.error("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before using it here.",bl(e)),go(e)),(typeof e=="string"?e:""+e).replace(aU,`
`).replace(oU,"")}function R1(e,t){return t=ko(t),ko(e)===t}function tt(e,t,i,n,a,o){switch(i){case"children":typeof n=="string"?(Ic(n,t,!1),t==="body"||t==="textarea"&&n===""||Jr(e,n)):(typeof n=="number"||typeof n=="bigint")&&(Ic(""+n,t,!1),t!=="body"&&Jr(e,""+n));break;case"className":Zc(e,"class",n);break;case"tabIndex":Zc(e,"tabindex",n);break;case"dir":case"role":case"viewBox":case"width":case"height":Zc(e,i,n);break;case"style":jy(e,n,o);break;case"data":if(t!=="object"){Zc(e,"data",n);break}case"src":case"href":if(n===""&&(t!=="a"||i!=="href")){console.error(i==="src"?'An empty string ("") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string.':'An empty string ("") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.',i,i),e.removeAttribute(i);break}if(n==null||typeof n=="function"||typeof n=="symbol"||typeof n=="boolean"){e.removeAttribute(i);break}Ke(n,i),n=Kr(""+n),e.setAttribute(i,n);break;case"action":case"formAction":if(n!=null&&(t==="form"?i==="formAction"?console.error("You can only pass the formAction prop to <input> or <button>. Use the action prop on <form>."):typeof n=="function"&&(a.encType==null&&a.method==null||Kf||(Kf=!0,console.error("Cannot specify a encType or method for a form that specifies a function as the action. React provides those automatically. They will get overridden.")),a.target==null||If||(If=!0,console.error("Cannot specify a target for a form that specifies a function as the action. The function will always be executed in the same window."))):t==="input"||t==="button"?i==="action"?console.error("You can only pass the action prop to <form>. Use the formAction prop on <input> or <button>."):t!=="input"||a.type==="submit"||a.type==="image"||Jf?t!=="button"||a.type==null||a.type==="submit"||Jf?typeof n=="function"&&(a.name==null||TS||(TS=!0,console.error('Cannot specify a "name" prop for a button that specifies a function as a formAction. React needs it to encode which action should be invoked. It will get overridden.')),a.formEncType==null&&a.formMethod==null||Kf||(Kf=!0,console.error("Cannot specify a formEncType or formMethod for a button that specifies a function as a formAction. React provides those automatically. They will get overridden.")),a.formTarget==null||If||(If=!0,console.error("Cannot specify a formTarget for a button that specifies a function as a formAction. The function will always be executed in the same window."))):(Jf=!0,console.error('A button can only specify a formAction along with type="submit" or no type.')):(Jf=!0,console.error('An input can only specify a formAction along with type="submit" or type="image".')):console.error(i==="action"?"You can only pass the action prop to <form>.":"You can only pass the formAction prop to <input> or <button>.")),typeof n=="function"){e.setAttribute(i,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof o=="function"&&(i==="formAction"?(t!=="input"&&tt(e,t,"name",a.name,a,null),tt(e,t,"formEncType",a.formEncType,a,null),tt(e,t,"formMethod",a.formMethod,a,null),tt(e,t,"formTarget",a.formTarget,a,null)):(tt(e,t,"encType",a.encType,a,null),tt(e,t,"method",a.method,a,null),tt(e,t,"target",a.target,a,null)));if(n==null||typeof n=="symbol"||typeof n=="boolean"){e.removeAttribute(i);break}Ke(n,i),n=Kr(""+n),e.setAttribute(i,n);break;case"onClick":n!=null&&(typeof n!="function"&&aa(i,n),e.onclick=Aa);break;case"onScroll":n!=null&&(typeof n!="function"&&aa(i,n),ze("scroll",e));break;case"onScrollEnd":n!=null&&(typeof n!="function"&&aa(i,n),ze("scrollend",e));break;case"dangerouslySetInnerHTML":if(n!=null){if(typeof n!="object"||!("__html"in n))throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information.");if(i=n.__html,i!=null){if(a.children!=null)throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");e.innerHTML=i}}break;case"multiple":e.multiple=n&&typeof n!="function"&&typeof n!="symbol";break;case"muted":e.muted=n&&typeof n!="function"&&typeof n!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(n==null||typeof n=="function"||typeof n=="boolean"||typeof n=="symbol"){e.removeAttribute("xlink:href");break}Ke(n,i),i=Kr(""+n),e.setAttributeNS(es,"xlink:href",i);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":n!=null&&typeof n!="function"&&typeof n!="symbol"?(Ke(n,i),e.setAttribute(i,""+n)):e.removeAttribute(i);break;case"inert":n!==""||Wf[i]||(Wf[i]=!0,console.error("Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.",i));case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":n&&typeof n!="function"&&typeof n!="symbol"?e.setAttribute(i,""):e.removeAttribute(i);break;case"capture":case"download":n===!0?e.setAttribute(i,""):n!==!1&&n!=null&&typeof n!="function"&&typeof n!="symbol"?(Ke(n,i),e.setAttribute(i,n)):e.removeAttribute(i);break;case"cols":case"rows":case"size":case"span":n!=null&&typeof n!="function"&&typeof n!="symbol"&&!isNaN(n)&&1<=n?(Ke(n,i),e.setAttribute(i,n)):e.removeAttribute(i);break;case"rowSpan":case"start":n==null||typeof n=="function"||typeof n=="symbol"||isNaN(n)?e.removeAttribute(i):(Ke(n,i),e.setAttribute(i,n));break;case"popover":ze("beforetoggle",e),ze("toggle",e),ws(e,"popover",n);break;case"xlinkActuate":wa(e,es,"xlink:actuate",n);break;case"xlinkArcrole":wa(e,es,"xlink:arcrole",n);break;case"xlinkRole":wa(e,es,"xlink:role",n);break;case"xlinkShow":wa(e,es,"xlink:show",n);break;case"xlinkTitle":wa(e,es,"xlink:title",n);break;case"xlinkType":wa(e,es,"xlink:type",n);break;case"xmlBase":wa(e,fg,"xml:base",n);break;case"xmlLang":wa(e,fg,"xml:lang",n);break;case"xmlSpace":wa(e,fg,"xml:space",n);break;case"is":o!=null&&console.error('Cannot update the "is" prop after it has been initialized.'),ws(e,"is",n);break;case"innerText":case"textContent":break;case"popoverTarget":RS||n==null||typeof n!="object"||(RS=!0,console.error("The `popoverTarget` prop expects the ID of an Element as a string. Received %s instead.",n));default:!(2<i.length)||i[0]!=="o"&&i[0]!=="O"||i[1]!=="n"&&i[1]!=="N"?(i=Vy(i),ws(e,i,n)):Vl.hasOwnProperty(i)&&n!=null&&typeof n!="function"&&aa(i,n)}}function Tm(e,t,i,n,a,o){switch(i){case"style":jy(e,n,o);break;case"dangerouslySetInnerHTML":if(n!=null){if(typeof n!="object"||!("__html"in n))throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information.");if(i=n.__html,i!=null){if(a.children!=null)throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");e.innerHTML=i}}break;case"children":typeof n=="string"?Jr(e,n):(typeof n=="number"||typeof n=="bigint")&&Jr(e,""+n);break;case"onScroll":n!=null&&(typeof n!="function"&&aa(i,n),ze("scroll",e));break;case"onScrollEnd":n!=null&&(typeof n!="function"&&aa(i,n),ze("scrollend",e));break;case"onClick":n!=null&&(typeof n!="function"&&aa(i,n),e.onclick=Aa);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(Vl.hasOwnProperty(i))n!=null&&typeof n!="function"&&aa(i,n);else e:{if(i[0]==="o"&&i[1]==="n"&&(a=i.endsWith("Capture"),t=i.slice(2,a?i.length-7:void 0),o=e[pi]||null,o=o!=null?o[i]:null,typeof o=="function"&&e.removeEventListener(t,o,a),typeof n=="function")){typeof o!="function"&&o!==null&&(i in e?e[i]=null:e.hasAttribute(i)&&e.removeAttribute(i)),e.addEventListener(t,n,a);break e}i in e?e[i]=n:n===!0?e.setAttribute(i,""):ws(e,i,n)}}}function Kt(e,t,i){switch(Um(t,i),t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":ze("error",e),ze("load",e);var n=!1,a=!1,o;for(o in i)if(i.hasOwnProperty(o)){var s=i[o];if(s!=null)switch(o){case"src":n=!0;break;case"srcSet":a=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(t+" is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");default:tt(e,t,o,s,i,null)}}a&&tt(e,t,"srcSet",i.srcSet,i,null),n&&tt(e,t,"src",i.src,i,null);return;case"input":ci("input",i),ze("invalid",e);var d=o=s=a=null,m=null,g=null;for(n in i)if(i.hasOwnProperty(n)){var U=i[n];if(U!=null)switch(n){case"name":a=U;break;case"type":s=U;break;case"checked":m=U;break;case"defaultChecked":g=U;break;case"value":o=U;break;case"defaultValue":d=U;break;case"children":case"dangerouslySetInnerHTML":if(U!=null)throw Error(t+" is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");break;default:tt(e,t,n,U,i,null)}}vy(e,i),xy(e,o,d,m,g,s,a,!1);return;case"select":ci("select",i),ze("invalid",e),n=s=o=null;for(a in i)if(i.hasOwnProperty(a)&&(d=i[a],d!=null))switch(a){case"value":o=d;break;case"defaultValue":s=d;break;case"multiple":n=d;default:tt(e,t,a,d,i,null)}Ey(e,i),t=o,i=s,e.multiple=!!n,t!=null?As(e,!!n,t,!1):i!=null&&As(e,!!n,i,!0);return;case"textarea":ci("textarea",i),ze("invalid",e),o=a=n=null;for(s in i)if(i.hasOwnProperty(s)&&(d=i[s],d!=null))switch(s){case"value":n=d;break;case"defaultValue":a=d;break;case"children":o=d;break;case"dangerouslySetInnerHTML":if(d!=null)throw Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");break;default:tt(e,t,s,d,i,null)}_y(e,i),Ay(e,n,a,o);return;case"option":Ny(e,i);for(m in i)i.hasOwnProperty(m)&&(n=i[m],n!=null)&&(m==="selected"?e.selected=n&&typeof n!="function"&&typeof n!="symbol":tt(e,t,m,n,i,null));return;case"dialog":ze("beforetoggle",e),ze("toggle",e),ze("cancel",e),ze("close",e);break;case"iframe":case"object":ze("load",e);break;case"video":case"audio":for(n=0;n<hc.length;n++)ze(hc[n],e);break;case"image":ze("error",e),ze("load",e);break;case"details":ze("toggle",e);break;case"embed":case"source":case"link":ze("error",e),ze("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(g in i)if(i.hasOwnProperty(g)&&(n=i[g],n!=null))switch(g){case"children":case"dangerouslySetInnerHTML":throw Error(t+" is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");default:tt(e,t,g,n,i,null)}return;default:if(Ir(t)){for(U in i)i.hasOwnProperty(U)&&(n=i[U],n!==void 0&&Tm(e,t,U,n,i,void 0));return}}for(d in i)i.hasOwnProperty(d)&&(n=i[d],n!=null&&tt(e,t,d,n,i,null))}function Xw(e,t,i,n){switch(Um(t,n),t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var a=null,o=null,s=null,d=null,m=null,g=null,U=null;for(j in i){var T=i[j];if(i.hasOwnProperty(j)&&T!=null)switch(j){case"checked":break;case"value":break;case"defaultValue":m=T;default:n.hasOwnProperty(j)||tt(e,t,j,null,n,T)}}for(var _ in n){var j=n[_];if(T=i[_],n.hasOwnProperty(_)&&(j!=null||T!=null))switch(_){case"type":o=j;break;case"name":a=j;break;case"checked":g=j;break;case"defaultChecked":U=j;break;case"value":s=j;break;case"defaultValue":d=j;break;case"children":case"dangerouslySetInnerHTML":if(j!=null)throw Error(t+" is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");break;default:j!==T&&tt(e,t,_,j,n,T)}}t=i.type==="checkbox"||i.type==="radio"?i.checked!=null:i.value!=null,n=n.type==="checkbox"||n.type==="radio"?n.checked!=null:n.value!=null,t||!n||US||(console.error("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"),US=!0),!t||n||DS||(console.error("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"),DS=!0),Hp(e,s,d,m,g,U,o,a);return;case"select":j=s=d=_=null;for(o in i)if(m=i[o],i.hasOwnProperty(o)&&m!=null)switch(o){case"value":break;case"multiple":j=m;default:n.hasOwnProperty(o)||tt(e,t,o,null,n,m)}for(a in n)if(o=n[a],m=i[a],n.hasOwnProperty(a)&&(o!=null||m!=null))switch(a){case"value":_=o;break;case"defaultValue":d=o;break;case"multiple":s=o;default:o!==m&&tt(e,t,a,o,n,m)}n=d,t=s,i=j,_!=null?As(e,!!t,_,!1):!!i!=!!t&&(n!=null?As(e,!!t,n,!0):As(e,!!t,t?[]:"",!1));return;case"textarea":j=_=null;for(d in i)if(a=i[d],i.hasOwnProperty(d)&&a!=null&&!n.hasOwnProperty(d))switch(d){case"value":break;case"children":break;default:tt(e,t,d,null,n,a)}for(s in n)if(a=n[s],o=i[s],n.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case"value":_=a;break;case"defaultValue":j=a;break;case"children":break;case"dangerouslySetInnerHTML":if(a!=null)throw Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");break;default:a!==o&&tt(e,t,s,a,n,o)}wy(e,_,j);return;case"option":for(var Q in i)_=i[Q],i.hasOwnProperty(Q)&&_!=null&&!n.hasOwnProperty(Q)&&(Q==="selected"?e.selected=!1:tt(e,t,Q,null,n,_));for(m in n)_=n[m],j=i[m],n.hasOwnProperty(m)&&_!==j&&(_!=null||j!=null)&&(m==="selected"?e.selected=_&&typeof _!="function"&&typeof _!="symbol":tt(e,t,m,_,n,j));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var K in i)_=i[K],i.hasOwnProperty(K)&&_!=null&&!n.hasOwnProperty(K)&&tt(e,t,K,null,n,_);for(g in n)if(_=n[g],j=i[g],n.hasOwnProperty(g)&&_!==j&&(_!=null||j!=null))switch(g){case"children":case"dangerouslySetInnerHTML":if(_!=null)throw Error(t+" is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");break;default:tt(e,t,g,_,n,j)}return;default:if(Ir(t)){for(var st in i)_=i[st],i.hasOwnProperty(st)&&_!==void 0&&!n.hasOwnProperty(st)&&Tm(e,t,st,void 0,n,_);for(U in n)_=n[U],j=i[U],!n.hasOwnProperty(U)||_===j||_===void 0&&j===void 0||Tm(e,t,U,_,n,j);return}}for(var Ve in i)_=i[Ve],i.hasOwnProperty(Ve)&&_!=null&&!n.hasOwnProperty(Ve)&&tt(e,t,Ve,null,n,_);for(T in n)_=n[T],j=i[T],!n.hasOwnProperty(T)||_===j||_==null&&j==null||tt(e,t,T,_,n,j)}function C1(e){switch(e){case"class":return"className";case"for":return"htmlFor";default:return e}}function Rm(e){var t={};e=e.style;for(var i=0;i<e.length;i++){var n=e[i];t[n]=e.getPropertyValue(n)}return t}function k1(e,t,i){if(t!=null&&typeof t!="object")console.error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");else{var n,a=n="",o;for(o in t)if(t.hasOwnProperty(o)){var s=t[o];s!=null&&typeof s!="boolean"&&s!==""&&(o.indexOf("--")===0?(ti(s,o),n+=a+o+":"+(""+s).trim()):typeof s!="number"||s===0||qx.has(o)?(ti(s,o),n+=a+o.replace($x,"-$1").toLowerCase().replace(Mx,"-ms-")+":"+(""+s).trim()):n+=a+o.replace($x,"-$1").toLowerCase().replace(Mx,"-ms-")+":"+s+"px",a=";")}n=n||null,t=e.getAttribute("style"),t!==n&&(n=ko(n),ko(t)!==n&&(i.style=Rm(e)))}}function tn(e,t,i,n,a,o){if(a.delete(i),e=e.getAttribute(i),e===null)switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":return}else if(n!=null)switch(typeof n){case"function":case"symbol":case"boolean":break;default:if(Ke(n,t),e===""+n)return}Ht(t,e,n,o)}function O1(e,t,i,n,a,o){if(a.delete(i),e=e.getAttribute(i),e===null){switch(typeof n){case"function":case"symbol":return}if(!n)return}else switch(typeof n){case"function":case"symbol":break;default:if(n)return}Ht(t,e,n,o)}function Cm(e,t,i,n,a,o){if(a.delete(i),e=e.getAttribute(i),e===null)switch(typeof n){case"undefined":case"function":case"symbol":return}else if(n!=null)switch(typeof n){case"function":case"symbol":break;default:if(Ke(n,i),e===""+n)return}Ht(t,e,n,o)}function z1(e,t,i,n,a,o){if(a.delete(i),e=e.getAttribute(i),e===null)switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":return;default:if(isNaN(n))return}else if(n!=null)switch(typeof n){case"function":case"symbol":case"boolean":break;default:if(!isNaN(n)&&(Ke(n,t),e===""+n))return}Ht(t,e,n,o)}function km(e,t,i,n,a,o){if(a.delete(i),e=e.getAttribute(i),e===null)switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":return}else if(n!=null)switch(typeof n){case"function":case"symbol":case"boolean":break;default:if(Ke(n,t),i=Kr(""+n),e===i)return}Ht(t,e,n,o)}function j1(e,t,i,n){for(var a={},o=new Set,s=e.attributes,d=0;d<s.length;d++)switch(s[d].name.toLowerCase()){case"value":break;case"checked":break;case"selected":break;default:o.add(s[d].name)}if(Ir(t)){for(var m in i)if(i.hasOwnProperty(m)){var g=i[m];if(g!=null){if(Vl.hasOwnProperty(m))typeof g!="function"&&aa(m,g);else if(i.suppressHydrationWarning!==!0)switch(m){case"children":typeof g!="string"&&typeof g!="number"||Ht("children",e.textContent,g,a);continue;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":continue;case"dangerouslySetInnerHTML":s=e.innerHTML,g=g?g.__html:void 0,g!=null&&(g=T1(e,g),Ht(m,s,g,a));continue;case"style":o.delete(m),k1(e,g,a);continue;case"offsetParent":case"offsetTop":case"offsetLeft":case"offsetWidth":case"offsetHeight":case"isContentEditable":case"outerText":case"outerHTML":o.delete(m.toLowerCase()),console.error("Assignment to read-only property will result in a no-op: `%s`",m);continue;case"className":o.delete("class"),s=Qc(e,"class",g),Ht("className",s,g,a);continue;default:n.context===Ja&&t!=="svg"&&t!=="math"?o.delete(m.toLowerCase()):o.delete(m),s=Qc(e,m,g),Ht(m,s,g,a)}}}}else for(g in i)if(i.hasOwnProperty(g)&&(m=i[g],m!=null)){if(Vl.hasOwnProperty(g))typeof m!="function"&&aa(g,m);else if(i.suppressHydrationWarning!==!0)switch(g){case"children":typeof m!="string"&&typeof m!="number"||Ht("children",e.textContent,m,a);continue;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"value":case"checked":case"selected":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":continue;case"dangerouslySetInnerHTML":s=e.innerHTML,m=m?m.__html:void 0,m!=null&&(m=T1(e,m),s!==m&&(a[g]={__html:s}));continue;case"className":tn(e,g,"class",m,o,a);continue;case"tabIndex":tn(e,g,"tabindex",m,o,a);continue;case"style":o.delete(g),k1(e,m,a);continue;case"multiple":o.delete(g),Ht(g,e.multiple,m,a);continue;case"muted":o.delete(g),Ht(g,e.muted,m,a);continue;case"autoFocus":o.delete("autofocus"),Ht(g,e.autofocus,m,a);continue;case"data":if(t!=="object"){o.delete(g),s=e.getAttribute("data"),Ht(g,s,m,a);continue}case"src":case"href":if(!(m!==""||t==="a"&&g==="href"||t==="object"&&g==="data")){console.error(g==="src"?'An empty string ("") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string.':'An empty string ("") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.',g,g);continue}km(e,g,g,m,o,a);continue;case"action":case"formAction":if(s=e.getAttribute(g),typeof m=="function"){o.delete(g.toLowerCase()),g==="formAction"?(o.delete("name"),o.delete("formenctype"),o.delete("formmethod"),o.delete("formtarget")):(o.delete("enctype"),o.delete("method"),o.delete("target"));continue}else if(s===lU){o.delete(g.toLowerCase()),Ht(g,"function",m,a);continue}km(e,g,g.toLowerCase(),m,o,a);continue;case"xlinkHref":km(e,g,"xlink:href",m,o,a);continue;case"contentEditable":Cm(e,g,"contenteditable",m,o,a);continue;case"spellCheck":Cm(e,g,"spellcheck",m,o,a);continue;case"draggable":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":Cm(e,g,g,m,o,a);continue;case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":O1(e,g,g.toLowerCase(),m,o,a);continue;case"capture":case"download":e:{d=e;var U=s=g,T=a;if(o.delete(U),d=d.getAttribute(U),d===null)switch(typeof m){case"undefined":case"function":case"symbol":break e;default:if(m===!1)break e}else if(m!=null)switch(typeof m){case"function":case"symbol":break;case"boolean":if(m===!0&&d==="")break e;break;default:if(Ke(m,s),d===""+m)break e}Ht(s,d,m,T)}continue;case"cols":case"rows":case"size":case"span":e:{if(d=e,U=s=g,T=a,o.delete(U),d=d.getAttribute(U),d===null)switch(typeof m){case"undefined":case"function":case"symbol":case"boolean":break e;default:if(isNaN(m)||1>m)break e}else if(m!=null)switch(typeof m){case"function":case"symbol":case"boolean":break;default:if(!(isNaN(m)||1>m)&&(Ke(m,s),d===""+m))break e}Ht(s,d,m,T)}continue;case"rowSpan":z1(e,g,"rowspan",m,o,a);continue;case"start":z1(e,g,g,m,o,a);continue;case"xHeight":tn(e,g,"x-height",m,o,a);continue;case"xlinkActuate":tn(e,g,"xlink:actuate",m,o,a);continue;case"xlinkArcrole":tn(e,g,"xlink:arcrole",m,o,a);continue;case"xlinkRole":tn(e,g,"xlink:role",m,o,a);continue;case"xlinkShow":tn(e,g,"xlink:show",m,o,a);continue;case"xlinkTitle":tn(e,g,"xlink:title",m,o,a);continue;case"xlinkType":tn(e,g,"xlink:type",m,o,a);continue;case"xmlBase":tn(e,g,"xml:base",m,o,a);continue;case"xmlLang":tn(e,g,"xml:lang",m,o,a);continue;case"xmlSpace":tn(e,g,"xml:space",m,o,a);continue;case"inert":m!==""||Wf[g]||(Wf[g]=!0,console.error("Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.",g)),O1(e,g,g,m,o,a);continue;default:if(!(2<g.length)||g[0]!=="o"&&g[0]!=="O"||g[1]!=="n"&&g[1]!=="N"){d=Vy(g),s=!1,n.context===Ja&&t!=="svg"&&t!=="math"?o.delete(d.toLowerCase()):(U=g.toLowerCase(),U=cf.hasOwnProperty(U)&&cf[U]||null,U!==null&&U!==g&&(s=!0,o.delete(U)),o.delete(d));e:if(U=e,T=d,d=m,qn(T))if(U.hasAttribute(T))U=U.getAttribute(T),Ke(d,T),d=U===""+d?d:U;else{switch(typeof d){case"function":case"symbol":break e;case"boolean":if(U=T.toLowerCase().slice(0,5),U!=="data-"&&U!=="aria-")break e}d=d===void 0?void 0:null}else d=void 0;s||Ht(g,d,m,a)}}}return 0<o.size&&i.suppressHydrationWarning!==!0&&Gw(e,o,a),Object.keys(a).length===0?null:a}function Qw(e,t){switch(e.length){case 0:return"";case 1:return e[0];case 2:return e[0]+" "+t+" "+e[1];default:return e.slice(0,-1).join(", ")+", "+t+" "+e[e.length-1]}}function V1(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Zw(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,i=performance.getEntriesByType("resource"),n=0;n<i.length;n++){var a=i[n],o=a.transferSize,s=a.initiatorType,d=a.duration;if(o&&d&&V1(s)){for(s=0,d=a.responseEnd,n+=1;n<i.length;n++){var m=i[n],g=m.startTime;if(g>d)break;var U=m.transferSize,T=m.initiatorType;U&&V1(T)&&(m=m.responseEnd,s+=U*(m<d?1:(d-g)/(m-g)))}if(--n,t+=8*(o+s)/(a.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}function Xd(e){return e.nodeType===9?e:e.ownerDocument}function $1(e){switch(e){case Js:return wr;case uf:return ep;default:return Ja}}function M1(e,t){if(e===Ja)switch(t){case"svg":return wr;case"math":return ep;default:return Ja}return e===wr&&t==="foreignObject"?Ja:e}function Om(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}function Pw(){var e=window.event;return e&&e.type==="popstate"?e===bg?!1:(bg=e,!0):(bg=null,!1)}function Nu(){var e=window.event;return e&&e!==gc?e.type:null}function Su(){var e=window.event;return e&&e!==gc?e.timeStamp:-1.1}function Jw(e){setTimeout(function(){throw e})}function Iw(e,t,i){switch(t){case"button":case"input":case"select":case"textarea":i.autoFocus&&e.focus();break;case"img":i.src?e.src=i.src:i.srcSet&&(e.srcset=i.srcSet)}}function Kw(){}function Ww(e,t,i,n){Xw(e,t,i,n),e[pi]=n}function B1(e){Jr(e,"")}function Fw(e,t,i){e.nodeValue=i}function L1(e){if(!e.__reactWarnedAboutChildrenConflict){var t=e[pi]||null;if(t!==null){var i=X(e);i!==null&&(typeof t.children=="string"||typeof t.children=="number"?(e.__reactWarnedAboutChildrenConflict=!0,F(i,function(){console.error('Cannot use a ref on a React element as a container to `createRoot` or `createPortal` if that element also sets "children" text content using React. It should be a leaf with no children. Otherwise it\'s ambiguous which children should be used.')})):t.dangerouslySetInnerHTML!=null&&(e.__reactWarnedAboutChildrenConflict=!0,F(i,function(){console.error('Cannot use a ref on a React element as a container to `createRoot` or `createPortal` if that element also sets "dangerouslySetInnerHTML" using React. It should be a leaf with no children. Otherwise it\'s ambiguous which children should be used.')})))}}}function Oo(e){return e==="head"}function eA(e,t){e.removeChild(t)}function tA(e,t){(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e).removeChild(t)}function H1(e,t){var i=t,n=0;do{var a=i.nextSibling;if(e.removeChild(i),a&&a.nodeType===8)if(i=a.data,i===bc||i===Ff){if(n===0){e.removeChild(a),Ys(t);return}n--}else if(i===mc||i===il||i===is||i===_r||i===ts)n++;else if(i===rU)Eu(e.ownerDocument.documentElement);else if(i===cU){i=e.ownerDocument.head,Eu(i);for(var o=i.firstChild;o;){var s=o.nextSibling,d=o.nodeName;o[Ru]||d==="SCRIPT"||d==="STYLE"||d==="LINK"&&o.rel.toLowerCase()==="stylesheet"||i.removeChild(o),o=s}}else i===uU&&Eu(e.ownerDocument.body);i=a}while(i);Ys(t)}function q1(e,t){var i=e;e=0;do{var n=i.nextSibling;if(i.nodeType===1?t?(i._stashedDisplay=i.style.display,i.style.display="none"):(i.style.display=i._stashedDisplay||"",i.getAttribute("style")===""&&i.removeAttribute("style")):i.nodeType===3&&(t?(i._stashedText=i.nodeValue,i.nodeValue=""):i.nodeValue=i._stashedText||""),n&&n.nodeType===8)if(i=n.data,i===bc){if(e===0)break;e--}else i!==mc&&i!==il&&i!==is&&i!==_r||e++;i=n}while(i)}function iA(e){q1(e,!0)}function nA(e){e=e.style,typeof e.setProperty=="function"?e.setProperty("display","none","important"):e.display="none"}function aA(e){e.nodeValue=""}function oA(e){q1(e,!1)}function lA(e,t){t=t[dU],t=t!=null&&t.hasOwnProperty("display")?t.display:null,e.style.display=t==null||typeof t=="boolean"?"":(""+t).trim()}function sA(e,t){e.nodeValue=t}function zm(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var i=t;switch(t=t.nextSibling,i.nodeName){case"HTML":case"HEAD":case"BODY":zm(i),k(i);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(i.rel.toLowerCase()==="stylesheet")continue}e.removeChild(i)}}function rA(e,t,i,n){for(;e.nodeType===1;){var a=i;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!n&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(n){if(!e[Ru])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(o=e.getAttribute("rel"),o==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(o!==a.rel||e.getAttribute("href")!==(a.href==null||a.href===""?null:a.href)||e.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin)||e.getAttribute("title")!==(a.title==null?null:a.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(o=e.getAttribute("src"),(o!==(a.src==null?null:a.src)||e.getAttribute("type")!==(a.type==null?null:a.type)||e.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin))&&o&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){Ke(a.name,"name");var o=a.name==null?null:""+a.name;if(a.type==="hidden"&&e.getAttribute("name")===o)return e}else return e;if(e=Mi(e.nextSibling),e===null)break}return null}function uA(e,t,i){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!i||(e=Mi(e.nextSibling),e===null))return null;return e}function Y1(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Mi(e.nextSibling),e===null))return null;return e}function jm(e){return e.data===il||e.data===is}function Vm(e){return e.data===_r||e.data===il&&e.ownerDocument.readyState!==kS}function cA(e,t){var i=e.ownerDocument;if(e.data===is)e._reactRetry=t;else if(e.data!==il||i.readyState!==kS)t();else{var n=function(){t(),i.removeEventListener("DOMContentLoaded",n)};i.addEventListener("DOMContentLoaded",n),e._reactRetry=n}}function Mi(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===mc||t===_r||t===il||t===is||t===ts||t===pg||t===CS)break;if(t===bc||t===Ff)return null}}return e}function G1(e){if(e.nodeType===1){for(var t=e.nodeName.toLowerCase(),i={},n=e.attributes,a=0;a<n.length;a++){var o=n[a];i[C1(o.name)]=o.name.toLowerCase()==="style"?Rm(e):o.value}return{type:t,props:i}}return e.nodeType===8?e.data===ts?{type:"Activity",props:{}}:{type:"Suspense",props:{}}:e.nodeValue}function X1(e,t,i){return i===null||i[sU]!==!0?(e.nodeValue===t?e=null:(t=ko(t),e=ko(e.nodeValue)===t?null:e.nodeValue),e):null}function $m(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var i=e.data;if(i===bc||i===Ff){if(t===0)return Mi(e.nextSibling);t--}else i!==mc&&i!==_r&&i!==il&&i!==is&&i!==ts||t++}e=e.nextSibling}return null}function Q1(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var i=e.data;if(i===mc||i===_r||i===il||i===is||i===ts){if(t===0)return e;t--}else i!==bc&&i!==Ff||t++}e=e.previousSibling}return null}function dA(e){Ys(e)}function fA(e){Ys(e)}function pA(e){Ys(e)}function Z1(e,t,i,n,a){switch(a&&Zp(e,n.ancestorInfo),t=Xd(i),e){case"html":if(e=t.documentElement,!e)throw Error("React expected an <html> element (document.documentElement) to exist in the Document but one was not found. React never removes the documentElement for any Document it renders into so the cause is likely in some other script running on this page.");return e;case"head":if(e=t.head,!e)throw Error("React expected a <head> element (document.head) to exist in the Document but one was not found. React never removes the head for any Document it renders into so the cause is likely in some other script running on this page.");return e;case"body":if(e=t.body,!e)throw Error("React expected a <body> element (document.body) to exist in the Document but one was not found. React never removes the body for any Document it renders into so the cause is likely in some other script running on this page.");return e;default:throw Error("resolveSingletonInstance was called with an element type that is not supported. This is a bug in React.")}}function hA(e,t,i,n){if(!i[$o]&&X(i)){var a=i.tagName.toLowerCase();console.error("You are mounting a new %s component when a previous one has not first unmounted. It is an error to render more than one %s component at a time and attributes and children of these components will likely fail in unpredictable ways. Please only render a single instance of <%s> and if you need to mount a new one, ensure any previous ones have unmounted first.",a,a,a)}switch(e){case"html":case"head":case"body":break;default:console.error("acquireSingletonInstance was called with an element type that is not supported. This is a bug in React.")}for(a=i.attributes;a.length;)i.removeAttributeNode(a[0]);Kt(i,e,t),i[Wt]=n,i[pi]=t}function Eu(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);k(e)}function Qd(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}function P1(e,t,i){var n=Ar;if(n&&typeof t=="string"&&t){var a=en(t);a='link[rel="'+e+'"][href="'+a+'"]',typeof i=="string"&&(a+='[crossorigin="'+i+'"]'),MS.has(a)||(MS.add(a),e={rel:e,crossOrigin:i,href:t},n.querySelector(a)===null&&(t=n.createElement("link"),Kt(t,"link",e),se(t),n.head.appendChild(t)))}}function J1(e,t,i,n){var a=(a=jo.current)?Qd(a):null;if(!a)throw Error('"resourceRoot" was expected to exist. This is a bug in React.');switch(e){case"meta":case"title":return null;case"style":return typeof i.precedence=="string"&&typeof i.href=="string"?(i=Hs(i.href),t=Ne(a).hoistableStyles,n=t.get(i),n||(n={type:"style",instance:null,count:0,state:null},t.set(i,n)),n):{type:"void",instance:null,count:0,state:null};case"link":if(i.rel==="stylesheet"&&typeof i.href=="string"&&typeof i.precedence=="string"){e=Hs(i.href);var o=Ne(a).hoistableStyles,s=o.get(e);if(!s&&(a=a.ownerDocument||a,s={type:"stylesheet",instance:null,count:0,state:{loading:as,preload:null}},o.set(e,s),(o=a.querySelector(_u(e)))&&!o._p&&(s.instance=o,s.state.loading=yc|hn),!mn.has(e))){var d={rel:"preload",as:"style",href:i.href,crossOrigin:i.crossOrigin,integrity:i.integrity,media:i.media,hrefLang:i.hrefLang,referrerPolicy:i.referrerPolicy};mn.set(e,d),o||mA(a,e,d,s.state)}if(t&&n===null)throw i=`

  - `+Zd(t)+`
  + `+Zd(i),Error("Expected <link> not to update to be updated to a stylesheet with precedence. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key."+i);return s}if(t&&n!==null)throw i=`

  - `+Zd(t)+`
  + `+Zd(i),Error("Expected stylesheet with precedence to not be updated to a different kind of <link>. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key."+i);return null;case"script":return t=i.async,i=i.src,typeof i=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(i=qs(i),t=Ne(a).hoistableScripts,n=t.get(i),n||(n={type:"script",instance:null,count:0,state:null},t.set(i,n)),n):{type:"void",instance:null,count:0,state:null};default:throw Error('getResource encountered a type it did not expect: "'+e+'". this is a bug in React.')}}function Zd(e){var t=0,i="<link";return typeof e.rel=="string"?(t++,i+=' rel="'+e.rel+'"'):An.call(e,"rel")&&(t++,i+=' rel="'+(e.rel===null?"null":"invalid type "+typeof e.rel)+'"'),typeof e.href=="string"?(t++,i+=' href="'+e.href+'"'):An.call(e,"href")&&(t++,i+=' href="'+(e.href===null?"null":"invalid type "+typeof e.href)+'"'),typeof e.precedence=="string"?(t++,i+=' precedence="'+e.precedence+'"'):An.call(e,"precedence")&&(t++,i+=" precedence={"+(e.precedence===null?"null":"invalid type "+typeof e.precedence)+"}"),Object.getOwnPropertyNames(e).length>t&&(i+=" ..."),i+" />"}function Hs(e){return'href="'+en(e)+'"'}function _u(e){return'link[rel="stylesheet"]['+e+"]"}function I1(e){return Ce({},e,{"data-precedence":e.precedence,precedence:null})}function mA(e,t,i,n){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?n.loading=yc:(t=e.createElement("link"),n.preload=t,t.addEventListener("load",function(){return n.loading|=yc}),t.addEventListener("error",function(){return n.loading|=VS}),Kt(t,"link",i),se(t),e.head.appendChild(t))}function qs(e){return'[src="'+en(e)+'"]'}function wu(e){return"script[async]"+e}function K1(e,t,i){if(t.count++,t.instance===null)switch(t.type){case"style":var n=e.querySelector('style[data-href~="'+en(i.href)+'"]');if(n)return t.instance=n,se(n),n;var a=Ce({},i,{"data-href":i.href,"data-precedence":i.precedence,href:null,precedence:null});return n=(e.ownerDocument||e).createElement("style"),se(n),Kt(n,"style",a),Pd(n,i.precedence,e),t.instance=n;case"stylesheet":a=Hs(i.href);var o=e.querySelector(_u(a));if(o)return t.state.loading|=hn,t.instance=o,se(o),o;n=I1(i),(a=mn.get(a))&&Mm(n,a),o=(e.ownerDocument||e).createElement("link"),se(o);var s=o;return s._p=new Promise(function(d,m){s.onload=d,s.onerror=m}),Kt(o,"link",n),t.state.loading|=hn,Pd(o,i.precedence,e),t.instance=o;case"script":return o=qs(i.src),(a=e.querySelector(wu(o)))?(t.instance=a,se(a),a):(n=i,(a=mn.get(o))&&(n=Ce({},i),Bm(n,a)),e=e.ownerDocument||e,a=e.createElement("script"),se(a),Kt(a,"link",n),e.head.appendChild(a),t.instance=a);case"void":return null;default:throw Error('acquireResource encountered a resource type it did not expect: "'+t.type+'". this is a bug in React.')}else t.type==="stylesheet"&&(t.state.loading&hn)===as&&(n=t.instance,t.state.loading|=hn,Pd(n,i.precedence,e));return t.instance}function Pd(e,t,i){for(var n=i.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),a=n.length?n[n.length-1]:null,o=a,s=0;s<n.length;s++){var d=n[s];if(d.dataset.precedence===t)o=d;else if(o!==a)break}o?o.parentNode.insertBefore(e,o.nextSibling):(t=i.nodeType===9?i.head:i,t.insertBefore(e,t.firstChild))}function Mm(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function Bm(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}function W1(e,t,i){if(tp===null){var n=new Map,a=tp=new Map;a.set(i,n)}else a=tp,n=a.get(i),n||(n=new Map,a.set(i,n));if(n.has(e))return n;for(n.set(e,null),i=i.getElementsByTagName(e),a=0;a<i.length;a++){var o=i[a];if(!(o[Ru]||o[Wt]||e==="link"&&o.getAttribute("rel")==="stylesheet")&&o.namespaceURI!==Js){var s=o.getAttribute(t)||"";s=e+s;var d=n.get(s);d?d.push(o):n.set(s,[o])}}return n}function F1(e,t,i){e=e.ownerDocument||e,e.head.insertBefore(i,t==="title"?e.querySelector("head > title"):null)}function bA(e,t,i){var n=!i.ancestorInfo.containerTagInScope;if(i.context===wr||t.itemProp!=null)return!n||t.itemProp==null||e!=="meta"&&e!=="title"&&e!=="style"&&e!=="link"&&e!=="script"||console.error("Cannot render a <%s> outside the main document if it has an `itemProp` prop. `itemProp` suggests the tag belongs to an `itemScope` which can appear anywhere in the DOM. If you were intending for React to hoist this <%s> remove the `itemProp` prop. Otherwise, try moving this tag into the <head> or <body> of the Document.",e,e),!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href===""){n&&console.error('Cannot render a <style> outside the main document without knowing its precedence and a unique href key. React can hoist and deduplicate <style> tags if you provide a `precedence` prop along with an `href` prop that does not conflict with the `href` values used in any other hoisted <style> or <link rel="stylesheet" ...> tags.  Note that hoisting <style> tags is considered an advanced feature that most will not use directly. Consider moving the <style> tag to the <head> or consider adding a `precedence="default"` and `href="some unique resource identifier"`.');break}return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError){if(t.rel==="stylesheet"&&typeof t.precedence=="string"){e=t.href;var a=t.onError,o=t.disabled;i=[],t.onLoad&&i.push("`onLoad`"),a&&i.push("`onError`"),o!=null&&i.push("`disabled`"),a=Qw(i,"and"),a+=i.length===1?" prop":" props",o=i.length===1?"an "+a:"the "+a,i.length&&console.error('React encountered a <link rel="stylesheet" href="%s" ... /> with a `precedence` prop that also included %s. The presence of loading and error handlers indicates an intent to manage the stylesheet loading state from your from your Component code and React will not hoist or deduplicate this stylesheet. If your intent was to have React hoist and deduplciate this stylesheet using the `precedence` prop remove the %s, otherwise remove the `precedence` prop.',e,o,a)}n&&(typeof t.rel!="string"||typeof t.href!="string"||t.href===""?console.error("Cannot render a <link> outside the main document without a `rel` and `href` prop. Try adding a `rel` and/or `href` prop to this <link> or moving the link into the <head> tag"):(t.onError||t.onLoad)&&console.error("Cannot render a <link> with onLoad or onError listeners outside the main document. Try removing onLoad={...} and onError={...} or moving it into the root <head> tag or somewhere in the <body>."));break}return t.rel==="stylesheet"?(e=t.precedence,t=t.disabled,typeof e!="string"&&n&&console.error('Cannot render a <link rel="stylesheet" /> outside the main document without knowing its precedence. Consider adding precedence="default" or moving it into the root <head> tag.'),typeof e=="string"&&t==null):!0;case"script":if(e=t.async&&typeof t.async!="function"&&typeof t.async!="symbol",!e||t.onLoad||t.onError||!t.src||typeof t.src!="string"){n&&(e?t.onLoad||t.onError?console.error("Cannot render a <script> with onLoad or onError listeners outside the main document. Try removing onLoad={...} and onError={...} or moving it into the root <head> tag or somewhere in the <body>."):console.error("Cannot render a <script> outside the main document without `async={true}` and a non-empty `src` prop. Ensure there is a valid `src` and either make the script async or move it into the root <head> tag or somewhere in the <body>."):console.error('Cannot render a sync or defer <script> outside the main document without knowing its order. Try adding async="" or moving it into the root <head> tag.'));break}return!0;case"noscript":case"template":n&&console.error("Cannot render <%s> outside the main document. Try moving it into the root <head> tag.",e)}return!1}function ex(e){return!(e.type==="stylesheet"&&(e.state.loading&$S)===as)}function gA(e,t,i,n){if(i.type==="stylesheet"&&(typeof n.media!="string"||matchMedia(n.media).matches!==!1)&&(i.state.loading&hn)===as){if(i.instance===null){var a=Hs(n.href),o=t.querySelector(_u(a));if(o){t=o._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=Jd.bind(e),t.then(e,e)),i.state.loading|=hn,i.instance=o,se(o);return}o=t.ownerDocument||t,n=I1(n),(a=mn.get(a))&&Mm(n,a),o=o.createElement("link"),se(o);var s=o;s._p=new Promise(function(d,m){s.onload=d,s.onerror=m}),Kt(o,"link",n),i.instance=o}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(i,t),(t=i.state.preload)&&(i.state.loading&$S)===as&&(e.count++,i=Jd.bind(e),t.addEventListener("load",i),t.addEventListener("error",i))}}function yA(e,t){return e.stylesheets&&e.count===0&&Id(e,e.stylesheets),0<e.count||0<e.imgCount?function(i){var n=setTimeout(function(){if(e.stylesheets&&Id(e,e.stylesheets),e.unsuspend){var o=e.unsuspend;e.unsuspend=null,o()}},hU+t);0<e.imgBytes&&yg===0&&(yg=125*Zw()*bU);var a=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Id(e,e.stylesheets),e.unsuspend)){var o=e.unsuspend;e.unsuspend=null,o()}},(e.imgBytes>yg?50:mU)+t);return e.unsuspend=i,function(){e.unsuspend=null,clearTimeout(n),clearTimeout(a)}}:null}function Jd(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Id(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}function Id(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,ip=new Map,t.forEach(vA,e),ip=null,Jd.call(e))}function vA(e,t){if(!(t.state.loading&hn)){var i=ip.get(e);if(i)var n=i.get(vg);else{i=new Map,ip.set(e,i);for(var a=e.querySelectorAll("link[data-precedence],style[data-precedence]"),o=0;o<a.length;o++){var s=a[o];(s.nodeName==="LINK"||s.getAttribute("media")!=="not all")&&(i.set(s.dataset.precedence,s),n=s)}n&&i.set(vg,n)}a=t.instance,s=a.getAttribute("data-precedence"),o=i.get(s)||n,o===n&&i.set(vg,a),i.set(s,a),this.count++,n=Jd.bind(this),a.addEventListener("load",n),a.addEventListener("error",n),o?o.parentNode.insertBefore(a,o.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(a,e.firstChild)),t.state.loading|=hn}}function xA(e,t,i,n,a,o,s,d,m){for(this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=ns,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Gr(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Gr(0),this.hiddenUpdates=Gr(null),this.identifierPrefix=n,this.onUncaughtError=a,this.onCaughtError=o,this.onRecoverableError=s,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=m,this.incompleteTransitions=new Map,this.passiveEffectDuration=this.effectDuration=-0,this.memoizedUpdaters=new Set,e=this.pendingUpdatersLaneMap=[],t=0;31>t;t++)e.push(new Set);this._debugRootType=i?"hydrateRoot()":"createRoot()"}function tx(e,t,i,n,a,o,s,d,m,g,U,T){return e=new xA(e,t,i,s,m,g,U,T,d),t=LD,o===!0&&(t|=ai|Dn),t|=_e,o=x(3,null,null,t),e.current=o,o.stateNode=e,t=ph(),Tl(t),e.pooledCache=t,Tl(t),o.memoizedState={element:n,isDehydrated:i,cache:t},yh(o),e}function ix(e){return e?(e=Ho,e):Ho}function Lm(e,t,i,n,a,o){if(ni&&typeof ni.onScheduleFiberRoot=="function")try{ni.onScheduleFiberRoot(Zs,n,i)}catch(s){ra||(ra=!0,console.error("React instrumentation encountered an error: %o",s))}a=ix(a),n.context===null?n.context=a:n.pendingContext=a,sa&&Li!==null&&!qS&&(qS=!0,console.error(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`,le(Li)||"Unknown")),n=Ao(t),n.payload={element:i},o=o===void 0?null:o,o!==null&&(typeof o!="function"&&console.error("Expected the last optional `callback` argument to be a function. Instead received: %s.",o),n.callback=o),i=Do(e,n,t),i!==null&&(Qn(t,"root.render()",null),yt(i,e,t),ou(i,e,t))}function nx(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var i=e.retryLane;e.retryLane=i!==0&&i<t?i:t}}function Hm(e,t){nx(e,t),(e=e.alternate)&&nx(e,t)}function ax(e){if(e.tag===13||e.tag===31){var t=ii(e,67108864);t!==null&&yt(t,e,67108864),Hm(e,67108864)}}function ox(e){if(e.tag===13||e.tag===31){var t=$i(e);t=xo(t);var i=ii(e,t);i!==null&&yt(i,e,t),Hm(e,t)}}function NA(){return Li}function SA(e,t,i,n){var a=M.T;M.T=null;var o=Je.p;try{Je.p=nn,qm(e,t,i,n)}finally{Je.p=o,M.T=a}}function EA(e,t,i,n){var a=M.T;M.T=null;var o=Je.p;try{Je.p=ca,qm(e,t,i,n)}finally{Je.p=o,M.T=a}}function qm(e,t,i,n){if(ap){var a=Ym(n);if(a===null)Dm(e,t,n,op,i),sx(e,n);else if(_A(a,e,t,i,n))n.stopPropagation();else if(sx(e,n),t&4&&-1<yU.indexOf(e)){for(;a!==null;){var o=X(a);if(o!==null)switch(o.tag){case 3:if(o=o.stateNode,o.current.memoizedState.isDehydrated){var s=Hn(o.pendingLanes);if(s!==0){var d=o;for(d.pendingLanes|=2,d.entangledLanes|=2;s;){var m=1<<31-fi(s);d.entanglements[1]|=m,s&=~m}na(o),(Le&(Bt|Gi))===Xt&&(Hf=qt()+bS,vu(0))}}break;case 31:case 13:d=ii(o,2),d!==null&&yt(d,o,2),Ms(),Hm(o,2)}if(o=Ym(n),o===null&&Dm(e,t,n,op,i),o===a)break;a=o}a!==null&&n.stopPropagation()}else Dm(e,t,n,null,i)}}function Ym(e){return e=Pp(e),Gm(e)}function Gm(e){if(op=null,e=Y(e),e!==null){var t=I(e);if(t===null)e=null;else{var i=t.tag;if(i===13){if(e=$e(t),e!==null)return e;e=null}else if(i===31){if(e=ce(t),e!==null)return e;e=null}else if(i===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return op=e,null}function lx(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return nn;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return ca;case"message":switch(zA()){case ab:return nn;case ob:return ca;case Qs:case jA:return ja;case lb:return sf;default:return ja}default:return ja}}function sx(e,t){switch(e){case"focusin":case"focusout":nl=null;break;case"dragenter":case"dragleave":al=null;break;case"mouseover":case"mouseout":ol=null;break;case"pointerover":case"pointerout":xc.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Nc.delete(t.pointerId)}}function Au(e,t,i,n,a,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:i,eventSystemFlags:n,nativeEvent:o,targetContainers:[a]},t!==null&&(t=X(t),t!==null&&ax(t)),e):(e.eventSystemFlags|=n,t=e.targetContainers,a!==null&&t.indexOf(a)===-1&&t.push(a),e)}function _A(e,t,i,n,a){switch(t){case"focusin":return nl=Au(nl,e,t,i,n,a),!0;case"dragenter":return al=Au(al,e,t,i,n,a),!0;case"mouseover":return ol=Au(ol,e,t,i,n,a),!0;case"pointerover":var o=a.pointerId;return xc.set(o,Au(xc.get(o)||null,e,t,i,n,a)),!0;case"gotpointercapture":return o=a.pointerId,Nc.set(o,Au(Nc.get(o)||null,e,t,i,n,a)),!0}return!1}function rx(e){var t=Y(e.target);if(t!==null){var i=I(t);if(i!==null){if(t=i.tag,t===13){if(t=$e(i),t!==null){e.blockedOn=t,y(e.priority,function(){ox(i)});return}}else if(t===31){if(t=ce(i),t!==null){e.blockedOn=t,y(e.priority,function(){ox(i)});return}}else if(t===3&&i.stateNode.current.memoizedState.isDehydrated){e.blockedOn=i.tag===3?i.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Kd(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var i=Ym(e.nativeEvent);if(i===null){i=e.nativeEvent;var n=new i.constructor(i.type,i),a=n;Cu!==null&&console.error("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."),Cu=a,i.target.dispatchEvent(n),Cu===null&&console.error("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."),Cu=null}else return t=X(i),t!==null&&ax(t),e.blockedOn=i,!1;t.shift()}return!0}function ux(e,t,i){Kd(e)&&i.delete(t)}function wA(){xg=!1,nl!==null&&Kd(nl)&&(nl=null),al!==null&&Kd(al)&&(al=null),ol!==null&&Kd(ol)&&(ol=null),xc.forEach(ux),Nc.forEach(ux)}function Wd(e,t){e.blockedOn===t&&(e.blockedOn=null,xg||(xg=!0,Dt.unstable_scheduleCallback(Dt.unstable_NormalPriority,wA)))}function cx(e){lp!==e&&(lp=e,Dt.unstable_scheduleCallback(Dt.unstable_NormalPriority,function(){lp===e&&(lp=null);for(var t=0;t<e.length;t+=3){var i=e[t],n=e[t+1],a=e[t+2];if(typeof n!="function"){if(Gm(n||i)===null)continue;break}var o=X(i);o!==null&&(e.splice(t,3),t-=3,i={pending:!0,data:a,method:i.method,action:n},Object.freeze(i),Gh(o,i,n,a))}}))}function Ys(e){function t(m){return Wd(m,e)}nl!==null&&Wd(nl,e),al!==null&&Wd(al,e),ol!==null&&Wd(ol,e),xc.forEach(t),Nc.forEach(t);for(var i=0;i<ll.length;i++){var n=ll[i];n.blockedOn===e&&(n.blockedOn=null)}for(;0<ll.length&&(i=ll[0],i.blockedOn===null);)rx(i),i.blockedOn===null&&ll.shift();if(i=(e.ownerDocument||e).$$reactFormReplay,i!=null)for(n=0;n<i.length;n+=3){var a=i[n],o=i[n+1],s=a[pi]||null;if(typeof o=="function")s||cx(i);else if(s){var d=null;if(o&&o.hasAttribute("formAction")){if(a=o,s=o[pi]||null)d=s.formAction;else if(Gm(a)!==null)continue}else d=s.action;typeof d=="function"?i[n+1]=d:(i.splice(n,3),n-=3),cx(i)}}}function dx(){function e(o){o.canIntercept&&o.info==="react-transition"&&o.intercept({handler:function(){return new Promise(function(s){return a=s})},focusReset:"manual",scroll:"manual"})}function t(){a!==null&&(a(),a=null),n||setTimeout(i,20)}function i(){if(!n&&!navigation.transition){var o=navigation.currentEntry;o&&o.url!=null&&navigation.navigate(o.url,{state:o.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var n=!1,a=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(i,100),function(){n=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),a!==null&&(a(),a=null)}}}function Xm(e){this._internalRoot=e}function Fd(e){this._internalRoot=e}function fx(e){e[$o]&&(e._reactRootContainer?console.error("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported."):console.error("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."))}typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());var Dt=wU(),Qm=Rp(),AA=DU(),Ce=Object.assign,DA=Symbol.for("react.element"),oa=Symbol.for("react.transitional.element"),Gs=Symbol.for("react.portal"),Xs=Symbol.for("react.fragment"),ef=Symbol.for("react.strict_mode"),Zm=Symbol.for("react.profiler"),Pm=Symbol.for("react.consumer"),la=Symbol.for("react.context"),Du=Symbol.for("react.forward_ref"),Jm=Symbol.for("react.suspense"),Im=Symbol.for("react.suspense_list"),tf=Symbol.for("react.memo"),Bi=Symbol.for("react.lazy"),Km=Symbol.for("react.activity"),UA=Symbol.for("react.memo_cache_sentinel"),px=Symbol.iterator,TA=Symbol.for("react.client.reference"),$t=Array.isArray,M=Qm.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Je=AA.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,RA=Object.freeze({pending:!1,data:null,method:null,action:null}),Wm=[],Fm=[],za=-1,zo=Lt(null),Uu=Lt(null),jo=Lt(null),nf=Lt(null),Tu=0,hx,mx,bx,gx,yx,vx,xx;ot.__reactDisabledLog=!0;var eb,Nx,tb=!1,ib=new(typeof WeakMap=="function"?WeakMap:Map),Li=null,sa=!1,An=Object.prototype.hasOwnProperty,nb=Dt.unstable_scheduleCallback,CA=Dt.unstable_cancelCallback,kA=Dt.unstable_shouldYield,OA=Dt.unstable_requestPaint,qt=Dt.unstable_now,zA=Dt.unstable_getCurrentPriorityLevel,ab=Dt.unstable_ImmediatePriority,ob=Dt.unstable_UserBlockingPriority,Qs=Dt.unstable_NormalPriority,jA=Dt.unstable_LowPriority,lb=Dt.unstable_IdlePriority,VA=Dt.log,$A=Dt.unstable_setDisableYieldValue,Zs=null,ni=null,ra=!1,ua=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u",fi=Math.clz32?Math.clz32:Ss,MA=Math.log,BA=Math.LN2,af=256,of=262144,lf=4194304,nn=2,ca=8,ja=32,sf=268435456,Vo=Math.random().toString(36).slice(2),Wt="__reactFiber$"+Vo,pi="__reactProps$"+Vo,$o="__reactContainer$"+Vo,sb="__reactEvents$"+Vo,LA="__reactListeners$"+Vo,HA="__reactHandles$"+Vo,Sx="__reactResources$"+Vo,Ru="__reactMarker$"+Vo,Ex=new Set,Vl={},rb={},qA={button:!0,checkbox:!0,image:!0,hidden:!0,radio:!0,reset:!0,submit:!0},YA=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),_x={},wx={},GA=/[\n"\\]/g,Ax=!1,Dx=!1,Ux=!1,Tx=!1,Rx=!1,Cx=!1,kx=["value","defaultValue"],Ox=!1,zx=/["'&<>\n\t]|^\s|\s$/,XA="address applet area article aside base basefont bgsound blockquote body br button caption center col colgroup dd details dir div dl dt embed fieldset figcaption figure footer form frame frameset h1 h2 h3 h4 h5 h6 head header hgroup hr html iframe img input isindex li link listing main marquee menu menuitem meta nav noembed noframes noscript object ol p param plaintext pre script section select source style summary table tbody td template textarea tfoot th thead title tr track ul wbr xmp".split(" "),jx="applet caption html table td th marquee object template foreignObject desc title".split(" "),QA=jx.concat(["button"]),ZA="dd dt li option optgroup p rp rt".split(" "),Vx={current:null,formTag:null,aTagInScope:null,buttonTagInScope:null,nobrTagInScope:null,pTagInButtonScope:null,listItemTagAutoclosing:null,dlItemTagAutoclosing:null,containerTagInScope:null,implicitRootScope:!1},rf={},ub={animation:"animationDelay animationDirection animationDuration animationFillMode animationIterationCount animationName animationPlayState animationTimingFunction".split(" "),background:"backgroundAttachment backgroundClip backgroundColor backgroundImage backgroundOrigin backgroundPositionX backgroundPositionY backgroundRepeat backgroundSize".split(" "),backgroundPosition:["backgroundPositionX","backgroundPositionY"],border:"borderBottomColor borderBottomStyle borderBottomWidth borderImageOutset borderImageRepeat borderImageSlice borderImageSource borderImageWidth borderLeftColor borderLeftStyle borderLeftWidth borderRightColor borderRightStyle borderRightWidth borderTopColor borderTopStyle borderTopWidth".split(" "),borderBlockEnd:["borderBlockEndColor","borderBlockEndStyle","borderBlockEndWidth"],borderBlockStart:["borderBlockStartColor","borderBlockStartStyle","borderBlockStartWidth"],borderBottom:["borderBottomColor","borderBottomStyle","borderBottomWidth"],borderColor:["borderBottomColor","borderLeftColor","borderRightColor","borderTopColor"],borderImage:["borderImageOutset","borderImageRepeat","borderImageSlice","borderImageSource","borderImageWidth"],borderInlineEnd:["borderInlineEndColor","borderInlineEndStyle","borderInlineEndWidth"],borderInlineStart:["borderInlineStartColor","borderInlineStartStyle","borderInlineStartWidth"],borderLeft:["borderLeftColor","borderLeftStyle","borderLeftWidth"],borderRadius:["borderBottomLeftRadius","borderBottomRightRadius","borderTopLeftRadius","borderTopRightRadius"],borderRight:["borderRightColor","borderRightStyle","borderRightWidth"],borderStyle:["borderBottomStyle","borderLeftStyle","borderRightStyle","borderTopStyle"],borderTop:["borderTopColor","borderTopStyle","borderTopWidth"],borderWidth:["borderBottomWidth","borderLeftWidth","borderRightWidth","borderTopWidth"],columnRule:["columnRuleColor","columnRuleStyle","columnRuleWidth"],columns:["columnCount","columnWidth"],flex:["flexBasis","flexGrow","flexShrink"],flexFlow:["flexDirection","flexWrap"],font:"fontFamily fontFeatureSettings fontKerning fontLanguageOverride fontSize fontSizeAdjust fontStretch fontStyle fontVariant fontVariantAlternates fontVariantCaps fontVariantEastAsian fontVariantLigatures fontVariantNumeric fontVariantPosition fontWeight lineHeight".split(" "),fontVariant:"fontVariantAlternates fontVariantCaps fontVariantEastAsian fontVariantLigatures fontVariantNumeric fontVariantPosition".split(" "),gap:["columnGap","rowGap"],grid:"gridAutoColumns gridAutoFlow gridAutoRows gridTemplateAreas gridTemplateColumns gridTemplateRows".split(" "),gridArea:["gridColumnEnd","gridColumnStart","gridRowEnd","gridRowStart"],gridColumn:["gridColumnEnd","gridColumnStart"],gridColumnGap:["columnGap"],gridGap:["columnGap","rowGap"],gridRow:["gridRowEnd","gridRowStart"],gridRowGap:["rowGap"],gridTemplate:["gridTemplateAreas","gridTemplateColumns","gridTemplateRows"],listStyle:["listStyleImage","listStylePosition","listStyleType"],margin:["marginBottom","marginLeft","marginRight","marginTop"],marker:["markerEnd","markerMid","markerStart"],mask:"maskClip maskComposite maskImage maskMode maskOrigin maskPositionX maskPositionY maskRepeat maskSize".split(" "),maskPosition:["maskPositionX","maskPositionY"],outline:["outlineColor","outlineStyle","outlineWidth"],overflow:["overflowX","overflowY"],padding:["paddingBottom","paddingLeft","paddingRight","paddingTop"],placeContent:["alignContent","justifyContent"],placeItems:["alignItems","justifyItems"],placeSelf:["alignSelf","justifySelf"],textDecoration:["textDecorationColor","textDecorationLine","textDecorationStyle"],textEmphasis:["textEmphasisColor","textEmphasisStyle"],transition:["transitionDelay","transitionDuration","transitionProperty","transitionTimingFunction"],wordWrap:["overflowWrap"]},$x=/([A-Z])/g,Mx=/^ms-/,PA=/^(?:webkit|moz|o)[A-Z]/,JA=/^-ms-/,IA=/-(.)/g,Bx=/;\s*$/,Ps={},cb={},Lx=!1,Hx=!1,qx=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" ")),uf="http://www.w3.org/1998/Math/MathML",Js="http://www.w3.org/2000/svg",KA=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),cf={accept:"accept",acceptcharset:"acceptCharset","accept-charset":"acceptCharset",accesskey:"accessKey",action:"action",allowfullscreen:"allowFullScreen",alt:"alt",as:"as",async:"async",autocapitalize:"autoCapitalize",autocomplete:"autoComplete",autocorrect:"autoCorrect",autofocus:"autoFocus",autoplay:"autoPlay",autosave:"autoSave",capture:"capture",cellpadding:"cellPadding",cellspacing:"cellSpacing",challenge:"challenge",charset:"charSet",checked:"checked",children:"children",cite:"cite",class:"className",classid:"classID",classname:"className",cols:"cols",colspan:"colSpan",content:"content",contenteditable:"contentEditable",contextmenu:"contextMenu",controls:"controls",controlslist:"controlsList",coords:"coords",crossorigin:"crossOrigin",dangerouslysetinnerhtml:"dangerouslySetInnerHTML",data:"data",datetime:"dateTime",default:"default",defaultchecked:"defaultChecked",defaultvalue:"defaultValue",defer:"defer",dir:"dir",disabled:"disabled",disablepictureinpicture:"disablePictureInPicture",disableremoteplayback:"disableRemotePlayback",download:"download",draggable:"draggable",enctype:"encType",enterkeyhint:"enterKeyHint",fetchpriority:"fetchPriority",for:"htmlFor",form:"form",formmethod:"formMethod",formaction:"formAction",formenctype:"formEncType",formnovalidate:"formNoValidate",formtarget:"formTarget",frameborder:"frameBorder",headers:"headers",height:"height",hidden:"hidden",high:"high",href:"href",hreflang:"hrefLang",htmlfor:"htmlFor",httpequiv:"httpEquiv","http-equiv":"httpEquiv",icon:"icon",id:"id",imagesizes:"imageSizes",imagesrcset:"imageSrcSet",inert:"inert",innerhtml:"innerHTML",inputmode:"inputMode",integrity:"integrity",is:"is",itemid:"itemID",itemprop:"itemProp",itemref:"itemRef",itemscope:"itemScope",itemtype:"itemType",keyparams:"keyParams",keytype:"keyType",kind:"kind",label:"label",lang:"lang",list:"list",loop:"loop",low:"low",manifest:"manifest",marginwidth:"marginWidth",marginheight:"marginHeight",max:"max",maxlength:"maxLength",media:"media",mediagroup:"mediaGroup",method:"method",min:"min",minlength:"minLength",multiple:"multiple",muted:"muted",name:"name",nomodule:"noModule",nonce:"nonce",novalidate:"noValidate",open:"open",optimum:"optimum",pattern:"pattern",placeholder:"placeholder",playsinline:"playsInline",poster:"poster",preload:"preload",profile:"profile",radiogroup:"radioGroup",readonly:"readOnly",referrerpolicy:"referrerPolicy",rel:"rel",required:"required",reversed:"reversed",role:"role",rows:"rows",rowspan:"rowSpan",sandbox:"sandbox",scope:"scope",scoped:"scoped",scrolling:"scrolling",seamless:"seamless",selected:"selected",shape:"shape",size:"size",sizes:"sizes",span:"span",spellcheck:"spellCheck",src:"src",srcdoc:"srcDoc",srclang:"srcLang",srcset:"srcSet",start:"start",step:"step",style:"style",summary:"summary",tabindex:"tabIndex",target:"target",title:"title",type:"type",usemap:"useMap",value:"value",width:"width",wmode:"wmode",wrap:"wrap",about:"about",accentheight:"accentHeight","accent-height":"accentHeight",accumulate:"accumulate",additive:"additive",alignmentbaseline:"alignmentBaseline","alignment-baseline":"alignmentBaseline",allowreorder:"allowReorder",alphabetic:"alphabetic",amplitude:"amplitude",arabicform:"arabicForm","arabic-form":"arabicForm",ascent:"ascent",attributename:"attributeName",attributetype:"attributeType",autoreverse:"autoReverse",azimuth:"azimuth",basefrequency:"baseFrequency",baselineshift:"baselineShift","baseline-shift":"baselineShift",baseprofile:"baseProfile",bbox:"bbox",begin:"begin",bias:"bias",by:"by",calcmode:"calcMode",capheight:"capHeight","cap-height":"capHeight",clip:"clip",clippath:"clipPath","clip-path":"clipPath",clippathunits:"clipPathUnits",cliprule:"clipRule","clip-rule":"clipRule",color:"color",colorinterpolation:"colorInterpolation","color-interpolation":"colorInterpolation",colorinterpolationfilters:"colorInterpolationFilters","color-interpolation-filters":"colorInterpolationFilters",colorprofile:"colorProfile","color-profile":"colorProfile",colorrendering:"colorRendering","color-rendering":"colorRendering",contentscripttype:"contentScriptType",contentstyletype:"contentStyleType",cursor:"cursor",cx:"cx",cy:"cy",d:"d",datatype:"datatype",decelerate:"decelerate",descent:"descent",diffuseconstant:"diffuseConstant",direction:"direction",display:"display",divisor:"divisor",dominantbaseline:"dominantBaseline","dominant-baseline":"dominantBaseline",dur:"dur",dx:"dx",dy:"dy",edgemode:"edgeMode",elevation:"elevation",enablebackground:"enableBackground","enable-background":"enableBackground",end:"end",exponent:"exponent",externalresourcesrequired:"externalResourcesRequired",fill:"fill",fillopacity:"fillOpacity","fill-opacity":"fillOpacity",fillrule:"fillRule","fill-rule":"fillRule",filter:"filter",filterres:"filterRes",filterunits:"filterUnits",floodopacity:"floodOpacity","flood-opacity":"floodOpacity",floodcolor:"floodColor","flood-color":"floodColor",focusable:"focusable",fontfamily:"fontFamily","font-family":"fontFamily",fontsize:"fontSize","font-size":"fontSize",fontsizeadjust:"fontSizeAdjust","font-size-adjust":"fontSizeAdjust",fontstretch:"fontStretch","font-stretch":"fontStretch",fontstyle:"fontStyle","font-style":"fontStyle",fontvariant:"fontVariant","font-variant":"fontVariant",fontweight:"fontWeight","font-weight":"fontWeight",format:"format",from:"from",fx:"fx",fy:"fy",g1:"g1",g2:"g2",glyphname:"glyphName","glyph-name":"glyphName",glyphorientationhorizontal:"glyphOrientationHorizontal","glyph-orientation-horizontal":"glyphOrientationHorizontal",glyphorientationvertical:"glyphOrientationVertical","glyph-orientation-vertical":"glyphOrientationVertical",glyphref:"glyphRef",gradienttransform:"gradientTransform",gradientunits:"gradientUnits",hanging:"hanging",horizadvx:"horizAdvX","horiz-adv-x":"horizAdvX",horizoriginx:"horizOriginX","horiz-origin-x":"horizOriginX",ideographic:"ideographic",imagerendering:"imageRendering","image-rendering":"imageRendering",in2:"in2",in:"in",inlist:"inlist",intercept:"intercept",k1:"k1",k2:"k2",k3:"k3",k4:"k4",k:"k",kernelmatrix:"kernelMatrix",kernelunitlength:"kernelUnitLength",kerning:"kerning",keypoints:"keyPoints",keysplines:"keySplines",keytimes:"keyTimes",lengthadjust:"lengthAdjust",letterspacing:"letterSpacing","letter-spacing":"letterSpacing",lightingcolor:"lightingColor","lighting-color":"lightingColor",limitingconeangle:"limitingConeAngle",local:"local",markerend:"markerEnd","marker-end":"markerEnd",markerheight:"markerHeight",markermid:"markerMid","marker-mid":"markerMid",markerstart:"markerStart","marker-start":"markerStart",markerunits:"markerUnits",markerwidth:"markerWidth",mask:"mask",maskcontentunits:"maskContentUnits",maskunits:"maskUnits",mathematical:"mathematical",mode:"mode",numoctaves:"numOctaves",offset:"offset",opacity:"opacity",operator:"operator",order:"order",orient:"orient",orientation:"orientation",origin:"origin",overflow:"overflow",overlineposition:"overlinePosition","overline-position":"overlinePosition",overlinethickness:"overlineThickness","overline-thickness":"overlineThickness",paintorder:"paintOrder","paint-order":"paintOrder",panose1:"panose1","panose-1":"panose1",pathlength:"pathLength",patterncontentunits:"patternContentUnits",patterntransform:"patternTransform",patternunits:"patternUnits",pointerevents:"pointerEvents","pointer-events":"pointerEvents",points:"points",pointsatx:"pointsAtX",pointsaty:"pointsAtY",pointsatz:"pointsAtZ",popover:"popover",popovertarget:"popoverTarget",popovertargetaction:"popoverTargetAction",prefix:"prefix",preservealpha:"preserveAlpha",preserveaspectratio:"preserveAspectRatio",primitiveunits:"primitiveUnits",property:"property",r:"r",radius:"radius",refx:"refX",refy:"refY",renderingintent:"renderingIntent","rendering-intent":"renderingIntent",repeatcount:"repeatCount",repeatdur:"repeatDur",requiredextensions:"requiredExtensions",requiredfeatures:"requiredFeatures",resource:"resource",restart:"restart",result:"result",results:"results",rotate:"rotate",rx:"rx",ry:"ry",scale:"scale",security:"security",seed:"seed",shaperendering:"shapeRendering","shape-rendering":"shapeRendering",slope:"slope",spacing:"spacing",specularconstant:"specularConstant",specularexponent:"specularExponent",speed:"speed",spreadmethod:"spreadMethod",startoffset:"startOffset",stddeviation:"stdDeviation",stemh:"stemh",stemv:"stemv",stitchtiles:"stitchTiles",stopcolor:"stopColor","stop-color":"stopColor",stopopacity:"stopOpacity","stop-opacity":"stopOpacity",strikethroughposition:"strikethroughPosition","strikethrough-position":"strikethroughPosition",strikethroughthickness:"strikethroughThickness","strikethrough-thickness":"strikethroughThickness",string:"string",stroke:"stroke",strokedasharray:"strokeDasharray","stroke-dasharray":"strokeDasharray",strokedashoffset:"strokeDashoffset","stroke-dashoffset":"strokeDashoffset",strokelinecap:"strokeLinecap","stroke-linecap":"strokeLinecap",strokelinejoin:"strokeLinejoin","stroke-linejoin":"strokeLinejoin",strokemiterlimit:"strokeMiterlimit","stroke-miterlimit":"strokeMiterlimit",strokewidth:"strokeWidth","stroke-width":"strokeWidth",strokeopacity:"strokeOpacity","stroke-opacity":"strokeOpacity",suppresscontenteditablewarning:"suppressContentEditableWarning",suppresshydrationwarning:"suppressHydrationWarning",surfacescale:"surfaceScale",systemlanguage:"systemLanguage",tablevalues:"tableValues",targetx:"targetX",targety:"targetY",textanchor:"textAnchor","text-anchor":"textAnchor",textdecoration:"textDecoration","text-decoration":"textDecoration",textlength:"textLength",textrendering:"textRendering","text-rendering":"textRendering",to:"to",transform:"transform",transformorigin:"transformOrigin","transform-origin":"transformOrigin",typeof:"typeof",u1:"u1",u2:"u2",underlineposition:"underlinePosition","underline-position":"underlinePosition",underlinethickness:"underlineThickness","underline-thickness":"underlineThickness",unicode:"unicode",unicodebidi:"unicodeBidi","unicode-bidi":"unicodeBidi",unicoderange:"unicodeRange","unicode-range":"unicodeRange",unitsperem:"unitsPerEm","units-per-em":"unitsPerEm",unselectable:"unselectable",valphabetic:"vAlphabetic","v-alphabetic":"vAlphabetic",values:"values",vectoreffect:"vectorEffect","vector-effect":"vectorEffect",version:"version",vertadvy:"vertAdvY","vert-adv-y":"vertAdvY",vertoriginx:"vertOriginX","vert-origin-x":"vertOriginX",vertoriginy:"vertOriginY","vert-origin-y":"vertOriginY",vhanging:"vHanging","v-hanging":"vHanging",videographic:"vIdeographic","v-ideographic":"vIdeographic",viewbox:"viewBox",viewtarget:"viewTarget",visibility:"visibility",vmathematical:"vMathematical","v-mathematical":"vMathematical",vocab:"vocab",widths:"widths",wordspacing:"wordSpacing","word-spacing":"wordSpacing",writingmode:"writingMode","writing-mode":"writingMode",x1:"x1",x2:"x2",x:"x",xchannelselector:"xChannelSelector",xheight:"xHeight","x-height":"xHeight",xlinkactuate:"xlinkActuate","xlink:actuate":"xlinkActuate",xlinkarcrole:"xlinkArcrole","xlink:arcrole":"xlinkArcrole",xlinkhref:"xlinkHref","xlink:href":"xlinkHref",xlinkrole:"xlinkRole","xlink:role":"xlinkRole",xlinkshow:"xlinkShow","xlink:show":"xlinkShow",xlinktitle:"xlinkTitle","xlink:title":"xlinkTitle",xlinktype:"xlinkType","xlink:type":"xlinkType",xmlbase:"xmlBase","xml:base":"xmlBase",xmllang:"xmlLang","xml:lang":"xmlLang",xmlns:"xmlns","xml:space":"xmlSpace",xmlnsxlink:"xmlnsXlink","xmlns:xlink":"xmlnsXlink",xmlspace:"xmlSpace",y1:"y1",y2:"y2",y:"y",ychannelselector:"yChannelSelector",z:"z",zoomandpan:"zoomAndPan"},Yx={"aria-current":0,"aria-description":0,"aria-details":0,"aria-disabled":0,"aria-hidden":0,"aria-invalid":0,"aria-keyshortcuts":0,"aria-label":0,"aria-roledescription":0,"aria-autocomplete":0,"aria-checked":0,"aria-expanded":0,"aria-haspopup":0,"aria-level":0,"aria-modal":0,"aria-multiline":0,"aria-multiselectable":0,"aria-orientation":0,"aria-placeholder":0,"aria-pressed":0,"aria-readonly":0,"aria-required":0,"aria-selected":0,"aria-sort":0,"aria-valuemax":0,"aria-valuemin":0,"aria-valuenow":0,"aria-valuetext":0,"aria-atomic":0,"aria-busy":0,"aria-live":0,"aria-relevant":0,"aria-dropeffect":0,"aria-grabbed":0,"aria-activedescendant":0,"aria-colcount":0,"aria-colindex":0,"aria-colspan":0,"aria-controls":0,"aria-describedby":0,"aria-errormessage":0,"aria-flowto":0,"aria-labelledby":0,"aria-owns":0,"aria-posinset":0,"aria-rowcount":0,"aria-rowindex":0,"aria-rowspan":0,"aria-setsize":0,"aria-braillelabel":0,"aria-brailleroledescription":0,"aria-colindextext":0,"aria-rowindextext":0},Is={},WA=RegExp("^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),FA=RegExp("^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Gx=!1,hi={},Xx=/^on./,eD=/^on[^A-Z]/,tD=RegExp("^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),iD=RegExp("^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),nD=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i,Cu=null,Ks=null,Ws=null,db=!1,da=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),fb=!1;if(da)try{var ku={};Object.defineProperty(ku,"passive",{get:function(){fb=!0}}),window.addEventListener("test",ku,ku),window.removeEventListener("test",ku,ku)}catch{fb=!1}var Mo=null,pb=null,df=null,$l={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ff=Ni($l),Ou=Ce({},$l,{view:0,detail:0}),aD=Ni(Ou),hb,mb,zu,pf=Ce({},Ou,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Jp,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==zu&&(zu&&e.type==="mousemove"?(hb=e.screenX-zu.screenX,mb=e.screenY-zu.screenY):mb=hb=0,zu=e),hb)},movementY:function(e){return"movementY"in e?e.movementY:mb}}),Qx=Ni(pf),oD=Ce({},pf,{dataTransfer:0}),lD=Ni(oD),sD=Ce({},Ou,{relatedTarget:0}),bb=Ni(sD),rD=Ce({},$l,{animationName:0,elapsedTime:0,pseudoElement:0}),uD=Ni(rD),cD=Ce({},$l,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),dD=Ni(cD),fD=Ce({},$l,{data:0}),Zx=Ni(fD),pD=Zx,hD={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},mD={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},bD={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"},gD=Ce({},Ou,{key:function(e){if(e.key){var t=hD[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Kc(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?mD[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Jp,charCode:function(e){return e.type==="keypress"?Kc(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Kc(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),yD=Ni(gD),vD=Ce({},pf,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Px=Ni(vD),xD=Ce({},Ou,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Jp}),ND=Ni(xD),SD=Ce({},$l,{propertyName:0,elapsedTime:0,pseudoElement:0}),ED=Ni(SD),_D=Ce({},pf,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),wD=Ni(_D),AD=Ce({},$l,{newState:0,oldState:0}),DD=Ni(AD),UD=[9,13,27,32],Jx=229,gb=da&&"CompositionEvent"in window,ju=null;da&&"documentMode"in document&&(ju=document.documentMode);var TD=da&&"TextEvent"in window&&!ju,Ix=da&&(!gb||ju&&8<ju&&11>=ju),Kx=32,Wx=String.fromCharCode(Kx),Fx=!1,Fs=!1,RD={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0},Vu=null,$u=null,eN=!1;da&&(eN=I_("input")&&(!document.documentMode||9<document.documentMode));var mi=typeof Object.is=="function"?Object.is:iw,CD=da&&"documentMode"in document&&11>=document.documentMode,er=null,yb=null,Mu=null,vb=!1,tr={animationend:Sl("Animation","AnimationEnd"),animationiteration:Sl("Animation","AnimationIteration"),animationstart:Sl("Animation","AnimationStart"),transitionrun:Sl("Transition","TransitionRun"),transitionstart:Sl("Transition","TransitionStart"),transitioncancel:Sl("Transition","TransitionCancel"),transitionend:Sl("Transition","TransitionEnd")},xb={},tN={};da&&(tN=document.createElement("div").style,"AnimationEvent"in window||(delete tr.animationend.animation,delete tr.animationiteration.animation,delete tr.animationstart.animation),"TransitionEvent"in window||delete tr.transitionend.transition);var iN=El("animationend"),nN=El("animationiteration"),aN=El("animationstart"),kD=El("transitionrun"),OD=El("transitionstart"),zD=El("transitioncancel"),oN=El("transitionend"),lN=new Map,Nb="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Nb.push("scrollEnd");var sN=0;if(typeof performance=="object"&&typeof performance.now=="function")var jD=performance,rN=function(){return jD.now()};else{var VD=Date;rN=function(){return VD.now()}}var Sb=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},$D="This object has been omitted by React in the console log to avoid sending too much data from the server. Try logging smaller or more specific objects.",hf=0,Eb=1,_b=2,wb=3,mf="– ",bf="+ ",uN="  ",rt=typeof console<"u"&&typeof console.timeStamp=="function"&&typeof performance<"u"&&typeof performance.measure=="function",an="Components ⚛",je="Scheduler ⚛",Me="Blocking",Bo=!1,Va={color:"primary",properties:null,tooltipText:"",track:an},Lo={start:-0,end:-0,detail:{devtools:Va}},MD=["Changed Props",""],cN="This component received deeply equal props. It might benefit from useMemo or the React Compiler in its owner.",BD=["Changed Props",cN],Bu=1,$a=2,on=[],ir=0,Ab=0,Ho={};Object.freeze(Ho);var ln=null,nr=null,he=0,LD=1,_e=2,ai=8,Dn=16,HD=32,dN=!1;try{var fN=Object.preventExtensions({})}catch{dN=!0}var Db=new WeakMap,ar=[],or=0,gf=null,Lu=0,sn=[],rn=0,Ml=null,Ma=1,Ba="",Ft=null,ut=null,Oe=!1,fa=!1,Hi=null,qo=null,un=!1,Ub=Error("Hydration Mismatch Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."),Tb=Lt(null),Rb=Lt(null),pN={},yf=null,lr=null,sr=!1,qD=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(i,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(i){return i()})}},YD=Dt.unstable_scheduleCallback,GD=Dt.unstable_NormalPriority,Ut={$$typeof:la,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0,_currentRenderer:null,_currentRenderer2:null},Tt=Dt.unstable_now,vf=console.createTask?console.createTask:function(){return null},Hu=1,xf=2,Yt=-0,Yo=-0,La=-0,Ha=null,bi=-1.1,Bl=-0,ht=-0,ue=-1.1,fe=-1.1,pt=null,vt=!1,Ll=-0,pa=-1.1,qu=null,Go=0,Cb=null,kb=null,Hl=-1.1,Yu=null,rr=-1.1,Nf=-1.1,qa=-0,Ya=-1.1,cn=-1.1,Ob=0,Gu=null,hN=null,mN=null,Xo=-1.1,ql=null,Qo=-1.1,Sf=-1.1,bN=-0,gN=-0,Ef=0,XD=null,yN=0,Xu=-1.1,_f=!1,wf=!1,Qu=null,zb=0,Yl=0,ur=null,vN=M.S;M.S=function(e,t){if(hS=qt(),typeof t=="object"&&t!==null&&typeof t.then=="function"){if(0>Ya&&0>cn){Ya=Tt();var i=Su(),n=Nu();(i!==Qo||n!==ql)&&(Qo=-1.1),Xo=i,ql=n}uw(e,t)}vN!==null&&vN(e,t)};var Gl=Lt(null),Un={recordUnsafeLifecycleWarnings:function(){},flushPendingUnsafeLifecycleWarnings:function(){},recordLegacyContextWarning:function(){},flushLegacyContextWarning:function(){},discardPendingWarnings:function(){}},Zu=[],Pu=[],Ju=[],Iu=[],Ku=[],Wu=[],Xl=new Set;Un.recordUnsafeLifecycleWarnings=function(e,t){Xl.has(e.type)||(typeof t.componentWillMount=="function"&&t.componentWillMount.__suppressDeprecationWarning!==!0&&Zu.push(e),e.mode&ai&&typeof t.UNSAFE_componentWillMount=="function"&&Pu.push(e),typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps.__suppressDeprecationWarning!==!0&&Ju.push(e),e.mode&ai&&typeof t.UNSAFE_componentWillReceiveProps=="function"&&Iu.push(e),typeof t.componentWillUpdate=="function"&&t.componentWillUpdate.__suppressDeprecationWarning!==!0&&Ku.push(e),e.mode&ai&&typeof t.UNSAFE_componentWillUpdate=="function"&&Wu.push(e))},Un.flushPendingUnsafeLifecycleWarnings=function(){var e=new Set;0<Zu.length&&(Zu.forEach(function(d){e.add(le(d)||"Component"),Xl.add(d.type)}),Zu=[]);var t=new Set;0<Pu.length&&(Pu.forEach(function(d){t.add(le(d)||"Component"),Xl.add(d.type)}),Pu=[]);var i=new Set;0<Ju.length&&(Ju.forEach(function(d){i.add(le(d)||"Component"),Xl.add(d.type)}),Ju=[]);var n=new Set;0<Iu.length&&(Iu.forEach(function(d){n.add(le(d)||"Component"),Xl.add(d.type)}),Iu=[]);var a=new Set;0<Ku.length&&(Ku.forEach(function(d){a.add(le(d)||"Component"),Xl.add(d.type)}),Ku=[]);var o=new Set;if(0<Wu.length&&(Wu.forEach(function(d){o.add(le(d)||"Component"),Xl.add(d.type)}),Wu=[]),0<t.size){var s=A(t);console.error(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`,s)}0<n.size&&(s=A(n),console.error(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state

Please update the following components: %s`,s)),0<o.size&&(s=A(o),console.error(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`,s)),0<e.size&&(s=A(e),console.warn(`componentWillMount has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,s)),0<i.size&&(s=A(i),console.warn(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,s)),0<a.size&&(s=A(a),console.warn(`componentWillUpdate has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,s))};var Af=new Map,xN=new Set;Un.recordLegacyContextWarning=function(e,t){for(var i=null,n=e;n!==null;)n.mode&ai&&(i=n),n=n.return;i===null?console.error("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue."):!xN.has(e.type)&&(n=Af.get(i),e.type.contextTypes!=null||e.type.childContextTypes!=null||t!==null&&typeof t.getChildContext=="function")&&(n===void 0&&(n=[],Af.set(i,n)),n.push(e))},Un.flushLegacyContextWarning=function(){Af.forEach(function(e){if(e.length!==0){var t=e[0],i=new Set;e.forEach(function(a){i.add(le(a)||"Component"),xN.add(a.type)});var n=A(i);F(t,function(){console.error(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://react.dev/link/legacy-context`,n)})}})},Un.discardPendingWarnings=function(){Zu=[],Pu=[],Ju=[],Iu=[],Ku=[],Wu=[],Af=new Map};var NN={react_stack_bottom_frame:function(e,t,i){var n=sa;sa=!0;try{return e(t,i)}finally{sa=n}}},jb=NN.react_stack_bottom_frame.bind(NN),SN={react_stack_bottom_frame:function(e){var t=sa;sa=!0;try{return e.render()}finally{sa=t}}},EN=SN.react_stack_bottom_frame.bind(SN),_N={react_stack_bottom_frame:function(e,t){try{t.componentDidMount()}catch(i){Pe(e,e.return,i)}}},Vb=_N.react_stack_bottom_frame.bind(_N),wN={react_stack_bottom_frame:function(e,t,i,n,a){try{t.componentDidUpdate(i,n,a)}catch(o){Pe(e,e.return,o)}}},AN=wN.react_stack_bottom_frame.bind(wN),DN={react_stack_bottom_frame:function(e,t){var i=t.stack;e.componentDidCatch(t.value,{componentStack:i!==null?i:""})}},QD=DN.react_stack_bottom_frame.bind(DN),UN={react_stack_bottom_frame:function(e,t,i){try{i.componentWillUnmount()}catch(n){Pe(e,t,n)}}},TN=UN.react_stack_bottom_frame.bind(UN),RN={react_stack_bottom_frame:function(e){var t=e.create;return e=e.inst,t=t(),e.destroy=t}},ZD=RN.react_stack_bottom_frame.bind(RN),CN={react_stack_bottom_frame:function(e,t,i){try{i()}catch(n){Pe(e,t,n)}}},PD=CN.react_stack_bottom_frame.bind(CN),kN={react_stack_bottom_frame:function(e){var t=e._init;return t(e._payload)}},JD=kN.react_stack_bottom_frame.bind(kN),cr=Error("Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`."),$b=Error("Suspense Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."),Df=Error("Suspense Exception: This is not a real error! It's an implementation detail of `useActionState` to interrupt the current render. You must either rethrow it immediately, or move the `useActionState` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary."),Uf={then:function(){console.error('Internal React error: A listener was unexpectedly attached to a "noop" thenable. This is a bug in React. Please file an issue.')}},Ql=null,Fu=!1,dr=null,ec=0,we=null,Mb,ON=Mb=!1,zN={},jN={},VN={};z=function(e,t,i){if(i!==null&&typeof i=="object"&&i._store&&(!i._store.validated&&i.key==null||i._store.validated===2)){if(typeof i._store!="object")throw Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");i._store.validated=1;var n=le(e),a=n||"null";if(!zN[a]){zN[a]=!0,i=i._owner,e=e._debugOwner;var o="";e&&typeof e.tag=="number"&&(a=le(e))&&(o=`

Check the render method of \``+a+"`."),o||n&&(o=`

Check the top-level render call using <`+n+">.");var s="";i!=null&&e!==i&&(n=null,typeof i.tag=="number"?n=le(i):typeof i.name=="string"&&(n=i.name),n&&(s=" It was passed a child from "+n+".")),F(t,function(){console.error('Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',o,s)})}}};var Zl=Uv(!0),$N=Uv(!1),MN=0,BN=1,LN=2,Bb=3,Zo=!1,HN=!1,Lb=null,Hb=!1,fr=Lt(null),Tf=Lt(0),qi=Lt(null),dn=null,pr=1,tc=2,Et=Lt(0),Rf=0,fn=1,gi=2,Yi=4,yi=8,hr,qN=new Set,YN=new Set,qb=new Set,GN=new Set,Ga=0,ge=null,it=null,Rt=null,Cf=!1,mr=!1,Pl=!1,kf=0,ic=0,Xa=null,ID=0,KD=25,V=null,pn=null,Qa=-1,nc=!1,ac={readContext:ft,use:Ro,useCallback:xt,useContext:xt,useEffect:xt,useImperativeHandle:xt,useLayoutEffect:xt,useInsertionEffect:xt,useMemo:xt,useReducer:xt,useRef:xt,useState:xt,useDebugValue:xt,useDeferredValue:xt,useTransition:xt,useSyncExternalStore:xt,useId:xt,useHostTransitionStatus:xt,useFormState:xt,useActionState:xt,useOptimistic:xt,useMemoCache:xt,useCacheRefresh:xt};ac.useEffectEvent=xt;var Yb=null,XN=null,Gb=null,QN=null,ha=null,Tn=null,Of=null;Yb={readContext:function(e){return ft(e)},use:Ro,useCallback:function(e,t){return V="useCallback",Re(),Cs(t),Lh(e,t)},useContext:function(e){return V="useContext",Re(),ft(e)},useEffect:function(e,t){return V="useEffect",Re(),Cs(t),wd(e,t)},useImperativeHandle:function(e,t,i){return V="useImperativeHandle",Re(),Cs(i),Bh(e,t,i)},useInsertionEffect:function(e,t){V="useInsertionEffect",Re(),Cs(t),Cl(4,gi,e,t)},useLayoutEffect:function(e,t){return V="useLayoutEffect",Re(),Cs(t),Mh(e,t)},useMemo:function(e,t){V="useMemo",Re(),Cs(t);var i=M.H;M.H=ha;try{return Hh(e,t)}finally{M.H=i}},useReducer:function(e,t,i){V="useReducer",Re();var n=M.H;M.H=ha;try{return Th(e,t,i)}finally{M.H=n}},useRef:function(e){return V="useRef",Re(),Vh(e)},useState:function(e){V="useState",Re();var t=M.H;M.H=ha;try{return Oh(e)}finally{M.H=t}},useDebugValue:function(){V="useDebugValue",Re()},useDeferredValue:function(e,t){return V="useDeferredValue",Re(),qh(e,t)},useTransition:function(){return V="useTransition",Re(),Xh()},useSyncExternalStore:function(e,t,i){return V="useSyncExternalStore",Re(),Ch(e,t,i)},useId:function(){return V="useId",Re(),Qh()},useFormState:function(e,t){return V="useFormState",Re(),xd(),Os(e,t)},useActionState:function(e,t){return V="useActionState",Re(),Os(e,t)},useOptimistic:function(e){return V="useOptimistic",Re(),zh(e)},useHostTransitionStatus:kl,useMemoCache:Rl,useCacheRefresh:function(){return V="useCacheRefresh",Re(),Zh()},useEffectEvent:function(e){return V="useEffectEvent",Re(),$h(e)}},XN={readContext:function(e){return ft(e)},use:Ro,useCallback:function(e,t){return V="useCallback",q(),Lh(e,t)},useContext:function(e){return V="useContext",q(),ft(e)},useEffect:function(e,t){return V="useEffect",q(),wd(e,t)},useImperativeHandle:function(e,t,i){return V="useImperativeHandle",q(),Bh(e,t,i)},useInsertionEffect:function(e,t){V="useInsertionEffect",q(),Cl(4,gi,e,t)},useLayoutEffect:function(e,t){return V="useLayoutEffect",q(),Mh(e,t)},useMemo:function(e,t){V="useMemo",q();var i=M.H;M.H=ha;try{return Hh(e,t)}finally{M.H=i}},useReducer:function(e,t,i){V="useReducer",q();var n=M.H;M.H=ha;try{return Th(e,t,i)}finally{M.H=n}},useRef:function(e){return V="useRef",q(),Vh(e)},useState:function(e){V="useState",q();var t=M.H;M.H=ha;try{return Oh(e)}finally{M.H=t}},useDebugValue:function(){V="useDebugValue",q()},useDeferredValue:function(e,t){return V="useDeferredValue",q(),qh(e,t)},useTransition:function(){return V="useTransition",q(),Xh()},useSyncExternalStore:function(e,t,i){return V="useSyncExternalStore",q(),Ch(e,t,i)},useId:function(){return V="useId",q(),Qh()},useActionState:function(e,t){return V="useActionState",q(),Os(e,t)},useFormState:function(e,t){return V="useFormState",q(),xd(),Os(e,t)},useOptimistic:function(e){return V="useOptimistic",q(),zh(e)},useHostTransitionStatus:kl,useMemoCache:Rl,useCacheRefresh:function(){return V="useCacheRefresh",q(),Zh()},useEffectEvent:function(e){return V="useEffectEvent",q(),$h(e)}},Gb={readContext:function(e){return ft(e)},use:Ro,useCallback:function(e,t){return V="useCallback",q(),Ud(e,t)},useContext:function(e){return V="useContext",q(),ft(e)},useEffect:function(e,t){V="useEffect",q(),Si(2048,yi,e,t)},useImperativeHandle:function(e,t,i){return V="useImperativeHandle",q(),Dd(e,t,i)},useInsertionEffect:function(e,t){return V="useInsertionEffect",q(),Si(4,gi,e,t)},useLayoutEffect:function(e,t){return V="useLayoutEffect",q(),Si(4,Yi,e,t)},useMemo:function(e,t){V="useMemo",q();var i=M.H;M.H=Tn;try{return Td(e,t)}finally{M.H=i}},useReducer:function(e,t,i){V="useReducer",q();var n=M.H;M.H=Tn;try{return ks(e,t,i)}finally{M.H=n}},useRef:function(){return V="useRef",q(),We().memoizedState},useState:function(){V="useState",q();var e=M.H;M.H=Tn;try{return ks(_n)}finally{M.H=e}},useDebugValue:function(){V="useDebugValue",q()},useDeferredValue:function(e,t){return V="useDeferredValue",q(),Iv(e,t)},useTransition:function(){return V="useTransition",q(),i0()},useSyncExternalStore:function(e,t,i){return V="useSyncExternalStore",q(),Sd(e,t,i)},useId:function(){return V="useId",q(),We().memoizedState},useFormState:function(e){return V="useFormState",q(),xd(),Ed(e)},useActionState:function(e){return V="useActionState",q(),Ed(e)},useOptimistic:function(e,t){return V="useOptimistic",q(),Lv(e,t)},useHostTransitionStatus:kl,useMemoCache:Rl,useCacheRefresh:function(){return V="useCacheRefresh",q(),We().memoizedState},useEffectEvent:function(e){return V="useEffectEvent",q(),Ad(e)}},QN={readContext:function(e){return ft(e)},use:Ro,useCallback:function(e,t){return V="useCallback",q(),Ud(e,t)},useContext:function(e){return V="useContext",q(),ft(e)},useEffect:function(e,t){V="useEffect",q(),Si(2048,yi,e,t)},useImperativeHandle:function(e,t,i){return V="useImperativeHandle",q(),Dd(e,t,i)},useInsertionEffect:function(e,t){return V="useInsertionEffect",q(),Si(4,gi,e,t)},useLayoutEffect:function(e,t){return V="useLayoutEffect",q(),Si(4,Yi,e,t)},useMemo:function(e,t){V="useMemo",q();var i=M.H;M.H=Of;try{return Td(e,t)}finally{M.H=i}},useReducer:function(e,t,i){V="useReducer",q();var n=M.H;M.H=Of;try{return uu(e,t,i)}finally{M.H=n}},useRef:function(){return V="useRef",q(),We().memoizedState},useState:function(){V="useState",q();var e=M.H;M.H=Of;try{return uu(_n)}finally{M.H=e}},useDebugValue:function(){V="useDebugValue",q()},useDeferredValue:function(e,t){return V="useDeferredValue",q(),Kv(e,t)},useTransition:function(){return V="useTransition",q(),n0()},useSyncExternalStore:function(e,t,i){return V="useSyncExternalStore",q(),Sd(e,t,i)},useId:function(){return V="useId",q(),We().memoizedState},useFormState:function(e){return V="useFormState",q(),xd(),_d(e)},useActionState:function(e){return V="useActionState",q(),_d(e)},useOptimistic:function(e,t){return V="useOptimistic",q(),qv(e,t)},useHostTransitionStatus:kl,useMemoCache:Rl,useCacheRefresh:function(){return V="useCacheRefresh",q(),We().memoizedState},useEffectEvent:function(e){return V="useEffectEvent",q(),Ad(e)}},ha={readContext:function(e){return N(),ft(e)},use:function(e){return v(),Ro(e)},useCallback:function(e,t){return V="useCallback",v(),Re(),Lh(e,t)},useContext:function(e){return V="useContext",v(),Re(),ft(e)},useEffect:function(e,t){return V="useEffect",v(),Re(),wd(e,t)},useImperativeHandle:function(e,t,i){return V="useImperativeHandle",v(),Re(),Bh(e,t,i)},useInsertionEffect:function(e,t){V="useInsertionEffect",v(),Re(),Cl(4,gi,e,t)},useLayoutEffect:function(e,t){return V="useLayoutEffect",v(),Re(),Mh(e,t)},useMemo:function(e,t){V="useMemo",v(),Re();var i=M.H;M.H=ha;try{return Hh(e,t)}finally{M.H=i}},useReducer:function(e,t,i){V="useReducer",v(),Re();var n=M.H;M.H=ha;try{return Th(e,t,i)}finally{M.H=n}},useRef:function(e){return V="useRef",v(),Re(),Vh(e)},useState:function(e){V="useState",v(),Re();var t=M.H;M.H=ha;try{return Oh(e)}finally{M.H=t}},useDebugValue:function(){V="useDebugValue",v(),Re()},useDeferredValue:function(e,t){return V="useDeferredValue",v(),Re(),qh(e,t)},useTransition:function(){return V="useTransition",v(),Re(),Xh()},useSyncExternalStore:function(e,t,i){return V="useSyncExternalStore",v(),Re(),Ch(e,t,i)},useId:function(){return V="useId",v(),Re(),Qh()},useFormState:function(e,t){return V="useFormState",v(),Re(),Os(e,t)},useActionState:function(e,t){return V="useActionState",v(),Re(),Os(e,t)},useOptimistic:function(e){return V="useOptimistic",v(),Re(),zh(e)},useMemoCache:function(e){return v(),Rl(e)},useHostTransitionStatus:kl,useCacheRefresh:function(){return V="useCacheRefresh",Re(),Zh()},useEffectEvent:function(e){return V="useEffectEvent",v(),Re(),$h(e)}},Tn={readContext:function(e){return N(),ft(e)},use:function(e){return v(),Ro(e)},useCallback:function(e,t){return V="useCallback",v(),q(),Ud(e,t)},useContext:function(e){return V="useContext",v(),q(),ft(e)},useEffect:function(e,t){V="useEffect",v(),q(),Si(2048,yi,e,t)},useImperativeHandle:function(e,t,i){return V="useImperativeHandle",v(),q(),Dd(e,t,i)},useInsertionEffect:function(e,t){return V="useInsertionEffect",v(),q(),Si(4,gi,e,t)},useLayoutEffect:function(e,t){return V="useLayoutEffect",v(),q(),Si(4,Yi,e,t)},useMemo:function(e,t){V="useMemo",v(),q();var i=M.H;M.H=Tn;try{return Td(e,t)}finally{M.H=i}},useReducer:function(e,t,i){V="useReducer",v(),q();var n=M.H;M.H=Tn;try{return ks(e,t,i)}finally{M.H=n}},useRef:function(){return V="useRef",v(),q(),We().memoizedState},useState:function(){V="useState",v(),q();var e=M.H;M.H=Tn;try{return ks(_n)}finally{M.H=e}},useDebugValue:function(){V="useDebugValue",v(),q()},useDeferredValue:function(e,t){return V="useDeferredValue",v(),q(),Iv(e,t)},useTransition:function(){return V="useTransition",v(),q(),i0()},useSyncExternalStore:function(e,t,i){return V="useSyncExternalStore",v(),q(),Sd(e,t,i)},useId:function(){return V="useId",v(),q(),We().memoizedState},useFormState:function(e){return V="useFormState",v(),q(),Ed(e)},useActionState:function(e){return V="useActionState",v(),q(),Ed(e)},useOptimistic:function(e,t){return V="useOptimistic",v(),q(),Lv(e,t)},useMemoCache:function(e){return v(),Rl(e)},useHostTransitionStatus:kl,useCacheRefresh:function(){return V="useCacheRefresh",q(),We().memoizedState},useEffectEvent:function(e){return V="useEffectEvent",v(),q(),Ad(e)}},Of={readContext:function(e){return N(),ft(e)},use:function(e){return v(),Ro(e)},useCallback:function(e,t){return V="useCallback",v(),q(),Ud(e,t)},useContext:function(e){return V="useContext",v(),q(),ft(e)},useEffect:function(e,t){V="useEffect",v(),q(),Si(2048,yi,e,t)},useImperativeHandle:function(e,t,i){return V="useImperativeHandle",v(),q(),Dd(e,t,i)},useInsertionEffect:function(e,t){return V="useInsertionEffect",v(),q(),Si(4,gi,e,t)},useLayoutEffect:function(e,t){return V="useLayoutEffect",v(),q(),Si(4,Yi,e,t)},useMemo:function(e,t){V="useMemo",v(),q();var i=M.H;M.H=Tn;try{return Td(e,t)}finally{M.H=i}},useReducer:function(e,t,i){V="useReducer",v(),q();var n=M.H;M.H=Tn;try{return uu(e,t,i)}finally{M.H=n}},useRef:function(){return V="useRef",v(),q(),We().memoizedState},useState:function(){V="useState",v(),q();var e=M.H;M.H=Tn;try{return uu(_n)}finally{M.H=e}},useDebugValue:function(){V="useDebugValue",v(),q()},useDeferredValue:function(e,t){return V="useDeferredValue",v(),q(),Kv(e,t)},useTransition:function(){return V="useTransition",v(),q(),n0()},useSyncExternalStore:function(e,t,i){return V="useSyncExternalStore",v(),q(),Sd(e,t,i)},useId:function(){return V="useId",v(),q(),We().memoizedState},useFormState:function(e){return V="useFormState",v(),q(),_d(e)},useActionState:function(e){return V="useActionState",v(),q(),_d(e)},useOptimistic:function(e,t){return V="useOptimistic",v(),q(),qv(e,t)},useMemoCache:function(e){return v(),Rl(e)},useHostTransitionStatus:kl,useCacheRefresh:function(){return V="useCacheRefresh",q(),We().memoizedState},useEffectEvent:function(e){return V="useEffectEvent",v(),q(),Ad(e)}};var ZN={},PN=new Set,JN=new Set,IN=new Set,KN=new Set,WN=new Set,FN=new Set,eS=new Set,tS=new Set,iS=new Set,nS=new Set;Object.freeze(ZN);var Xb={enqueueSetState:function(e,t,i){e=e._reactInternals;var n=$i(e),a=Ao(n);a.payload=t,i!=null&&(Jh(i),a.callback=i),t=Do(e,a,n),t!==null&&(Qn(n,"this.setState()",e),yt(t,e,n),ou(t,e,n))},enqueueReplaceState:function(e,t,i){e=e._reactInternals;var n=$i(e),a=Ao(n);a.tag=BN,a.payload=t,i!=null&&(Jh(i),a.callback=i),t=Do(e,a,n),t!==null&&(Qn(n,"this.replaceState()",e),yt(t,e,n),ou(t,e,n))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var i=$i(e),n=Ao(i);n.tag=LN,t!=null&&(Jh(t),n.callback=t),t=Do(e,n,i),t!==null&&(Qn(i,"this.forceUpdate()",e),yt(t,e,i),ou(t,e,i))}},br=null,Qb=null,Zb=Error("This is not a real error. It's an implementation detail of React's selective hydration feature. If this leaks into userspace, it's a bug in React. Please file an issue."),Ct=!1,aS={},oS={},lS={},sS={},gr=!1,rS={},zf={},Pb={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null},uS=!1,cS=null;cS=new Set;var Za=!1,kt=!1,Jb=!1,dS=typeof WeakSet=="function"?WeakSet:Set,Gt=null,yr=null,vr=null,Ot=null,wi=!1,Rn=null,Mt=!1,oc=8192,WD={getCacheForType:function(e){var t=ft(Ut),i=t.data.get(e);return i===void 0&&(i=e(),t.data.set(e,i)),i},cacheSignal:function(){return ft(Ut).controller.signal},getOwner:function(){return Li}};if(typeof Symbol=="function"&&Symbol.for){var lc=Symbol.for;lc("selector.component"),lc("selector.has_pseudo_class"),lc("selector.role"),lc("selector.test_id"),lc("selector.text")}var FD=[],eU=typeof WeakMap=="function"?WeakMap:Map,Xt=0,Bt=2,Gi=4,Pa=0,sc=1,Jl=2,jf=3,Po=4,Vf=6,fS=5,Le=Xt,nt=null,Ue=null,Ae=0,Ai=0,$f=1,Il=2,rc=3,pS=4,Ib=5,uc=6,Mf=7,Kb=8,Kl=9,Fe=Ai,Xi=null,Jo=!1,xr=!1,Wb=!1,ma=0,mt=Pa,Io=0,Ko=0,Fb=0,Di=0,Wl=0,cc=null,vi=null,Bf=!1,Lf=0,hS=0,mS=300,Hf=1/0,bS=500,dc=null,Nt=null,Wo=null,qf=0,eg=1,tg=2,gS=3,Fo=0,yS=1,vS=2,xS=3,NS=4,Yf=5,zt=0,el=null,Nr=null,Cn=0,ig=0,ng=-0,ag=null,SS=null,ES=null,kn=qf,_S=null,tU=50,fc=0,og=null,lg=!1,Gf=!1,iU=50,Fl=0,pc=null,Sr=!1,Xf=null,wS=!1,AS=new Set,nU={},Qf=null,Er=null,sg=!1,rg=!1,Zf=!1,ug=!1,tl=0,cg={};(function(){for(var e=0;e<Nb.length;e++){var t=Nb[e],i=t.toLowerCase();t=t[0].toUpperCase()+t.slice(1),Sn(i,"on"+t)}Sn(iN,"onAnimationEnd"),Sn(nN,"onAnimationIteration"),Sn(aN,"onAnimationStart"),Sn("dblclick","onDoubleClick"),Sn("focusin","onFocus"),Sn("focusout","onBlur"),Sn(kD,"onTransitionRun"),Sn(OD,"onTransitionStart"),Sn(zD,"onTransitionCancel"),Sn(oN,"onTransitionEnd")})(),Se("onMouseEnter",["mouseout","mouseover"]),Se("onMouseLeave",["mouseout","mouseover"]),Se("onPointerEnter",["pointerout","pointerover"]),Se("onPointerLeave",["pointerout","pointerover"]),Be("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Be("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Be("onBeforeInput",["compositionend","keypress","textInput","paste"]),Be("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Be("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Be("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var hc="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),dg=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(hc)),Pf="_reactListening"+Math.random().toString(36).slice(2),DS=!1,US=!1,Jf=!1,TS=!1,If=!1,Kf=!1,RS=!1,Wf={},aU=/\r\n?/g,oU=/\u0000|\uFFFD/g,es="http://www.w3.org/1999/xlink",fg="http://www.w3.org/XML/1998/namespace",lU="javascript:throw new Error('React form unexpectedly submitted.')",sU="suppressHydrationWarning",ts="&",Ff="/&",mc="$",bc="/$",il="$?",is="$~",_r="$!",rU="html",uU="body",cU="head",pg="F!",CS="F",kS="loading",dU="style",Ja=0,wr=1,ep=2,hg=null,mg=null,OS={dialog:!0,webview:!0},bg=null,gc=void 0,zS=typeof setTimeout=="function"?setTimeout:void 0,fU=typeof clearTimeout=="function"?clearTimeout:void 0,ns=-1,jS=typeof Promise=="function"?Promise:void 0,pU=typeof queueMicrotask=="function"?queueMicrotask:typeof jS<"u"?function(e){return jS.resolve(null).then(e).catch(Jw)}:zS,gg=null,as=0,yc=1,VS=2,$S=3,hn=4,mn=new Map,MS=new Set,Ia=Je.d;Je.d={f:function(){var e=Ia.f(),t=Ms();return e||t},r:function(e){var t=X(e);t!==null&&t.tag===5&&t.type==="form"?t0(t):Ia.r(e)},D:function(e){Ia.D(e),P1("dns-prefetch",e,null)},C:function(e,t){Ia.C(e,t),P1("preconnect",e,t)},L:function(e,t,i){Ia.L(e,t,i);var n=Ar;if(n&&e&&t){var a='link[rel="preload"][as="'+en(t)+'"]';t==="image"&&i&&i.imageSrcSet?(a+='[imagesrcset="'+en(i.imageSrcSet)+'"]',typeof i.imageSizes=="string"&&(a+='[imagesizes="'+en(i.imageSizes)+'"]')):a+='[href="'+en(e)+'"]';var o=a;switch(t){case"style":o=Hs(e);break;case"script":o=qs(e)}mn.has(o)||(e=Ce({rel:"preload",href:t==="image"&&i&&i.imageSrcSet?void 0:e,as:t},i),mn.set(o,e),n.querySelector(a)!==null||t==="style"&&n.querySelector(_u(o))||t==="script"&&n.querySelector(wu(o))||(t=n.createElement("link"),Kt(t,"link",e),se(t),n.head.appendChild(t)))}},m:function(e,t){Ia.m(e,t);var i=Ar;if(i&&e){var n=t&&typeof t.as=="string"?t.as:"script",a='link[rel="modulepreload"][as="'+en(n)+'"][href="'+en(e)+'"]',o=a;switch(n){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":o=qs(e)}if(!mn.has(o)&&(e=Ce({rel:"modulepreload",href:e},t),mn.set(o,e),i.querySelector(a)===null)){switch(n){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(i.querySelector(wu(o)))return}n=i.createElement("link"),Kt(n,"link",e),se(n),i.head.appendChild(n)}}},X:function(e,t){Ia.X(e,t);var i=Ar;if(i&&e){var n=Ne(i).hoistableScripts,a=qs(e),o=n.get(a);o||(o=i.querySelector(wu(a)),o||(e=Ce({src:e,async:!0},t),(t=mn.get(a))&&Bm(e,t),o=i.createElement("script"),se(o),Kt(o,"link",e),i.head.appendChild(o)),o={type:"script",instance:o,count:1,state:null},n.set(a,o))}},S:function(e,t,i){Ia.S(e,t,i);var n=Ar;if(n&&e){var a=Ne(n).hoistableStyles,o=Hs(e);t=t||"default";var s=a.get(o);if(!s){var d={loading:as,preload:null};if(s=n.querySelector(_u(o)))d.loading=yc|hn;else{e=Ce({rel:"stylesheet",href:e,"data-precedence":t},i),(i=mn.get(o))&&Mm(e,i);var m=s=n.createElement("link");se(m),Kt(m,"link",e),m._p=new Promise(function(g,U){m.onload=g,m.onerror=U}),m.addEventListener("load",function(){d.loading|=yc}),m.addEventListener("error",function(){d.loading|=VS}),d.loading|=hn,Pd(s,t,n)}s={type:"stylesheet",instance:s,count:1,state:d},a.set(o,s)}}},M:function(e,t){Ia.M(e,t);var i=Ar;if(i&&e){var n=Ne(i).hoistableScripts,a=qs(e),o=n.get(a);o||(o=i.querySelector(wu(a)),o||(e=Ce({src:e,async:!0,type:"module"},t),(t=mn.get(a))&&Bm(e,t),o=i.createElement("script"),se(o),Kt(o,"link",e),i.head.appendChild(o)),o={type:"script",instance:o,count:1,state:null},n.set(a,o))}}};var Ar=typeof document>"u"?null:document,tp=null,hU=6e4,mU=800,bU=500,yg=0,vg=null,ip=null,os=RA,vc={$$typeof:la,Provider:null,Consumer:null,_currentValue:os,_currentValue2:os,_threadCount:0},BS="%c%s%c",LS="background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px",HS="",np=" ",gU=Function.prototype.bind,qS=!1,YS=null,GS=null,XS=null,QS=null,ZS=null,PS=null,JS=null,IS=null,KS=null,WS=null;YS=function(e,t,i,n){t=p(e,t),t!==null&&(i=l(t.memoizedState,i,0,n),t.memoizedState=i,t.baseState=i,e.memoizedProps=Ce({},e.memoizedProps),i=ii(e,2),i!==null&&yt(i,e,2))},GS=function(e,t,i){t=p(e,t),t!==null&&(i=u(t.memoizedState,i,0),t.memoizedState=i,t.baseState=i,e.memoizedProps=Ce({},e.memoizedProps),i=ii(e,2),i!==null&&yt(i,e,2))},XS=function(e,t,i,n){t=p(e,t),t!==null&&(i=r(t.memoizedState,i,n),t.memoizedState=i,t.baseState=i,e.memoizedProps=Ce({},e.memoizedProps),i=ii(e,2),i!==null&&yt(i,e,2))},QS=function(e,t,i){e.pendingProps=l(e.memoizedProps,t,0,i),e.alternate&&(e.alternate.pendingProps=e.pendingProps),t=ii(e,2),t!==null&&yt(t,e,2)},ZS=function(e,t){e.pendingProps=u(e.memoizedProps,t,0),e.alternate&&(e.alternate.pendingProps=e.pendingProps),t=ii(e,2),t!==null&&yt(t,e,2)},PS=function(e,t,i){e.pendingProps=r(e.memoizedProps,t,i),e.alternate&&(e.alternate.pendingProps=e.pendingProps),t=ii(e,2),t!==null&&yt(t,e,2)},JS=function(e){var t=ii(e,2);t!==null&&yt(t,e,2)},IS=function(e){var t=Yr(),i=ii(e,t);i!==null&&yt(i,e,t)},KS=function(e){b=e},WS=function(e){f=e};var ap=!0,op=null,xg=!1,nl=null,al=null,ol=null,xc=new Map,Nc=new Map,ll=[],yU="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" "),lp=null;if(Fd.prototype.render=Xm.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error("Cannot update an unmounted root.");var i=arguments;typeof i[1]=="function"?console.error("does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect()."):J(i[1])?console.error("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root."):typeof i[1]<"u"&&console.error("You passed a second argument to root.render(...) but it only accepts one argument."),i=e;var n=t.current,a=$i(n);Lm(n,a,i,t,null,null)},Fd.prototype.unmount=Xm.prototype.unmount=function(){var e=arguments;if(typeof e[0]=="function"&&console.error("does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect()."),e=this._internalRoot,e!==null){this._internalRoot=null;var t=e.containerInfo;(Le&(Bt|Gi))!==Xt&&console.error("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."),Lm(e.current,2,null,e,null,null),Ms(),t[$o]=null}},Fd.prototype.unstable_scheduleHydration=function(e){if(e){var t=No();e={blockedOn:null,target:e,priority:t};for(var i=0;i<ll.length&&t!==0&&t<ll[i].priority;i++);ll.splice(i,0,e),i===0&&rx(e)}},(function(){var e=Qm.version;if(e!=="19.2.4")throw Error(`Incompatible React versions: The "react" and "react-dom" packages must have the exact same version. Instead got:
  - react:      `+(e+`
  - react-dom:  19.2.4
Learn more: https://react.dev/warnings/version-mismatch`))})(),typeof Map=="function"&&Map.prototype!=null&&typeof Map.prototype.forEach=="function"&&typeof Set=="function"&&Set.prototype!=null&&typeof Set.prototype.clear=="function"&&typeof Set.prototype.forEach=="function"||console.error("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://react.dev/link/react-polyfills"),Je.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error("Unable to find node on an unmounted component."):(e=Object.keys(e).join(","),Error("Argument appears to not be a ReactComponent. Keys: "+e));return e=St(t),e=e!==null?Ie(e):null,e=e===null?null:e.stateNode,e},!(function(){var e={bundleType:1,version:"19.2.4",rendererPackageName:"react-dom",currentDispatcherRef:M,reconcilerVersion:"19.2.4"};return e.overrideHookState=YS,e.overrideHookStateDeletePath=GS,e.overrideHookStateRenamePath=XS,e.overrideProps=QS,e.overridePropsDeletePath=ZS,e.overridePropsRenamePath=PS,e.scheduleUpdate=JS,e.scheduleRetry=IS,e.setErrorHandler=KS,e.setSuspenseHandler=WS,e.scheduleRefresh=B,e.scheduleRoot=C,e.setRefreshHandler=G,e.getCurrentFiber=NA,Bp(e)})()&&da&&window.top===window.self&&(-1<navigator.userAgent.indexOf("Chrome")&&navigator.userAgent.indexOf("Edge")===-1||-1<navigator.userAgent.indexOf("Firefox"))){var FS=window.location.protocol;/^(https?|file):$/.test(FS)&&console.info("%cDownload the React DevTools for a better development experience: https://react.dev/link/react-devtools"+(FS==="file:"?`
You might need to use a local HTTP server (instead of file://): https://react.dev/link/react-devtools-faq`:""),"font-weight:bold")}Sc.createRoot=function(e,t){if(!J(e))throw Error("Target container is not a DOM element.");fx(e);var i=!1,n="",a=u0,o=c0,s=d0;return t!=null&&(t.hydrate?console.warn("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead."):typeof t=="object"&&t!==null&&t.$$typeof===oa&&console.error(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`),t.unstable_strictMode===!0&&(i=!0),t.identifierPrefix!==void 0&&(n=t.identifierPrefix),t.onUncaughtError!==void 0&&(a=t.onUncaughtError),t.onCaughtError!==void 0&&(o=t.onCaughtError),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),t=tx(e,1,!1,null,null,i,n,null,a,o,s,dx),e[$o]=t.current,Am(e),new Xm(t)},Sc.hydrateRoot=function(e,t,i){if(!J(e))throw Error("Target container is not a DOM element.");fx(e),t===void 0&&console.error("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");var n=!1,a="",o=u0,s=c0,d=d0,m=null;return i!=null&&(i.unstable_strictMode===!0&&(n=!0),i.identifierPrefix!==void 0&&(a=i.identifierPrefix),i.onUncaughtError!==void 0&&(o=i.onUncaughtError),i.onCaughtError!==void 0&&(s=i.onCaughtError),i.onRecoverableError!==void 0&&(d=i.onRecoverableError),i.formState!==void 0&&(m=i.formState)),t=tx(e,1,!0,t,i??null,n,a,m,o,s,d,dx),t.context=ix(null),i=t.current,n=$i(i),n=xo(n),a=Ao(n),a.callback=null,Do(i,a,n),Qn(n,"hydrateRoot()",null),i=n,t.current.lanes=i,vo(t,i),na(t),e[$o]=t.current,Am(e),new Fd(t)},Sc.version="19.2.4",typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error())})(),Sc}var uE;function TU(){return uE||(uE=1,Eg.exports=UU()),Eg.exports}var RU=TU();const CU=!1,fp=globalThis,iy=fp.ShadowRoot&&(fp.ShadyCSS===void 0||fp.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ny=Symbol(),cE=new WeakMap;class GE{constructor(l,r,c){if(this._$cssResult$=!0,c!==ny)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=l,this._strings=r}get styleSheet(){let l=this._styleSheet;const r=this._strings;if(iy&&l===void 0){const c=r!==void 0&&r.length===1;c&&(l=cE.get(r)),l===void 0&&((this._styleSheet=l=new CSSStyleSheet).replaceSync(this.cssText),c&&cE.set(r,l))}return l}toString(){return this.cssText}}const kU=p=>{if(p._$cssResult$===!0)return p.cssText;if(typeof p=="number")return p;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${p}. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)},OU=p=>new GE(typeof p=="string"?p:String(p),void 0,ny),ee=(p,...l)=>{const r=p.length===1?p[0]:l.reduce((c,u,f)=>c+kU(u)+p[f+1],p[0]);return new GE(r,p,ny)},zU=(p,l)=>{if(iy)p.adoptedStyleSheets=l.map(r=>r instanceof CSSStyleSheet?r:r.styleSheet);else for(const r of l){const c=document.createElement("style"),u=fp.litNonce;u!==void 0&&c.setAttribute("nonce",u),c.textContent=r.cssText,p.appendChild(c)}},jU=p=>{let l="";for(const r of p.cssRules)l+=r.cssText;return OU(l)},dE=iy||CU?p=>p:p=>p instanceof CSSStyleSheet?jU(p):p;const{is:VU,defineProperty:$U,getOwnPropertyDescriptor:fE,getOwnPropertyNames:MU,getOwnPropertySymbols:BU,getPrototypeOf:pE}=Object,gn=globalThis;let zn;const hE=gn.trustedTypes,LU=hE?hE.emptyScript:"",XE=gn.reactiveElementPolyfillSupportDevMode;gn.litIssuedWarnings??=new Set,zn=(p,l)=>{l+=` See https://lit.dev/msg/${p} for more information.`,!gn.litIssuedWarnings.has(l)&&!gn.litIssuedWarnings.has(p)&&(console.warn(l),gn.litIssuedWarnings.add(l))},queueMicrotask(()=>{zn("dev-mode","Lit is in dev mode. Not recommended for production!"),gn.ShadyDOM?.inUse&&XE===void 0&&zn("polyfill-support-missing","Shadow DOM is being polyfilled via `ShadyDOM` but the `polyfill-support` module has not been loaded.")});const HU=p=>{gn.emitLitDebugLogEvents&&gn.dispatchEvent(new CustomEvent("lit-debug",{detail:p}))},Rr=(p,l)=>p,yp={toAttribute(p,l){switch(l){case Boolean:p=p?LU:null;break;case Object:case Array:p=p==null?p:JSON.stringify(p);break}return p},fromAttribute(p,l){let r=p;switch(l){case Boolean:r=p!==null;break;case Number:r=p===null?null:Number(p);break;case Object:case Array:try{r=JSON.parse(p)}catch{r=null}break}return r}},ay=(p,l)=>!VU(p,l),mE={attribute:!0,type:String,converter:yp,reflect:!1,useDefault:!1,hasChanged:ay};Symbol.metadata??=Symbol("metadata");gn.litPropertyMetadata??=new WeakMap;class ao extends HTMLElement{static addInitializer(l){this.__prepare(),(this._initializers??=[]).push(l)}static get observedAttributes(){return this.finalize(),this.__attributeToPropertyMap&&[...this.__attributeToPropertyMap.keys()]}static createProperty(l,r=mE){if(r.state&&(r.attribute=!1),this.__prepare(),this.prototype.hasOwnProperty(l)&&(r=Object.create(r),r.wrapped=!0),this.elementProperties.set(l,r),!r.noAccessor){const c=Symbol.for(`${String(l)} (@property() cache)`),u=this.getPropertyDescriptor(l,c,r);u!==void 0&&$U(this.prototype,l,u)}}static getPropertyDescriptor(l,r,c){const{get:u,set:f}=fE(this.prototype,l)??{get(){return this[r]},set(b){this[r]=b}};if(u==null){if("value"in(fE(this.prototype,l)??{}))throw new Error(`Field ${JSON.stringify(String(l))} on ${this.name} was declared as a reactive property but it's actually declared as a value on the prototype. Usually this is due to using @property or @state on a method.`);zn("reactive-property-without-getter",`Field ${JSON.stringify(String(l))} on ${this.name} was declared as a reactive property but it does not have a getter. This will be an error in a future version of Lit.`)}return{get:u,set(b){const v=u?.call(this);f?.call(this,b),this.requestUpdate(l,v,c)},configurable:!0,enumerable:!0}}static getPropertyOptions(l){return this.elementProperties.get(l)??mE}static __prepare(){if(this.hasOwnProperty(Rr("elementProperties")))return;const l=pE(this);l.finalize(),l._initializers!==void 0&&(this._initializers=[...l._initializers]),this.elementProperties=new Map(l.elementProperties)}static finalize(){if(this.hasOwnProperty(Rr("finalized")))return;if(this.finalized=!0,this.__prepare(),this.hasOwnProperty(Rr("properties"))){const r=this.properties,c=[...MU(r),...BU(r)];for(const u of c)this.createProperty(u,r[u])}const l=this[Symbol.metadata];if(l!==null){const r=litPropertyMetadata.get(l);if(r!==void 0)for(const[c,u]of r)this.elementProperties.set(c,u)}this.__attributeToPropertyMap=new Map;for(const[r,c]of this.elementProperties){const u=this.__attributeNameForProperty(r,c);u!==void 0&&this.__attributeToPropertyMap.set(u,r)}this.elementStyles=this.finalizeStyles(this.styles),this.hasOwnProperty("createProperty")&&zn("no-override-create-property","Overriding ReactiveElement.createProperty() is deprecated. The override will not be called with standard decorators"),this.hasOwnProperty("getPropertyDescriptor")&&zn("no-override-get-property-descriptor","Overriding ReactiveElement.getPropertyDescriptor() is deprecated. The override will not be called with standard decorators")}static finalizeStyles(l){const r=[];if(Array.isArray(l)){const c=new Set(l.flat(1/0).reverse());for(const u of c)r.unshift(dE(u))}else l!==void 0&&r.push(dE(l));return r}static __attributeNameForProperty(l,r){const c=r.attribute;return c===!1?void 0:typeof c=="string"?c:typeof l=="string"?l.toLowerCase():void 0}constructor(){super(),this.__instanceProperties=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.__reflectingProperty=null,this.__initialize()}__initialize(){this.__updatePromise=new Promise(l=>this.enableUpdating=l),this._$changedProperties=new Map,this.__saveInstanceProperties(),this.requestUpdate(),this.constructor._initializers?.forEach(l=>l(this))}addController(l){(this.__controllers??=new Set).add(l),this.renderRoot!==void 0&&this.isConnected&&l.hostConnected?.()}removeController(l){this.__controllers?.delete(l)}__saveInstanceProperties(){const l=new Map,r=this.constructor.elementProperties;for(const c of r.keys())this.hasOwnProperty(c)&&(l.set(c,this[c]),delete this[c]);l.size>0&&(this.__instanceProperties=l)}createRenderRoot(){const l=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return zU(l,this.constructor.elementStyles),l}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.__controllers?.forEach(l=>l.hostConnected?.())}enableUpdating(l){}disconnectedCallback(){this.__controllers?.forEach(l=>l.hostDisconnected?.())}attributeChangedCallback(l,r,c){this._$attributeToProperty(l,c)}__propertyToAttribute(l,r){const u=this.constructor.elementProperties.get(l),f=this.constructor.__attributeNameForProperty(l,u);if(f!==void 0&&u.reflect===!0){const v=(u.converter?.toAttribute!==void 0?u.converter:yp).toAttribute(r,u.type);this.constructor.enabledWarnings.includes("migration")&&v===void 0&&zn("undefined-attribute-value",`The attribute value for the ${l} property is undefined on element ${this.localName}. The attribute will be removed, but in the previous version of \`ReactiveElement\`, the attribute would not have changed.`),this.__reflectingProperty=l,v==null?this.removeAttribute(f):this.setAttribute(f,v),this.__reflectingProperty=null}}_$attributeToProperty(l,r){const c=this.constructor,u=c.__attributeToPropertyMap.get(l);if(u!==void 0&&this.__reflectingProperty!==u){const f=c.getPropertyOptions(u),b=typeof f.converter=="function"?{fromAttribute:f.converter}:f.converter?.fromAttribute!==void 0?f.converter:yp;this.__reflectingProperty=u;const v=b.fromAttribute(r,f.type);this[u]=v??this.__defaultValues?.get(u)??v,this.__reflectingProperty=null}}requestUpdate(l,r,c,u=!1,f){if(l!==void 0){l instanceof Event&&zn("","The requestUpdate() method was called with an Event as the property name. This is probably a mistake caused by binding this.requestUpdate as an event listener. Instead bind a function that will call it with no arguments: () => this.requestUpdate()");const b=this.constructor;if(u===!1&&(f=this[l]),c??=b.getPropertyOptions(l),(c.hasChanged??ay)(f,r)||c.useDefault&&c.reflect&&f===this.__defaultValues?.get(l)&&!this.hasAttribute(b.__attributeNameForProperty(l,c)))this._$changeProperty(l,r,c);else return}this.isUpdatePending===!1&&(this.__updatePromise=this.__enqueueUpdate())}_$changeProperty(l,r,{useDefault:c,reflect:u,wrapped:f},b){c&&!(this.__defaultValues??=new Map).has(l)&&(this.__defaultValues.set(l,b??r??this[l]),f!==!0||b!==void 0)||(this._$changedProperties.has(l)||(!this.hasUpdated&&!c&&(r=void 0),this._$changedProperties.set(l,r)),u===!0&&this.__reflectingProperty!==l&&(this.__reflectingProperties??=new Set).add(l))}async __enqueueUpdate(){this.isUpdatePending=!0;try{await this.__updatePromise}catch(r){Promise.reject(r)}const l=this.scheduleUpdate();return l!=null&&await l,!this.isUpdatePending}scheduleUpdate(){const l=this.performUpdate();return this.constructor.enabledWarnings.includes("async-perform-update")&&typeof l?.then=="function"&&zn("async-perform-update",`Element ${this.localName} returned a Promise from performUpdate(). This behavior is deprecated and will be removed in a future version of ReactiveElement.`),l}performUpdate(){if(!this.isUpdatePending)return;if(HU?.({kind:"update"}),!this.hasUpdated){this.renderRoot??=this.createRenderRoot();{const f=[...this.constructor.elementProperties.keys()].filter(b=>this.hasOwnProperty(b)&&b in pE(this));if(f.length)throw new Error(`The following properties on element ${this.localName} will not trigger updates as expected because they are set using class fields: ${f.join(", ")}. Native class fields and some compiled output will overwrite accessors used for detecting changes. See https://lit.dev/msg/class-field-shadowing for more information.`)}if(this.__instanceProperties){for(const[u,f]of this.__instanceProperties)this[u]=f;this.__instanceProperties=void 0}const c=this.constructor.elementProperties;if(c.size>0)for(const[u,f]of c){const{wrapped:b}=f,v=this[u];b===!0&&!this._$changedProperties.has(u)&&v!==void 0&&this._$changeProperty(u,void 0,f,v)}}let l=!1;const r=this._$changedProperties;try{l=this.shouldUpdate(r),l?(this.willUpdate(r),this.__controllers?.forEach(c=>c.hostUpdate?.()),this.update(r)):this.__markUpdated()}catch(c){throw l=!1,this.__markUpdated(),c}l&&this._$didUpdate(r)}willUpdate(l){}_$didUpdate(l){this.__controllers?.forEach(r=>r.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(l)),this.updated(l),this.isUpdatePending&&this.constructor.enabledWarnings.includes("change-in-update")&&zn("change-in-update",`Element ${this.localName} scheduled an update (generally because a property was set) after an update completed, causing a new update to be scheduled. This is inefficient and should be avoided unless the next update can only be scheduled as a side effect of the previous update.`)}__markUpdated(){this._$changedProperties=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.__updatePromise}shouldUpdate(l){return!0}update(l){this.__reflectingProperties&&=this.__reflectingProperties.forEach(r=>this.__propertyToAttribute(r,this[r])),this.__markUpdated()}updated(l){}firstUpdated(l){}}ao.elementStyles=[];ao.shadowRootOptions={mode:"open"};ao[Rr("elementProperties")]=new Map;ao[Rr("finalized")]=new Map;XE?.({ReactiveElement:ao});{ao.enabledWarnings=["change-in-update","async-perform-update"];const p=function(l){l.hasOwnProperty(Rr("enabledWarnings"))||(l.enabledWarnings=l.enabledWarnings.slice())};ao.enableWarning=function(l){p(this),this.enabledWarnings.includes(l)||this.enabledWarnings.push(l)},ao.disableWarning=function(l){p(this);const r=this.enabledWarnings.indexOf(l);r>=0&&this.enabledWarnings.splice(r,1)}}(gn.reactiveElementVersions??=[]).push("2.1.2");gn.reactiveElementVersions.length>1&&queueMicrotask(()=>{zn("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.")});const Zi=globalThis,Xe=p=>{Zi.emitLitDebugLogEvents&&Zi.dispatchEvent(new CustomEvent("lit-debug",{detail:p}))};let qU=0,Dc;Zi.litIssuedWarnings??=new Set,Dc=(p,l)=>{l+=p?` See https://lit.dev/msg/${p} for more information.`:"",!Zi.litIssuedWarnings.has(l)&&!Zi.litIssuedWarnings.has(p)&&(console.warn(l),Zi.litIssuedWarnings.add(l))},queueMicrotask(()=>{Dc("dev-mode","Lit is in dev mode. Not recommended for production!")});const On=Zi.ShadyDOM?.inUse&&Zi.ShadyDOM?.noPatch===!0?Zi.ShadyDOM.wrap:p=>p,vp=Zi.trustedTypes,bE=vp?vp.createPolicy("lit-html",{createHTML:p=>p}):void 0,YU=p=>p,Cp=(p,l,r)=>YU,GU=p=>{if(ds!==Cp)throw new Error("Attempted to overwrite existing lit-html security policy. setSanitizeDOMValueFactory should be called at most once.");ds=p},XU=()=>{ds=Cp},zg=(p,l,r)=>ds(p,l,r),QE="$lit$",to=`lit$${Math.random().toFixed(9).slice(2)}$`,ZE="?"+to,QU=`<${ZE}>`,cs=document,Uc=()=>cs.createComment(""),Tc=p=>p===null||typeof p!="object"&&typeof p!="function",oy=Array.isArray,ZU=p=>oy(p)||typeof p?.[Symbol.iterator]=="function",Dg=`[ 	
\f\r]`,PU=`[^ 	
\f\r"'\`<>=]`,JU=`[^\\s"'>=/]`,Ec=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,gE=1,Ug=2,IU=3,yE=/-->/g,vE=/>/g,ls=new RegExp(`>|${Dg}(?:(${JU}+)(${Dg}*=${Dg}*(?:${PU}|("|')|))|$)`,"g"),KU=0,xE=1,WU=2,NE=3,Tg=/'/g,Rg=/"/g,PE=/^(?:script|style|textarea|title)$/i,FU=1,xp=2,jg=3,ly=1,Np=2,e3=3,t3=4,i3=5,sy=6,n3=7,JE=p=>(l,...r)=>(l.some(c=>c===void 0)&&console.warn(`Some template strings are undefined.
This is probably caused by illegal octal escape sequences.`),r.some(c=>c?._$litStatic$)&&Dc("",`Static values 'literal' or 'unsafeStatic' cannot be used as values to non-static templates.
Please use the static 'html' tag function. See https://lit.dev/docs/templates/expressions/#static-expressions`),{_$litType$:p,strings:l,values:r}),$=JE(FU),Cg=JE(xp),lo=Symbol.for("lit-noChange"),pe=Symbol.for("lit-nothing"),SE=new WeakMap,us=cs.createTreeWalker(cs,129);let ds=Cp;function IE(p,l){if(!oy(p)||!p.hasOwnProperty("raw")){let r="invalid template strings array";throw r=`
          Internal Error: expected template strings to be an array
          with a 'raw' field. Faking a template strings array by
          calling html or svg like an ordinary function is effectively
          the same as calling unsafeHtml and can lead to major security
          issues, e.g. opening your code up to XSS attacks.
          If you're using the html or svg tagged template functions normally
          and still seeing this error, please file a bug at
          https://github.com/lit/lit/issues/new?template=bug_report.md
          and include information about your build tooling, if any.
        `.trim().replace(/\n */g,`
`),new Error(r)}return bE!==void 0?bE.createHTML(l):l}const a3=(p,l)=>{const r=p.length-1,c=[];let u=l===xp?"<svg>":l===jg?"<math>":"",f,b=Ec;for(let N=0;N<r;N++){const O=p[N];let z=-1,A,x=0,C;for(;x<O.length&&(b.lastIndex=x,C=b.exec(O),C!==null);)if(x=b.lastIndex,b===Ec){if(C[gE]==="!--")b=yE;else if(C[gE]!==void 0)b=vE;else if(C[Ug]!==void 0)PE.test(C[Ug])&&(f=new RegExp(`</${C[Ug]}`,"g")),b=ls;else if(C[IU]!==void 0)throw new Error("Bindings in tag names are not supported. Please use static templates instead. See https://lit.dev/docs/templates/expressions/#static-expressions")}else b===ls?C[KU]===">"?(b=f??Ec,z=-1):C[xE]===void 0?z=-2:(z=b.lastIndex-C[WU].length,A=C[xE],b=C[NE]===void 0?ls:C[NE]==='"'?Rg:Tg):b===Rg||b===Tg?b=ls:b===yE||b===vE?b=Ec:(b=ls,f=void 0);console.assert(z===-1||b===ls||b===Tg||b===Rg,"unexpected parse state B");const B=b===ls&&p[N+1].startsWith("/>")?" ":"";u+=b===Ec?O+QU:z>=0?(c.push(A),O.slice(0,z)+QE+O.slice(z)+to+B):O+to+(z===-2?N:B)}const v=u+(p[r]||"<?>")+(l===xp?"</svg>":l===jg?"</math>":"");return[IE(p,v),c]};class Rc{constructor({strings:l,["_$litType$"]:r},c){this.parts=[];let u,f=0,b=0;const v=l.length-1,N=this.parts,[O,z]=a3(l,r);if(this.el=Rc.createElement(O,c),us.currentNode=this.el.content,r===xp||r===jg){const A=this.el.content.firstChild;A.replaceWith(...A.childNodes)}for(;(u=us.nextNode())!==null&&N.length<v;){if(u.nodeType===1){{const A=u.localName;if(/^(?:textarea|template)$/i.test(A)&&u.innerHTML.includes(to)){const x=`Expressions are not supported inside \`${A}\` elements. See https://lit.dev/msg/expression-in-${A} for more information.`;if(A==="template")throw new Error(x);Dc("",x)}}if(u.hasAttributes())for(const A of u.getAttributeNames())if(A.endsWith(QE)){const x=z[b++],B=u.getAttribute(A).split(to),G=/([.?@])?(.*)/.exec(x);N.push({type:ly,index:f,name:G[2],strings:B,ctor:G[1]==="."?l3:G[1]==="?"?s3:G[1]==="@"?r3:Op}),u.removeAttribute(A)}else A.startsWith(to)&&(N.push({type:sy,index:f}),u.removeAttribute(A));if(PE.test(u.tagName)){const A=u.textContent.split(to),x=A.length-1;if(x>0){u.textContent=vp?vp.emptyScript:"";for(let C=0;C<x;C++)u.append(A[C],Uc()),us.nextNode(),N.push({type:Np,index:++f});u.append(A[x],Uc())}}}else if(u.nodeType===8)if(u.data===ZE)N.push({type:Np,index:f});else{let x=-1;for(;(x=u.data.indexOf(to,x+1))!==-1;)N.push({type:n3,index:f}),x+=to.length-1}f++}if(z.length!==b)throw new Error('Detected duplicate attribute bindings. This occurs if your template has duplicate attributes on an element tag. For example "<input ?disabled=${true} ?disabled=${false}>" contains a duplicate "disabled" attribute. The error was detected in the following template: \n`'+l.join("${...}")+"`");Xe&&Xe({kind:"template prep",template:this,clonableTemplate:this.el,parts:this.parts,strings:l})}static createElement(l,r){const c=cs.createElement("template");return c.innerHTML=l,c}}function Cr(p,l,r=p,c){if(l===lo)return l;let u=c!==void 0?r.__directives?.[c]:r.__directive;const f=Tc(l)?void 0:l._$litDirective$;return u?.constructor!==f&&(u?._$notifyDirectiveConnectionChanged?.(!1),f===void 0?u=void 0:(u=new f(p),u._$initialize(p,r,c)),c!==void 0?(r.__directives??=[])[c]=u:r.__directive=u),u!==void 0&&(l=Cr(p,u._$resolve(p,l.values),u,c)),l}class o3{constructor(l,r){this._$parts=[],this._$disconnectableChildren=void 0,this._$template=l,this._$parent=r}get parentNode(){return this._$parent.parentNode}get _$isConnected(){return this._$parent._$isConnected}_clone(l){const{el:{content:r},parts:c}=this._$template,u=(l?.creationScope??cs).importNode(r,!0);us.currentNode=u;let f=us.nextNode(),b=0,v=0,N=c[0];for(;N!==void 0;){if(b===N.index){let O;N.type===Np?O=new kp(f,f.nextSibling,this,l):N.type===ly?O=new N.ctor(f,N.name,N.strings,this,l):N.type===sy&&(O=new u3(f,this,l)),this._$parts.push(O),N=c[++v]}b!==N?.index&&(f=us.nextNode(),b++)}return us.currentNode=cs,u}_update(l){let r=0;for(const c of this._$parts)c!==void 0&&(Xe&&Xe({kind:"set part",part:c,value:l[r],valueIndex:r,values:l,templateInstance:this}),c.strings!==void 0?(c._$setValue(l,c,r),r+=c.strings.length-2):c._$setValue(l[r])),r++}}let kp=class KE{get _$isConnected(){return this._$parent?._$isConnected??this.__isConnected}constructor(l,r,c,u){this.type=Np,this._$committedValue=pe,this._$disconnectableChildren=void 0,this._$startNode=l,this._$endNode=r,this._$parent=c,this.options=u,this.__isConnected=u?.isConnected??!0,this._textSanitizer=void 0}get parentNode(){let l=On(this._$startNode).parentNode;const r=this._$parent;return r!==void 0&&l?.nodeType===11&&(l=r.parentNode),l}get startNode(){return this._$startNode}get endNode(){return this._$endNode}_$setValue(l,r=this){if(this.parentNode===null)throw new Error("This `ChildPart` has no `parentNode` and therefore cannot accept a value. This likely means the element containing the part was manipulated in an unsupported way outside of Lit's control such that the part's marker nodes were ejected from DOM. For example, setting the element's `innerHTML` or `textContent` can do this.");if(l=Cr(this,l,r),Tc(l))l===pe||l==null||l===""?(this._$committedValue!==pe&&(Xe&&Xe({kind:"commit nothing to child",start:this._$startNode,end:this._$endNode,parent:this._$parent,options:this.options}),this._$clear()),this._$committedValue=pe):l!==this._$committedValue&&l!==lo&&this._commitText(l);else if(l._$litType$!==void 0)this._commitTemplateResult(l);else if(l.nodeType!==void 0){if(this.options?.host===l){this._commitText("[probable mistake: rendered a template's host in itself (commonly caused by writing ${this} in a template]"),console.warn("Attempted to render the template host",l,"inside itself. This is almost always a mistake, and in dev mode ","we render some warning text. In production however, we'll ","render it, which will usually result in an error, and sometimes ","in the element disappearing from the DOM.");return}this._commitNode(l)}else ZU(l)?this._commitIterable(l):this._commitText(l)}_insert(l){return On(On(this._$startNode).parentNode).insertBefore(l,this._$endNode)}_commitNode(l){if(this._$committedValue!==l){if(this._$clear(),ds!==Cp){const r=this._$startNode.parentNode?.nodeName;if(r==="STYLE"||r==="SCRIPT"){let c="Forbidden";throw r==="STYLE"?c="Lit does not support binding inside style nodes. This is a security risk, as style injection attacks can exfiltrate data and spoof UIs. Consider instead using css`...` literals to compose styles, and do dynamic styling with css custom properties, ::parts, <slot>s, and by mutating the DOM rather than stylesheets.":c="Lit does not support binding inside script nodes. This is a security risk, as it could allow arbitrary code execution.",new Error(c)}}Xe&&Xe({kind:"commit node",start:this._$startNode,parent:this._$parent,value:l,options:this.options}),this._$committedValue=this._insert(l)}}_commitText(l){if(this._$committedValue!==pe&&Tc(this._$committedValue)){const r=On(this._$startNode).nextSibling;this._textSanitizer===void 0&&(this._textSanitizer=zg(r,"data","property")),l=this._textSanitizer(l),Xe&&Xe({kind:"commit text",node:r,value:l,options:this.options}),r.data=l}else{const r=cs.createTextNode("");this._commitNode(r),this._textSanitizer===void 0&&(this._textSanitizer=zg(r,"data","property")),l=this._textSanitizer(l),Xe&&Xe({kind:"commit text",node:r,value:l,options:this.options}),r.data=l}this._$committedValue=l}_commitTemplateResult(l){const{values:r,["_$litType$"]:c}=l,u=typeof c=="number"?this._$getTemplate(l):(c.el===void 0&&(c.el=Rc.createElement(IE(c.h,c.h[0]),this.options)),c);if(this._$committedValue?._$template===u)Xe&&Xe({kind:"template updating",template:u,instance:this._$committedValue,parts:this._$committedValue._$parts,options:this.options,values:r}),this._$committedValue._update(r);else{const f=new o3(u,this),b=f._clone(this.options);Xe&&Xe({kind:"template instantiated",template:u,instance:f,parts:f._$parts,options:this.options,fragment:b,values:r}),f._update(r),Xe&&Xe({kind:"template instantiated and updated",template:u,instance:f,parts:f._$parts,options:this.options,fragment:b,values:r}),this._commitNode(b),this._$committedValue=f}}_$getTemplate(l){let r=SE.get(l.strings);return r===void 0&&SE.set(l.strings,r=new Rc(l)),r}_commitIterable(l){oy(this._$committedValue)||(this._$committedValue=[],this._$clear());const r=this._$committedValue;let c=0,u;for(const f of l)c===r.length?r.push(u=new KE(this._insert(Uc()),this._insert(Uc()),this,this.options)):u=r[c],u._$setValue(f),c++;c<r.length&&(this._$clear(u&&On(u._$endNode).nextSibling,c),r.length=c)}_$clear(l=On(this._$startNode).nextSibling,r){for(this._$notifyConnectionChanged?.(!1,!0,r);l!==this._$endNode;){const c=On(l).nextSibling;On(l).remove(),l=c}}setConnected(l){if(this._$parent===void 0)this.__isConnected=l,this._$notifyConnectionChanged?.(l);else throw new Error("part.setConnected() may only be called on a RootPart returned from render().")}};class Op{get tagName(){return this.element.tagName}get _$isConnected(){return this._$parent._$isConnected}constructor(l,r,c,u,f){this.type=ly,this._$committedValue=pe,this._$disconnectableChildren=void 0,this.element=l,this.name=r,this._$parent=u,this.options=f,c.length>2||c[0]!==""||c[1]!==""?(this._$committedValue=new Array(c.length-1).fill(new String),this.strings=c):this._$committedValue=pe,this._sanitizer=void 0}_$setValue(l,r=this,c,u){const f=this.strings;let b=!1;if(f===void 0)l=Cr(this,l,r,0),b=!Tc(l)||l!==this._$committedValue&&l!==lo,b&&(this._$committedValue=l);else{const v=l;l=f[0];let N,O;for(N=0;N<f.length-1;N++)O=Cr(this,v[c+N],r,N),O===lo&&(O=this._$committedValue[N]),b||=!Tc(O)||O!==this._$committedValue[N],O===pe?l=pe:l!==pe&&(l+=(O??"")+f[N+1]),this._$committedValue[N]=O}b&&!u&&this._commitValue(l)}_commitValue(l){l===pe?On(this.element).removeAttribute(this.name):(this._sanitizer===void 0&&(this._sanitizer=ds(this.element,this.name,"attribute")),l=this._sanitizer(l??""),Xe&&Xe({kind:"commit attribute",element:this.element,name:this.name,value:l,options:this.options}),On(this.element).setAttribute(this.name,l??""))}}class l3 extends Op{constructor(){super(...arguments),this.type=e3}_commitValue(l){this._sanitizer===void 0&&(this._sanitizer=ds(this.element,this.name,"property")),l=this._sanitizer(l),Xe&&Xe({kind:"commit property",element:this.element,name:this.name,value:l,options:this.options}),this.element[this.name]=l===pe?void 0:l}}class s3 extends Op{constructor(){super(...arguments),this.type=t3}_commitValue(l){Xe&&Xe({kind:"commit boolean attribute",element:this.element,name:this.name,value:!!(l&&l!==pe),options:this.options}),On(this.element).toggleAttribute(this.name,!!l&&l!==pe)}}class r3 extends Op{constructor(l,r,c,u,f){if(super(l,r,c,u,f),this.type=i3,this.strings!==void 0)throw new Error(`A \`<${l.localName}>\` has a \`@${r}=...\` listener with invalid content. Event listeners in templates must have exactly one expression and no surrounding text.`)}_$setValue(l,r=this){if(l=Cr(this,l,r,0)??pe,l===lo)return;const c=this._$committedValue,u=l===pe&&c!==pe||l.capture!==c.capture||l.once!==c.once||l.passive!==c.passive,f=l!==pe&&(c===pe||u);Xe&&Xe({kind:"commit event listener",element:this.element,name:this.name,value:l,options:this.options,removeListener:u,addListener:f,oldListener:c}),u&&this.element.removeEventListener(this.name,this,c),f&&this.element.addEventListener(this.name,this,l),this._$committedValue=l}handleEvent(l){typeof this._$committedValue=="function"?this._$committedValue.call(this.options?.host??this.element,l):this._$committedValue.handleEvent(l)}}class u3{constructor(l,r,c){this.element=l,this.type=sy,this._$disconnectableChildren=void 0,this._$parent=r,this.options=c}get _$isConnected(){return this._$parent._$isConnected}_$setValue(l){Xe&&Xe({kind:"commit to element binding",element:this.element,value:l,options:this.options}),Cr(this,l)}}const c3={_ChildPart:kp},d3=Zi.litHtmlPolyfillSupportDevMode;d3?.(Rc,kp);(Zi.litHtmlVersions??=[]).push("3.3.2");Zi.litHtmlVersions.length>1&&queueMicrotask(()=>{Dc("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.")});const pp=(p,l,r)=>{if(l==null)throw new TypeError(`The container to render into may not be ${l}`);const c=qU++,u=r?.renderBefore??l;let f=u._$litPart$;if(Xe&&Xe({kind:"begin render",id:c,value:p,container:l,options:r,part:f}),f===void 0){const b=r?.renderBefore??null;u._$litPart$=f=new kp(l.insertBefore(Uc(),b),b,void 0,r??{})}return f._$setValue(p),Xe&&Xe({kind:"end render",id:c,value:p,container:l,options:r,part:f}),f};pp.setSanitizer=GU,pp.createSanitizer=zg,pp._testOnlyClearSanitizerFactoryDoNotCallOrElse=XU;const f3=(p,l)=>p,rl=globalThis;let WE;rl.litIssuedWarnings??=new Set,WE=(p,l)=>{l+=` See https://lit.dev/msg/${p} for more information.`,!rl.litIssuedWarnings.has(l)&&!rl.litIssuedWarnings.has(p)&&(console.warn(l),rl.litIssuedWarnings.add(l))};class W extends ao{constructor(){super(...arguments),this.renderOptions={host:this},this.__childPart=void 0}createRenderRoot(){const l=super.createRenderRoot();return this.renderOptions.renderBefore??=l.firstChild,l}update(l){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(l),this.__childPart=pp(r,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.__childPart?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.__childPart?.setConnected(!1)}render(){return lo}}W._$litElement$=!0;W[f3("finalized")]=!0;rl.litElementHydrateSupport?.({LitElement:W});const p3=rl.litElementPolyfillSupportDevMode;p3?.({LitElement:W});(rl.litElementVersions??=[]).push("4.2.2");rl.litElementVersions.length>1&&queueMicrotask(()=>{WE("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.")});const te=p=>(l,r)=>{r!==void 0?r.addInitializer(()=>{customElements.define(p,l)}):customElements.define(p,l)};let FE;globalThis.litIssuedWarnings??=new Set,FE=(p,l)=>{l+=` See https://lit.dev/msg/${p} for more information.`,!globalThis.litIssuedWarnings.has(l)&&!globalThis.litIssuedWarnings.has(p)&&(console.warn(l),globalThis.litIssuedWarnings.add(l))};const h3=(p,l,r)=>{const c=l.hasOwnProperty(r);return l.constructor.createProperty(r,p),c?Object.getOwnPropertyDescriptor(l,r):void 0},m3={attribute:!0,type:String,converter:yp,reflect:!1,hasChanged:ay},b3=(p=m3,l,r)=>{const{kind:c,metadata:u}=r;u==null&&FE("missing-class-metadata",`The class ${l} is missing decorator metadata. This could mean that you're using a compiler that supports decorators but doesn't support decorator metadata, such as TypeScript 5.1. Please update your compiler.`);let f=globalThis.litPropertyMetadata.get(u);if(f===void 0&&globalThis.litPropertyMetadata.set(u,f=new Map),c==="setter"&&(p=Object.create(p),p.wrapped=!0),f.set(r.name,p),c==="accessor"){const{name:b}=r;return{set(v){const N=l.get.call(this);l.set.call(this,v),this.requestUpdate(b,N,p,!0,v)},init(v){return v!==void 0&&this._$changeProperty(b,void 0,p,v),v}}}else if(c==="setter"){const{name:b}=r;return function(v){const N=this[b];l.call(this,v),this.requestUpdate(b,N,p,!0,v)}}throw new Error(`Unsupported decorator location: ${c}`)};function E(p){return(l,r)=>typeof r=="object"?b3(p,l,r):h3(p,l,r)}function si(p){return E({...p,state:!0,attribute:!1})}const g3=(p,l,r)=>(r.configurable=!0,r.enumerable=!0,Reflect.decorate&&typeof l!="object"&&Object.defineProperty(p,l,r),r);globalThis.litIssuedWarnings??=new Set;function Lc(p,l){return((r,c,u)=>{const f=b=>b.renderRoot?.querySelector(p)??null;return g3(r,c,{get(){return f(this)}})})}const ry={ATTRIBUTE:1,CHILD:2},uy=p=>(...l)=>({_$litDirective$:p,values:l});class cy{constructor(l){}get _$isConnected(){return this._$parent._$isConnected}_$initialize(l,r,c){this.__part=l,this._$parent=r,this.__attributeIndex=c}_$resolve(l,r){return this.update(l,r)}update(l,r){return this.render(...r)}}class y3 extends cy{constructor(l){if(super(l),l.type!==ry.ATTRIBUTE||l.name!=="class"||l.strings?.length>2)throw new Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(l){return" "+Object.keys(l).filter(r=>l[r]).join(" ")+" "}update(l,[r]){if(this._previousClasses===void 0){this._previousClasses=new Set,l.strings!==void 0&&(this._staticClasses=new Set(l.strings.join(" ").split(/\s/).filter(u=>u!=="")));for(const u in r)r[u]&&!this._staticClasses?.has(u)&&this._previousClasses.add(u);return this.render(r)}const c=l.element.classList;for(const u of this._previousClasses)u in r||(c.remove(u),this._previousClasses.delete(u));for(const u in r){const f=!!r[u];f!==this._previousClasses.has(u)&&!this._staticClasses?.has(u)&&(f?(c.add(u),this._previousClasses.add(u)):(c.remove(u),this._previousClasses.delete(u)))}return lo}}const qe=uy(y3);var v3=Object.defineProperty,x3=Object.getOwnPropertyDescriptor,Hc=(p,l,r,c)=>{for(var u=c>1?void 0:c?x3(l,r):l,f=p.length-1,b;f>=0;f--)(b=p[f])&&(u=(c?b(l,r,u):b(u))||u);return c&&u&&v3(l,r,u),u};let fs=class extends W{constructor(){super(...arguments),this.variant="primary",this.size="medium",this.disabled=!1,this.fullWidth=!1}render(){const l={primary:this.variant==="primary",secondary:this.variant==="secondary",destructive:this.variant==="destructive",small:this.size==="small",medium:this.size==="medium",large:this.size==="large"};return $`
      <button
        type="button"
        class=${qe(l)}
        ?disabled=${this.disabled}
        part="button"
      >
        <slot></slot>
      </button>
    `}};fs.styles=ee`
    :host {
      display: inline-block;
    }
    :host([full-width]) {
      display: block;
    }
    button {
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      font-weight: 600;
      border: none;
      border-radius: var(--ui-button-border-radius, var(--ui-border-radius-md, 6px));
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      transition: all 0.2s ease;
      box-shadow: var(--ui-shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05));
    }
    .primary {
      background-color: var(--ui-primary-color, #3b82f6);
      color: var(--ui-text-color-on-primary, white);
    }
    .primary:hover {
      background-color: var(--ui-primary-color-hover, #2563eb);
    }
    .primary:active {
      background-color: var(--ui-primary-color-active, #1d4ed8);
    }
    .secondary {
      background-color: var(--ui-surface-background, white);
      color: var(--ui-text-color, #111827);
      border: 1px solid var(--ui-input-border-color, #d1d5db);
    }
    .secondary:hover {
      background-color: var(--ui-hover-color, #f3f4f6);
    }
    .secondary:active {
      background-color: var(--ui-active-color, #e5e7eb);
    }
    .destructive {
      background-color: var(--ui-destructive-color, #ef4444);
      color: var(--ui-text-color-on-primary, white);
    }
    .destructive:hover {
      background-color: var(--ui-destructive-color-hover, #dc2626);
    }
    .destructive:active {
      background-color: var(--ui-destructive-color-active, #b91c1c);
    }
    .small {
      padding: 6px 12px;
      font-size: 14px;
    }
    .medium {
      padding: 10px 16px;
      font-size: 14px;
    }
    .large {
      padding: 14px 20px;
      font-size: 16px;
    }
    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `;Hc([E({type:String})],fs.prototype,"variant",2);Hc([E({type:String})],fs.prototype,"size",2);Hc([E({type:Boolean})],fs.prototype,"disabled",2);Hc([E({type:Boolean,reflect:!0,attribute:"full-width"})],fs.prototype,"fullWidth",2);fs=Hc([te("ui-button")],fs);const Qe=R.forwardRef(function({variant:l,size:r,disabled:c,fullWidth:u,children:f,...b},v){const N=R.useRef(null),O=v??N;return R.useEffect(()=>{const z=O.current;z&&(l!==void 0&&(z.variant=l),r!==void 0&&(z.size=r),c!==void 0&&(z.disabled=c),u!==void 0&&(z.fullWidth=u))},[l,r,c,u]),h.jsxDEV("ui-button",{ref:O,...b,children:f},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiButton.tsx",lineNumber:34,columnNumber:13},this)});Qe.displayName="UiButton";const EE={CHANGE:"ui-switch-change"};var N3=Object.defineProperty,S3=Object.getOwnPropertyDescriptor,Sa=(p,l,r,c)=>{for(var u=c>1?void 0:c?S3(l,r):l,f=p.length-1,b;f>=0;f--)(b=p[f])&&(u=(c?b(l,r,u):b(u))||u);return c&&u&&N3(l,r,u),u};let _E=0,Pi=class extends W{constructor(){super(),this.checked=!1,this.disabled=!1,this.required=!1,this.size="md",this.label="",this.name="",this.value="on",this.defaultChecked=!1,this.ariaLabel=null,this._internals=null,this._firstUpdate=!0,_E++,this._labelId=`ui-switch-label-${_E}`,typeof this.attachInternals=="function"&&(this._internals=this.attachInternals())}willUpdate(l){super.willUpdate(l),this._firstUpdate&&(this._firstUpdate=!1,this.defaultChecked&&(this.checked=!0))}updated(l){super.updated(l),(l.has("checked")||l.has("value"))&&this._internals?.setFormValue?.(this.checked?this.value:null),(l.has("checked")||l.has("required"))&&(this.required&&!this.checked?this._internals?.setValidity?.({valueMissing:!0},"Please check this switch."):this._internals?.setValidity?.({}))}_handleClick(){this.disabled||(this.checked=!this.checked,this.dispatchEvent(new CustomEvent("ui-switch-change",{detail:{checked:this.checked},bubbles:!0,composed:!0})))}render(){const l=!!this.label;return $`
      <div class="wrapper" @click=${this._handleClick}>
        <div
          class=${qe({switch:!0,checked:this.checked,disabled:this.disabled})}
          role="switch"
          aria-checked=${this.checked?"true":"false"}
          aria-disabled=${this.disabled?"true":"false"}
          aria-required=${this.required?"true":"false"}
          aria-label=${this.ariaLabel??pe}
          aria-labelledby=${l?this._labelId:pe}
          .tabIndex=${this.disabled?-1:0}
          @keydown=${r=>(r.key===" "||r.key==="Enter")&&this._handleClick()}
        >
          <div class="thumb">
            <div class="icon-wrapper">
              ${this.checked?$`<slot name="icon-on"></slot>`:$`<slot name="icon-off"></slot>`}
            </div>
          </div>
        </div>
        ${l?$`<span id=${this._labelId} class=${qe({label:!0,disabled:this.disabled})}>${this.label}</span>`:$`<slot></slot>`}
      </div>
    `}};Pi.formAssociated=!0;Pi.styles=ee`
    :host {
      display: inline-block;
      --ui-switch-width: 52px;
      --ui-switch-height: 32px;
      --ui-switch-thumb-size: 24px;
      --ui-switch-thumb-offset: 4px;
      --ui-switch-bg: var(--ui-secondary-color, #6b7280);
      --ui-switch-bg-on: var(--ui-primary-color, #3b82f6);
      --ui-switch-thumb-bg: #ffffff;

      font-family: var(--ui-font-family, sans-serif);
      cursor: pointer;
    }

    :host([disabled]) {
      cursor: not-allowed;
    }

    :host([size="sm"]) {
      --ui-switch-width: 36px;
      --ui-switch-height: 22px;
      --ui-switch-thumb-size: 16px;
      --ui-switch-thumb-offset: 3px;
    }

    :host([size="lg"]) {
      --ui-switch-width: 64px;
      --ui-switch-height: 38px;
      --ui-switch-thumb-size: 30px;
      --ui-switch-thumb-offset: 4px;
    }

    .wrapper {
      display: flex;
      align-items: center;
      gap: 12px;
      user-select: none;
    }

    .switch {
      position: relative;
      width: var(--ui-switch-width);
      height: var(--ui-switch-height);
      background-color: var(--ui-switch-bg);
      border-radius: calc(var(--ui-switch-height) / 2);
      transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      flex-shrink: 0;
    }

    .switch.checked {
      background-color: var(--ui-switch-bg-on);
    }

    .thumb {
      position: absolute;
      top: var(--ui-switch-thumb-offset);
      left: var(--ui-switch-thumb-offset);
      width: var(--ui-switch-thumb-size);
      height: var(--ui-switch-thumb-size);
      background-color: var(--ui-switch-thumb-bg);
      border-radius: 50%;
      box-shadow: var(--ui-shadow-sm, 0 1px 3px rgba(0,0,0,0.1));
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--ui-text-color-muted, #6b7280);
    }

    .switch.checked .thumb {
      transform: translateX(calc(var(--ui-switch-width) - var(--ui-switch-thumb-size) - (var(--ui-switch-thumb-offset) * 2)));
      color: var(--ui-primary-color, #3b82f6);
    }

    .label {
      font-size: 0.9375rem;
      font-weight: 500;
      color: var(--ui-text-color, #111827);
    }

    .label.disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .switch.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .switch:focus-visible {
      outline: 2px solid var(--ui-primary-color, #3b82f6);
      outline-offset: 2px;
    }

    .icon-wrapper {
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `;Sa([E({type:Boolean,reflect:!0})],Pi.prototype,"checked",2);Sa([E({type:Boolean,reflect:!0})],Pi.prototype,"disabled",2);Sa([E({type:Boolean,reflect:!0})],Pi.prototype,"required",2);Sa([E({type:String,reflect:!0})],Pi.prototype,"size",2);Sa([E({type:String})],Pi.prototype,"label",2);Sa([E({type:String})],Pi.prototype,"name",2);Sa([E({type:String})],Pi.prototype,"value",2);Sa([E({type:Boolean,attribute:"default-checked"})],Pi.prototype,"defaultChecked",2);Sa([E({type:String,attribute:"aria-label"})],Pi.prototype,"ariaLabel",2);Pi=Sa([te("ui-switch")],Pi);const no=R.forwardRef(function({checked:l,disabled:r,required:c,size:u,label:f,name:b,value:v,defaultChecked:N,ariaLabel:O,onUiSwitchChange:z,children:A,...x},C){const B=R.useRef(null),G=C??B;return R.useEffect(()=>{const J=G.current;J&&(l!==void 0&&(J.checked=l),r!==void 0&&(J.disabled=r),c!==void 0&&(J.required=c),u!==void 0&&(J.size=u),f!==void 0&&(J.label=f),b!==void 0&&(J.name=b),v!==void 0&&(J.value=v),N!==void 0&&(J.defaultChecked=N),O!==void 0&&(J.ariaLabel=O))},[l,r,c,u,f,b,v,N,O]),R.useEffect(()=>{const J=G.current;if(!J||!z)return;const I=z;return J.addEventListener(EE.CHANGE,I),()=>J.removeEventListener(EE.CHANGE,I)},[z]),h.jsxDEV("ui-switch",{ref:G,...x,children:A},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiSwitch.tsx",lineNumber:54,columnNumber:13},this)});no.displayName="UiSwitch";const wE={CLOSE:"ui-alert-close"};var E3=Object.defineProperty,_3=Object.getOwnPropertyDescriptor,zp=(p,l,r,c)=>{for(var u=c>1?void 0:c?_3(l,r):l,f=p.length-1,b;f>=0;f--)(b=p[f])&&(u=(c?b(l,r,u):b(u))||u);return c&&u&&E3(l,r,u),u};let kr=class extends W{constructor(){super(...arguments),this.severity="info",this.title="",this.dismissible=!1}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._closeTimer)}_handleClose(){this.dispatchEvent(new CustomEvent("ui-alert-close",{bubbles:!0,composed:!0,detail:{severity:this.severity}})),this.style.opacity="0",this.style.transform="translateY(-4px)",this.style.transition="opacity 0.2s ease, transform 0.2s ease",this._closeTimer=setTimeout(()=>{this.remove()},200)}_getIcon(){switch(this.severity){case"success":return $`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;case"warning":return $`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;case"error":return $`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;default:return $`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`}}render(){return $`
            <div class="alert ${qe({[this.severity]:!0})}" role="alert">
                <div class="icon">
                    <slot name="icon">${this._getIcon()}</slot>
                </div>
                <div class="content">
                    ${this.title?$`<div class="title">${this.title}</div>`:""}
                    <div class="message">
                        <slot></slot>
                    </div>
                </div>
                ${this.dismissible?$`
                    <button class="close-button" @click=${this._handleClose} aria-label="Close">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px;">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                `:""}
            </div>
        `}};kr.styles=ee`
        :host {
            display: block;
            width: 100%;
            font-family: var(--ui-font-family, 'Inter', sans-serif);
            margin-bottom: 1rem;
        }

        .alert {
            display: flex;
            align-items: flex-start;
            padding: 12px 16px;
            border-radius: var(--ui-border-radius-md, 6px);
            gap: 12px;
            border: 1px solid transparent;
            position: relative;
            box-sizing: border-box;
            animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-4px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Severities */
        .info {
            background-color: #eff6ff;
            border-color: #bfdbfe;
            color: #1e40af;
        }
        .info .icon { color: #3b82f6; }

        .success {
            background-color: #f0fdf4;
            border-color: #bbf7d0;
            color: #166534;
        }
        .success .icon { color: #10b981; }

        .warning {
            background-color: #fffbeb;
            border-color: #fef3c7;
            color: #92400e;
        }
        .warning .icon { color: #f59e0b; }

        .error {
            background-color: #fef2f2;
            border-color: #fee2e2;
            color: #991b1b;
        }
        .error .icon { color: #ef4444; }

        .icon {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
            margin-top: 2px;
        }

        .content {
            flex-grow: 1;
        }

        .title {
            font-weight: 600;
            font-size: 0.875rem;
            margin-bottom: 2px;
        }

        .message {
            font-size: 0.875rem;
            line-height: 1.5;
        }

        .close-button {
            flex-shrink: 0;
            cursor: pointer;
            padding: 6px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 28px;
            height: 28px;
            margin-top: -6px;
            margin-right: -10px;
            color: currentColor;
            opacity: 0.6;
            transition: all 0.2s ease;
            border: none;
            background: transparent;
        }

        .close-button:hover {
            opacity: 1;
            background-color: rgba(0, 0, 0, 0.08);
        }

        .close-button:active {
            transform: scale(0.92);
        }

        .icon svg,
        .close-button svg {
            width: 100%;
            height: 100%;
        }
    `;zp([E({type:String})],kr.prototype,"severity",2);zp([E({type:String})],kr.prototype,"title",2);zp([E({type:Boolean})],kr.prototype,"dismissible",2);kr=zp([te("ui-alert")],kr);const ba=R.forwardRef(function({severity:l,title:r,dismissible:c,onUiAlertClose:u,children:f,...b},v){const N=R.useRef(null),O=v??N;return R.useEffect(()=>{const z=O.current;z&&(l!==void 0&&(z.severity=l),r!==void 0&&(z.title=r),c!==void 0&&(z.dismissible=c))},[l,r,c]),R.useEffect(()=>{const z=O.current;if(!z||!u)return;const A=u;return z.addEventListener(wE.CLOSE,A),()=>z.removeEventListener(wE.CLOSE,A)},[u]),h.jsxDEV("ui-alert",{ref:O,...b,children:f},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiAlert.tsx",lineNumber:42,columnNumber:13},this)});ba.displayName="UiAlert";var w3=Object.defineProperty,A3=Object.getOwnPropertyDescriptor,Br=(p,l,r,c)=>{for(var u=c>1?void 0:c?A3(l,r):l,f=p.length-1,b;f>=0;f--)(b=p[f])&&(u=(c?b(l,r,u):b(u))||u);return c&&u&&w3(l,r,u),u};let ul=class extends W{constructor(){super(...arguments),this.content="",this.dot=!1,this.invisible=!1,this.variant="primary",this.max=99}get _displayContent(){if(this.dot)return"";const l=Number(this.content);return!isNaN(l)&&l>this.max?`${this.max}+`:this.content}render(){const l=!this.invisible&&(this.dot||this.content!=="");return $`
      <slot></slot>
      <span
        class="badge ${qe({hidden:!l,dot:this.dot,[this.variant]:!0})}"
        role="status"
        aria-hidden="${l?"false":"true"}"
      >
        ${this._displayContent}
      </span>
    `}};ul.styles=ee`
    :host {
      display: inline-flex;
      position: relative;
      vertical-align: middle;
      flex-shrink: 0;
    }

    .badge {
      display: flex;
      flex-wrap: wrap;
      place-content: center;
      align-items: center;
      position: absolute;
      box-sizing: border-box;
      font-family: var(--ui-font-family, sans-serif);
      font-weight: 600;
      font-size: 0.75rem;
      min-width: 20px;
      line-height: 1;
      padding: 0 6px;
      height: 20px;
      border-radius: 10px;
      z-index: 1;
      transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      background-color: var(--ui-badge-background, var(--ui-primary-color, #3b82f6));
      color: var(--ui-badge-color, var(--ui-text-color-on-primary, white));
      top: 0;
      right: 0;
      transform: scale(1) translate(50%, -50%);
      transform-origin: 100% 0%;
      border: 2px solid var(--ui-surface-background, white);
    }

    .badge.hidden {
      transform: scale(0) translate(50%, -50%);
    }

    .badge.dot {
      min-width: 8px;
      height: 8px;
      padding: 0;
      border-radius: 4px;
    }

    /* Variants */
    .primary { background-color: var(--ui-primary-color, #3b82f6); }
    .secondary { background-color: var(--ui-secondary-color, #6b7280); }
    .error { background-color: #ef4444; }
    .success { background-color: #10b981; }
    .warning { background-color: #f59e0b; }
  `;Br([E({type:String})],ul.prototype,"content",2);Br([E({type:Boolean})],ul.prototype,"dot",2);Br([E({type:Boolean})],ul.prototype,"invisible",2);Br([E({type:String})],ul.prototype,"variant",2);Br([E({type:Number})],ul.prototype,"max",2);ul=Br([te("ui-badge")],ul);const oo=R.forwardRef(function({content:l,dot:r,invisible:c,variant:u,max:f,children:b,...v},N){const O=R.useRef(null),z=N??O;return R.useEffect(()=>{const A=z.current;A&&(l!==void 0&&(A.content=l),r!==void 0&&(A.dot=r),c!==void 0&&(A.invisible=c),u!==void 0&&(A.variant=u),f!==void 0&&(A.max=f))},[l,r,c,u,f]),h.jsxDEV("ui-badge",{ref:z,...v,children:b},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiBadge.tsx",lineNumber:36,columnNumber:13},this)});oo.displayName="UiBadge";const rp={CLICK:"click",DELETE:"delete"};const Ur=p=>p??pe;var D3=Object.defineProperty,U3=Object.getOwnPropertyDescriptor,ms=(p,l,r,c)=>{for(var u=c>1?void 0:c?U3(l,r):l,f=p.length-1,b;f>=0;f--)(b=p[f])&&(u=(c?b(l,r,u):b(u))||u);return c&&u&&D3(l,r,u),u};let so=class extends W{constructor(){super(...arguments),this.label="",this.variant="filled",this.color="default",this.clickable=!1,this.deletable=!1,this.disabled=!1}_handleClick(l){l.stopPropagation(),!(this.disabled||!this.clickable)&&this.dispatchEvent(new CustomEvent("click",{bubbles:!0,composed:!0}))}_handleKeyDown(l){l.key!=="Enter"&&l.key!==" "||(l.preventDefault(),!this.disabled&&this.clickable&&this.dispatchEvent(new CustomEvent("click",{bubbles:!0,composed:!0})))}_handleDelete(l){l.stopPropagation(),!this.disabled&&this.dispatchEvent(new CustomEvent("delete",{bubbles:!0,composed:!0}))}_handleDeleteKeyDown(l){l.key!=="Enter"&&l.key!==" "||(l.preventDefault(),l.stopPropagation(),this.disabled||this.dispatchEvent(new CustomEvent("delete",{bubbles:!0,composed:!0})))}render(){const l={chip:!0,clickable:this.clickable,disabled:this.disabled,outlined:this.variant==="outlined",primary:this.color==="primary",secondary:this.color==="secondary"};return $`
      <div
        class=${qe(l)}
        @click=${this._handleClick}
        @keydown=${this._handleKeyDown}
        role=${Ur(this.clickable?"button":void 0)}
        tabindex=${this.clickable&&!this.disabled?"0":"-1"}
        aria-disabled=${this.disabled?"true":"false"}
      >
        <slot name="avatar"></slot>
        <slot name="icon"></slot>
        <span class="label">${this.label}</span>
        ${this.deletable?$`
          <span
            class="delete-icon"
            @click=${this._handleDelete}
            @keydown=${this._handleDeleteKeyDown}
            tabindex=${this.disabled?"-1":"0"}
            role="button"
            aria-label="Remove ${this.label}"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
            </svg>
          </span>
        `:""}
      </div>
    `}};so.styles=ee`
    :host {
      display: inline-block;
      vertical-align: middle;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
    }

    .chip {
      display: inline-flex;
      align-items: center;
      height: 32px;
      padding: 0 12px;
      border-radius: 16px;
      font-size: 14px;
      font-weight: 500;
      white-space: nowrap;
      transition: all 0.2s ease;
      background-color: var(--ui-surface-background-flat, #f3f4f6);
      color: var(--ui-text-color, #111827);
      border: 1px solid transparent;
      user-select: none;
      gap: 8px;
      outline: none;
      overflow: hidden;
    }

    .chip.clickable {
      cursor: pointer;
    }

    .chip.clickable:hover:not(.disabled) {
      background-color: var(--ui-hover-color, #e5e7eb);
    }

    .chip.clickable:active:not(.disabled) {
      background-color: var(--ui-active-color, #d1d5db);
    }

    .chip.outlined {
      background-color: transparent;
      border-color: var(--ui-input-border-color, #d1d5db);
    }

    .chip.primary:not(.outlined) {
      background-color: var(--ui-primary-color, #3b82f6);
      color: white;
    }

    .chip.secondary:not(.outlined) {
      background-color: var(--ui-secondary-color, #6b7280);
      color: white;
    }

    .chip.outlined.primary {
      color: var(--ui-primary-color, #3b82f6);
      border-color: var(--ui-primary-color, #3b82f6);
    }

    .chip.outlined.secondary {
      color: var(--ui-secondary-color, #6b7280);
      border-color: var(--ui-secondary-color, #6b7280);
    }

    .chip.primary.clickable:hover:not(.disabled) {
      filter: brightness(0.9);
      box-shadow: var(--ui-shadow-sm);
    }

    .chip.secondary.clickable:hover:not(.disabled) {
      filter: brightness(0.9);
      box-shadow: var(--ui-shadow-sm);
    }

    .chip.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .chip:focus-visible {
      outline: 2px solid var(--ui-primary-color, #3b82f6);
      outline-offset: 2px;
    }

    .delete-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      margin-right: -4px;
      cursor: pointer;
      color: inherit;
      opacity: 0.7;
      transition: opacity 0.2s, background-color 0.2s;
      outline: none;
    }

    .delete-icon:hover {
      opacity: 1;
      background-color: rgba(0, 0, 0, 0.1);
    }

    .delete-icon:focus-visible {
      opacity: 1;
      outline: 2px solid currentColor;
      outline-offset: 1px;
    }

    .chip.disabled .delete-icon {
      cursor: not-allowed;
      pointer-events: none;
    }

    ::slotted([slot="avatar"]) {
      --ui-avatar-size: 24px;
      width: 24px;
      height: 24px;
      margin-left: -8px;
      border-radius: 50%;
      overflow: hidden;
      flex-shrink: 0;
    }

    ::slotted([slot="icon"]) {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      margin-left: -4px;
      flex-shrink: 0;
      line-height: 1;
    }
  `;ms([E({type:String})],so.prototype,"label",2);ms([E({type:String})],so.prototype,"variant",2);ms([E({type:String})],so.prototype,"color",2);ms([E({type:Boolean})],so.prototype,"clickable",2);ms([E({type:Boolean})],so.prototype,"deletable",2);ms([E({type:Boolean,reflect:!0})],so.prototype,"disabled",2);so=ms([te("ui-chip")],so);const eo=R.forwardRef(function({label:l,variant:r,color:c,clickable:u,deletable:f,disabled:b,onClick:v,onDelete:N,children:O,...z},A){const x=R.useRef(null),C=A??x;return R.useEffect(()=>{const B=C.current;B&&(l!==void 0&&(B.label=l),r!==void 0&&(B.variant=r),c!==void 0&&(B.color=c),u!==void 0&&(B.clickable=u),f!==void 0&&(B.deletable=f),b!==void 0&&(B.disabled=b))},[l,r,c,u,f,b]),R.useEffect(()=>{const B=C.current;if(!B||!v)return;const G=v;return B.addEventListener(rp.CLICK,G),()=>B.removeEventListener(rp.CLICK,G)},[v]),R.useEffect(()=>{const B=C.current;if(!B||!N)return;const G=N;return B.addEventListener(rp.DELETE,G),()=>B.removeEventListener(rp.DELETE,G)},[N]),h.jsxDEV("ui-chip",{ref:C,...z,children:O},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiChip.tsx",lineNumber:57,columnNumber:13},this)});eo.displayName="UiChip";var T3=Object.defineProperty,R3=Object.getOwnPropertyDescriptor,fl=(p,l,r,c)=>{for(var u=c>1?void 0:c?R3(l,r):l,f=p.length-1,b;f>=0;f--)(b=p[f])&&(u=(c?b(l,r,u):b(u))||u);return c&&u&&T3(l,r,u),u};let ga=class extends W{constructor(){super(...arguments),this.src="",this.alt="",this.initials="",this.variant="circle",this.size="medium",this._hasError=!1,this._isLoading=!1}willUpdate(l){l.has("src")&&(this._hasError=!1,this._isLoading=!!this.src)}_handleError(){this._hasError=!0,this._isLoading=!1}_handleLoad(){this._isLoading=!1}render(){const l={avatar:!0,square:this.variant==="square",rounded:this.variant==="rounded",loading:this._isLoading};return $`
      <div class=${qe(l)} part="base">
        ${this.src&&!this._hasError?$`<img src=${this.src} alt=${this.alt} @error=${this._handleError} @load=${this._handleLoad} style=${this._isLoading?"display:none":pe} part="image" />`:this.initials?$`<span class="initials" part="initials">${this.initials.substring(0,2)}</span>`:$`<slot><svg width="60%" height="60%" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></slot>`}
      </div>
    `}};ga.styles=ee`
    :host {
      display: inline-block;
      vertical-align: middle;
      line-height: 1;
    }

    .avatar {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: var(--ui-avatar-size, 40px);
      height: var(--ui-avatar-size, 40px);
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      font-size: calc(var(--ui-avatar-size, 40px) / 2.5);
      font-weight: 600;
      border-radius: 50%;
      overflow: hidden;
      user-select: none;
      background-color: var(--ui-avatar-bg, #e5e7eb);
      color: var(--ui-avatar-color, #4b5563);
      transition: all 0.2s ease;
    }

    .avatar.square {
      border-radius: 0;
    }

    .avatar.rounded {
      border-radius: var(--ui-border-radius-md, 6px);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .initials {
      text-transform: uppercase;
    }

    /* Size variants */
    :host([size="small"]) { --ui-avatar-size: 32px; }
    :host([size="medium"]) { --ui-avatar-size: 40px; }
    :host([size="large"]) { --ui-avatar-size: 56px; }
    :host([size="xlarge"]) { --ui-avatar-size: 80px; }

    /* Skeleton state */
    .avatar.loading {
      background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
    }

    @keyframes loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `;fl([E({type:String})],ga.prototype,"src",2);fl([E({type:String})],ga.prototype,"alt",2);fl([E({type:String})],ga.prototype,"initials",2);fl([E({type:String})],ga.prototype,"variant",2);fl([E({type:String,reflect:!0})],ga.prototype,"size",2);fl([si()],ga.prototype,"_hasError",2);fl([si()],ga.prototype,"_isLoading",2);ga=fl([te("ui-avatar")],ga);const io=R.forwardRef(function({src:l,alt:r,initials:c,variant:u,size:f,children:b,...v},N){const O=R.useRef(null),z=N??O;return R.useEffect(()=>{const A=z.current;A&&(l!==void 0&&(A.src=l),r!==void 0&&(A.alt=r),c!==void 0&&(A.initials=c),u!==void 0&&(A.variant=u),f!==void 0&&(A.size=f))},[l,r,c,u,f]),h.jsxDEV("ui-avatar",{ref:z,...v,children:b},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiAvatar.tsx",lineNumber:36,columnNumber:13},this)});io.displayName="UiAvatar";var C3=Object.defineProperty,k3=Object.getOwnPropertyDescriptor,dy=(p,l,r,c)=>{for(var u=c>1?void 0:c?k3(l,r):l,f=p.length-1,b;f>=0;f--)(b=p[f])&&(u=(c?b(l,r,u):b(u))||u);return c&&u&&C3(l,r,u),u};let Cc=class extends W{constructor(){super(...arguments),this.variant="elevated",this.interactive=!1}render(){const l={card:!0,[`variant-${this.variant}`]:!0,interactive:this.interactive};return $`
      <div class=${qe(l)} part="card">
        <slot></slot>
      </div>
    `}};Cc.styles=ee`
    :host {
      display: block;
      font-family: 'Inter', sans-serif;
    }
    
    .card {
      background: var(--ui-card-background, white);
      border-radius: var(--ui-card-border-radius, 12px);
      box-shadow: var(--ui-card-shadow, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05));
      border: 1px solid var(--ui-card-border-color, #f3f4f6);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: box-shadow 0.3s ease, border-color 0.3s ease;
      padding: var(--ui-card-padding, 0); /* Cards usually don't have padding at the root level if using content blocks */
    }

    /* Interactive Hover effect */
    .card.interactive:hover {
      box-shadow: var(--ui-card-shadow-hover, 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04));
      cursor: pointer;
    }

    /* Variants */
    .card.variant-outlined {
      box-shadow: none;
      border: 1px solid var(--ui-card-border-color, #d1d5db);
    }
    
    .card.variant-flat {
      box-shadow: none;
      border: none;
      background: var(--ui-card-background-flat, #f3f4f6);
    }
  `;dy([E({type:String,reflect:!0})],Cc.prototype,"variant",2);dy([E({type:Boolean,reflect:!0})],Cc.prototype,"interactive",2);Cc=dy([te("ui-card")],Cc);const e_=R.forwardRef(function({variant:l,interactive:r,children:c,...u},f){const b=R.useRef(null),v=f??b;return R.useEffect(()=>{const N=v.current;N&&(l!==void 0&&(N.variant=l),r!==void 0&&(N.interactive=r))},[l,r]),h.jsxDEV("ui-card",{ref:v,...u,children:c},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiCard.tsx",lineNumber:30,columnNumber:13},this)});e_.displayName="UiCard";var O3=Object.getOwnPropertyDescriptor,z3=(p,l,r,c)=>{for(var u=c>1?void 0:c?O3(l,r):l,f=p.length-1,b;f>=0;f--)(b=p[f])&&(u=b(u)||u);return u};let Vg=class extends W{render(){return $`
      <slot></slot>
    `}};Vg.styles=ee`
    :host {
      display: block;
      padding: var(--ui-card-content-padding, 16px 24px);
      font-size: var(--ui-card-content-size, 1rem);
      color: var(--ui-card-content-color, #4b5563);
      line-height: 1.5;
    }
  `;Vg=z3([te("ui-card-content")],Vg);const t_=R.forwardRef(function({children:l,...r},c){const u=R.useRef(null),f=c??u;return h.jsxDEV("ui-card-content",{ref:f,...r,children:l},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiCardContent.tsx",lineNumber:20,columnNumber:13},this)});t_.displayName="UiCardContent";var j3=Object.defineProperty,V3=Object.getOwnPropertyDescriptor,fy=(p,l,r,c)=>{for(var u=c>1?void 0:c?V3(l,r):l,f=p.length-1,b;f>=0;f--)(b=p[f])&&(u=(c?b(l,r,u):b(u))||u);return c&&u&&j3(l,r,u),u};let kc=class extends W{constructor(){super(...arguments),this.title="",this.subtitle=""}render(){return $`
      <div class="header" part="header">
        <slot name="avatar"></slot>
        <div class="content" part="content">
          ${this.title?$`<h3 class="title" part="title">${this.title}</h3>`:""}
          ${this.subtitle?$`<p class="subtitle" part="subtitle">${this.subtitle}</p>`:""}
          <slot></slot>
        </div>
        <slot name="action"></slot>
      </div>
    `}};kc.styles=ee`
    :host {
      display: block;
      padding: var(--ui-card-header-padding, 16px 24px);
    }
    
    .header {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    
    .content {
      flex: 1 1 auto;
    }

    .title {
      margin: 0;
      font-size: var(--ui-card-title-size, 1.25rem);
      font-weight: 700;
      color: var(--ui-card-title-color, #111827);
      line-height: 1.4;
    }
    
    .subtitle {
      margin: 0;
      font-size: var(--ui-card-subtitle-size, 0.875rem);
      color: var(--ui-card-subtitle-color, #6b7280);
      font-weight: 500;
      margin-top: 4px;
    }
  `;fy([E({type:String})],kc.prototype,"title",2);fy([E({type:String})],kc.prototype,"subtitle",2);kc=fy([te("ui-card-header")],kc);const i_=R.forwardRef(function({title:l,subtitle:r,children:c,...u},f){const b=R.useRef(null),v=f??b;return R.useEffect(()=>{const N=v.current;N&&(l!==void 0&&(N.title=l),r!==void 0&&(N.subtitle=r))},[l,r]),h.jsxDEV("ui-card-header",{ref:v,...u,children:c},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiCardHeader.tsx",lineNumber:30,columnNumber:13},this)});i_.displayName="UiCardHeader";var $3=Object.getOwnPropertyDescriptor,M3=(p,l,r,c)=>{for(var u=c>1?void 0:c?$3(l,r):l,f=p.length-1,b;f>=0;f--)(b=p[f])&&(u=b(u)||u);return u};let $g=class extends W{render(){return $`
      <slot></slot>
    `}};$g.styles=ee`
    :host {
      display: flex;
      padding: var(--ui-card-actions-padding, 8px 16px);
      align-items: center;
      gap: 8px;
    }
  `;$g=M3([te("ui-card-actions")],$g);const n_=R.forwardRef(function({children:l,...r},c){const u=R.useRef(null),f=c??u;return h.jsxDEV("ui-card-actions",{ref:f,...r,children:l},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiCardActions.tsx",lineNumber:20,columnNumber:13},this)});n_.displayName="UiCardActions";const AE={CHANGE:"ui-accordion-change"};var B3=Object.defineProperty,L3=Object.getOwnPropertyDescriptor,Lr=(p,l,r,c)=>{for(var u=c>1?void 0:c?L3(l,r):l,f=p.length-1,b;f>=0;f--)(b=p[f])&&(u=(c?b(l,r,u):b(u))||u);return c&&u&&B3(l,r,u),u};let Oc=class extends W{constructor(){super(),this.expanded=!1,this.disabled=!1,this._handleToggle=()=>{this.disabled||(this.expanded=!this.expanded,this.dispatchEvent(new CustomEvent("ui-accordion-change",{detail:{expanded:this.expanded},bubbles:!0,composed:!0})))},this.addEventListener("ui-accordion-toggle",this._handleToggle)}updated(l){(l.has("expanded")||l.has("disabled"))&&this.querySelectorAll("ui-accordion-summary, ui-accordion-details, ui-accordion-actions").forEach(r=>{this.expanded?r.setAttribute("expanded",""):r.removeAttribute("expanded"),this.disabled?r.setAttribute("disabled",""):r.removeAttribute("disabled")})}render(){return $`
            <div class="accordion-container" role="region">
                <slot></slot>
            </div>
        `}};Oc.styles=ee`
        :host {
            display: block;
            border-top: 1px solid var(--ui-border-color, #e5e7eb);
            background-color: var(--ui-surface-background, #ffffff);
            color: var(--ui-text-color, #111827);
            transition: margin 150ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        :host(:first-of-type) {
            border-top: none;
            border-top-left-radius: var(--ui-border-radius-md, 4px);
            border-top-right-radius: var(--ui-border-radius-md, 4px);
        }

        :host(:last-of-type) {
            border-bottom-left-radius: var(--ui-border-radius-md, 4px);
            border-bottom-right-radius: var(--ui-border-radius-md, 4px);
        }

        :host([expanded]) {
            margin: 16px 0;
            border-top: none;
            box-shadow: var(--ui-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
        }

        :host([expanded]:first-of-type) {
            margin-top: 0;
        }

        :host([expanded]:last-of-type) {
            margin-bottom: 0;
        }

        .accordion-container {
            display: flex;
            flex-direction: column;
        }
    `;Lr([E({type:Boolean,reflect:!0})],Oc.prototype,"expanded",2);Lr([E({type:Boolean,reflect:!0})],Oc.prototype,"disabled",2);Oc=Lr([te("ui-accordion")],Oc);let Mg=class extends W{constructor(){super(),this._handleActivate=()=>{this.dispatchEvent(new CustomEvent("ui-accordion-toggle",{bubbles:!0,composed:!0}))},this._handleKeyDown=l=>{(l.key==="Enter"||l.key===" ")&&(l.preventDefault(),this._handleActivate())},this.addEventListener("click",this._handleActivate),this.addEventListener("keydown",this._handleKeyDown)}connectedCallback(){super.connectedCallback(),this.hasAttribute("role")||this.setAttribute("role","button"),this.hasAttribute("tabindex")||this.setAttribute("tabindex","0")}render(){return $`
            <div class="content">
                <slot></slot>
            </div>
            <div class="expand-icon">
                <slot name="expandIcon">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </slot>
            </div>
        `}};Mg.styles=ee`
        :host {
            display: flex;
            align-items: center;
            padding: 0 16px;
            min-height: 48px;
            cursor: pointer;
            user-select: none;
            transition: min-height 150ms cubic-bezier(0.4, 0, 0.2, 1), background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        :host(:focus-visible) {
            outline: 2px solid var(--ui-primary-color, #3b82f6);
            outline-offset: -2px;
        }

        :host(:hover) {
            background-color: var(--ui-hover-color, rgba(0, 0, 0, 0.04));
        }

        :host([expanded]) {
            min-height: 64px;
        }

        :host([disabled]) {
            cursor: default;
            opacity: 0.5;
            pointer-events: none;
        }

        .content {
            display: flex;
            flex-grow: 1;
            margin: 12px 0;
            font-family: var(--ui-font-family, sans-serif);
            font-weight: 500;
        }

        .expand-icon {
            display: flex;
            padding: 8px;
            border-radius: 50%;
            color: var(--ui-text-color-muted, #6b7280);
            transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        :host([expanded]) .expand-icon {
            transform: rotate(180deg);
        }
    `;Mg=Lr([te("ui-accordion-summary")],Mg);let Bg=class extends W{render(){return $`
            <div class="details-inner">
                <div class="content">
                    <slot></slot>
                </div>
            </div>
        `}};Bg.styles=ee`
        :host {
            display: grid;
            grid-template-rows: 0fr;
            transition: grid-template-rows 150ms cubic-bezier(0.4, 0, 0.2, 1);
            overflow: hidden;
        }

        :host([expanded]) {
            grid-template-rows: 1fr;
        }

        .details-inner {
            min-height: 0;
        }

        .content {
            padding: 8px 16px 16px;
            font-family: var(--ui-font-family, sans-serif);
            font-size: 0.875rem;
            color: var(--ui-text-color, #111827);
        }
    `;Bg=Lr([te("ui-accordion-details")],Bg);let Lg=class extends W{render(){return $`<slot></slot>`}};Lg.styles=ee`
        :host {
            display: none;
            padding: 8px 16px 16px;
            justify-content: flex-end;
            gap: 8px;
            border-top: 1px solid var(--ui-border-color, #e5e7eb);
        }

        :host([expanded]) {
            display: flex;
        }
    `;Lg=Lr([te("ui-accordion-actions")],Lg);const a_=R.forwardRef(function({expanded:l,disabled:r,onUiAccordionChange:c,children:u,...f},b){const v=R.useRef(null),N=b??v;return R.useEffect(()=>{const O=N.current;O&&(l!==void 0&&(O.expanded=l),r!==void 0&&(O.disabled=r))},[l,r]),R.useEffect(()=>{const O=N.current;if(!O||!c)return;const z=c;return O.addEventListener(AE.CHANGE,z),()=>O.removeEventListener(AE.CHANGE,z)},[c]),h.jsxDEV("ui-accordion",{ref:N,...f,children:u},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiAccordion.tsx",lineNumber:40,columnNumber:13},this)});a_.displayName="UiAccordion";const DE={ACCORDION_TOGGLE:"ui-accordion-toggle"},o_=R.forwardRef(function({onUiAccordionToggle:l,children:r,...c},u){const f=R.useRef(null),b=u??f;return R.useEffect(()=>{const v=b.current;if(!v||!l)return;const N=l;return v.addEventListener(DE.ACCORDION_TOGGLE,N),()=>v.removeEventListener(DE.ACCORDION_TOGGLE,N)},[l]),h.jsxDEV("ui-accordion-summary",{ref:b,...c,children:r},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiAccordionSummary.tsx",lineNumber:31,columnNumber:13},this)});o_.displayName="UiAccordionSummary";const l_=R.forwardRef(function({children:l,...r},c){const u=R.useRef(null),f=c??u;return h.jsxDEV("ui-accordion-details",{ref:f,...r,children:l},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiAccordionDetails.tsx",lineNumber:20,columnNumber:13},this)});l_.displayName="UiAccordionDetails";const UE={TAB_CHANGE:"ui-tab-change"};var H3=Object.defineProperty,q3=Object.getOwnPropertyDescriptor,at=(p,l,r,c)=>{for(var u=c>1?void 0:c?q3(l,r):l,f=p.length-1,b;f>=0;f--)(b=p[f])&&(u=(c?b(l,r,u):b(u))||u);return c&&u&&H3(l,r,u),u};const jp=p=>$`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${p}"/></svg>`,Y3=()=>jp("M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"),G3=()=>jp("M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"),X3=()=>jp("M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"),Q3=()=>jp("M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z");let ro=class extends W{constructor(){super(...arguments),this.value="",this.disabled=!1,this.selected=!1,this.iconPosition="start",this.href="",this.fullWidth=!1}setTabIndex(l){const r=this.shadowRoot?.querySelector("button,a");r&&(r.tabIndex=l)}focusInner(){this.shadowRoot?.querySelector("button,a")?.focus()}_fire(){this.disabled||this.dispatchEvent(new CustomEvent("ui-tab-click",{detail:{value:this.value},bubbles:!0,composed:!0}))}_inner(){return $`
            <span class="icon-slot"><slot name="icon"></slot></span>
            <slot></slot>`}render(){const l=qe({tab:!0,[`icon-${this.iconPosition}`]:!0});return this.href?$`<a class=${l} href=${this.href}
                role="tab"
                aria-selected=${this.selected?"true":"false"}
                aria-disabled=${this.disabled?"true":"false"}
                tabindex=${this.selected?"0":"-1"}
                @click=${this._fire}>${this._inner()}</a>`:$`<button class=${l}
            role="tab"
            ?disabled=${this.disabled}
            aria-selected=${this.selected?"true":"false"}
            tabindex=${this.selected?"0":"-1"}
            @click=${this._fire}>${this._inner()}</button>`}};ro.styles=ee`
        :host { display: inline-flex; position: relative; background: var(--ui-surface-background, #fff); }
        :host([full-width]) { flex: 1; }

        .tab {
            display: inline-flex; align-items: center; justify-content: center;
            gap: 6px; padding: 10px 16px; min-height: 48px;
            border: none; background: none; cursor: pointer;
            font-family: var(--ui-font-family,'Inter',sans-serif);
            font-size: .875rem; font-weight: 500; line-height: 1.25;
            color: var(--ui-tab-inactive, #6b7280);
            white-space: nowrap; border-radius: 0; outline: none;
            transition: color .2s, background .15s;
            box-sizing: border-box; width: 100%;
            text-decoration: none; -webkit-tap-highlight-color: transparent;
        }
        .tab:hover:not(:disabled):not([aria-disabled="true"]) {
            color: var(--ui-tab-active, #3b82f6);
            background: rgba(59,130,246,.04);
        }
        .tab:focus-visible {
            outline: 2px solid var(--ui-tab-active, #3b82f6);
            outline-offset: -2px;
        }
        :host([selected]) .tab { color: var(--ui-tab-active, #3b82f6); font-weight: 600; }
        .tab:disabled { color: rgba(0,0,0,.26); cursor: not-allowed; }

        /* icon positions */
        .icon-top    { flex-direction: column; min-height: 72px; }
        .icon-bottom { flex-direction: column-reverse; min-height: 72px; }
        .icon-start  { flex-direction: row; }
        .icon-end    { flex-direction: row-reverse; }

        .icon-slot { display: contents; line-height: 0; }
    `;at([E({reflect:!0})],ro.prototype,"value",2);at([E({type:Boolean,reflect:!0})],ro.prototype,"disabled",2);at([E({type:Boolean,reflect:!0})],ro.prototype,"selected",2);at([E({attribute:"icon-position",reflect:!0})],ro.prototype,"iconPosition",2);at([E()],ro.prototype,"href",2);at([E({type:Boolean,reflect:!0,attribute:"full-width"})],ro.prototype,"fullWidth",2);ro=at([te("ui-tab")],ro);let Sp=class extends W{constructor(){super(...arguments),this.value=""}render(){return $`<div class="panel" role="tabpanel"><slot></slot></div>`}};Sp.styles=ee`
        :host         { display: block; background: var(--ui-surface-background, #fff); }
        :host([hidden]){ display: none !important; }
        .panel        { padding: 24px; font-family: var(--ui-font-family,'Inter',sans-serif);
                        font-size: .875rem; color: #374151; line-height: 1.6; }
    `;at([E({reflect:!0})],Sp.prototype,"value",2);Sp=at([te("ui-tab-panel")],Sp);let Ji=class extends W{constructor(){super(...arguments),this.orientation="horizontal",this.variant="standard",this.centered=!1,this.scrollButtons="auto",this._canBack=!1,this._canFwd=!1}connectedCallback(){super.connectedCallback()}firstUpdated(){typeof ResizeObserver<"u"&&(this._ro=new ResizeObserver(()=>{this._checkScroll(),this.syncIndicator()}),this._ro.observe(this._area)),this._area.addEventListener("scroll",()=>this._checkScroll(),{passive:!0}),this._checkScroll(),requestAnimationFrame(()=>this.syncIndicator())}disconnectedCallback(){this._ro?.disconnect(),super.disconnectedCallback()}_tabs(){return this._slot?this._slot.assignedElements({flatten:!0}).filter(l=>l.tagName==="UI-TAB"):[]}_checkScroll(){const l=this._area;l&&(this.orientation==="horizontal"?(this._canBack=l.scrollLeft>1,this._canFwd=l.scrollLeft<l.scrollWidth-l.clientWidth-1):(this._canBack=l.scrollTop>1,this._canFwd=l.scrollTop<l.scrollHeight-l.clientHeight-1))}syncIndicator(){const l=this._tabs().find(u=>u.selected);if(!l||!this._ind||!this._row)return;const r=this._row.getBoundingClientRect(),c=l.getBoundingClientRect();!c.width&&!c.height||(this.orientation==="horizontal"?(this._ind.style.left=`${c.left-r.left}px`,this._ind.style.width=`${c.width}px`,this._ind.style.top="",this._ind.style.height=""):(this._ind.style.top=`${c.top-r.top}px`,this._ind.style.height=`${c.height}px`,this._ind.style.left="",this._ind.style.width=""),this._ind.style.opacity="1")}_scroll(l){this.orientation==="horizontal"?this._area.scrollBy({left:l,behavior:"smooth"}):this._area.scrollBy({top:l,behavior:"smooth"})}_onKey(l){const r=this.orientation==="horizontal",c=r?"ArrowLeft":"ArrowUp",u=r?"ArrowRight":"ArrowDown";if(![c,u,"Home","End"].includes(l.key))return;l.preventDefault();const f=this._tabs().filter(N=>!N.disabled),b=f.findIndex(N=>N.contains(document.activeElement)||N===document.activeElement);let v=b<0?0:b;l.key===c&&(v=(v-1+f.length)%f.length),l.key===u&&(v=(v+1)%f.length),l.key==="Home"&&(v=0),l.key==="End"&&(v=f.length-1),f[v]?.focusInner(),f[v]?.dispatchEvent(new CustomEvent("ui-tab-click",{detail:{value:f[v].value},bubbles:!0,composed:!0}))}_onSlotChange(){this._checkScroll(),requestAnimationFrame(()=>this.syncIndicator())}render(){const l=this.variant==="scrollable"&&this.scrollButtons!=="false",r=this.orientation==="vertical",c=l?$`
            <button class="scroll-btn" aria-label="Scroll back"
                ?disabled=${!this._canBack}
                @click=${()=>this._scroll(-200)}>
                ${r?X3():Y3()}
            </button>`:pe,u=l?$`
            <button class="scroll-btn" aria-label="Scroll forward"
                ?disabled=${!this._canFwd}
                @click=${()=>this._scroll(200)}>
                ${r?Q3():G3()}
            </button>`:pe;return $`
            <div class="container">
                ${c}
                <div class="scroll-area" @keydown=${this._onKey}>
                    <div class="tabs-row" role="tablist">
                        <slot @slotchange=${this._onSlotChange}></slot>
                        <div class="indicator"></div>
                    </div>
                </div>
                ${u}
            </div>`}};Ji.styles=ee`
        :host { display: block; position: relative; background: var(--ui-surface-background, #fff); }
        /* In vertical mode the host must fill the height that flex-stretching gives it
           so .scroll-area has a bounded height and overflow:auto actually fires. */
        :host([orientation="vertical"]) { height: 100%; }
        :host([orientation="vertical"]) .container { height: 100%; }

        .container {
            display: flex; align-items: center; position: relative;
            border-bottom: 1px solid #e5e7eb;
        }
        :host([orientation="vertical"]) .container {
            flex-direction: column; border-bottom: none;
            border-right: 1px solid #e5e7eb; align-items: stretch;
        }

        /* scroll buttons */
        .scroll-btn {
            flex-shrink: 0; display: flex; align-items: center; justify-content: center;
            border: none; background: none; cursor: pointer; color: #6b7280;
            border-radius: 4px; padding: 0;
            transition: color .15s, background .15s;
        }
        /* Horizontal: fixed square on left/right of the scroll area */
        :host(:not([orientation="vertical"])) .scroll-btn { width: 40px; height: 40px; }
        /* Vertical: full-width bar on top/bottom — centres the chevron across the sidebar */
        :host([orientation="vertical"]) .scroll-btn     { width: 100%; height: 40px; }
        .scroll-btn:hover:not(:disabled) { color: #374151; background: rgba(0,0,0,.05); }
        .scroll-btn:disabled { opacity: .38; cursor: default; }

        /* scroll area – axis-locked so scroll events don't bleed to the page */
        .scroll-area {
            flex: 1; position: relative; min-height: 0;
            scrollbar-width: none; -ms-overflow-style: none;
        }
        .scroll-area::-webkit-scrollbar { display: none; }
        :host(:not([orientation="vertical"])) .scroll-area {
            overflow-x: auto; overflow-y: hidden;
        }
        :host([orientation="vertical"]) .scroll-area {
            overflow-y: auto; overflow-x: hidden;
        }

        /* tabs row */
        .tabs-row {
            display: flex; position: relative;
            min-width: max-content;
        }
        :host([orientation="vertical"]) .tabs-row {
            flex-direction: column; min-width: unset; min-height: max-content;
        }
        :host([variant="fullWidth"]) .tabs-row  { min-width: 100%; }
        :host([variant="fullWidth"]) ::slotted(ui-tab) { flex: 1; }
        :host([centered]) .tabs-row { justify-content: center; min-width: 100%; }

        /* indicator */
        .indicator {
            position: absolute; pointer-events: none; opacity: 0;
            background: var(--ui-tabs-ind-color, #3b82f6); border-radius: 3px;
            transition:
                left   .25s cubic-bezier(.4,0,.2,1),
                width  .25s cubic-bezier(.4,0,.2,1),
                top    .25s cubic-bezier(.4,0,.2,1),
                height .25s cubic-bezier(.4,0,.2,1),
                opacity .15s;
        }
        :host(:not([orientation="vertical"])) .indicator { bottom: 0; height: 3px; }
        :host([orientation="vertical"])       .indicator { right: 0;  width: 3px; }
    `;at([E({reflect:!0})],Ji.prototype,"orientation",2);at([E({reflect:!0})],Ji.prototype,"variant",2);at([E({type:Boolean,reflect:!0})],Ji.prototype,"centered",2);at([E({attribute:"scroll-buttons"})],Ji.prototype,"scrollButtons",2);at([si()],Ji.prototype,"_canBack",2);at([si()],Ji.prototype,"_canFwd",2);at([Lc(".scroll-area")],Ji.prototype,"_area",2);at([Lc(".tabs-row")],Ji.prototype,"_row",2);at([Lc(".indicator")],Ji.prototype,"_ind",2);at([Lc("slot")],Ji.prototype,"_slot",2);Ji=at([te("ui-tab-list")],Ji);let ya=class extends W{constructor(){super(...arguments),this.value="",this.orientation="horizontal",this.variant="standard",this.centered=!1,this.scrollButtons="auto",this.textColor="primary",this.indicatorColor="primary",this._onTabClick=l=>{this.value=l.detail.value,this.dispatchEvent(new CustomEvent("ui-tab-change",{detail:{value:l.detail.value},bubbles:!0,composed:!0})),this._syncAll()}}connectedCallback(){super.connectedCallback(),this.addEventListener("ui-tab-click",this._onTabClick)}disconnectedCallback(){this.removeEventListener("ui-tab-click",this._onTabClick),super.disconnectedCallback()}_resolveColor(l){return l==="primary"?"#3b82f6":l==="secondary"?"#8b5cf6":l==="inherit"?"currentColor":l}_syncAll(){const l=this.querySelector("ui-tab-list"),r=Array.from(this.querySelectorAll("ui-tab")),c=Array.from(this.querySelectorAll("ui-tab-panel"));let u=this.value;if(!u){const v=r.find(N=>!N.disabled);v&&(u=v.value)}l&&(l.orientation=this.orientation,l.variant=this.variant,l.centered=this.centered,l.scrollButtons=this.scrollButtons,l.style.setProperty("--ui-tabs-ind-color",this._resolveColor(this.indicatorColor)));const f=this._resolveColor(this.textColor),b=this.textColor==="inherit"?"currentColor":"#6b7280";r.forEach(v=>{v.selected=v.value===u,v.fullWidth=this.variant==="fullWidth",v.style.setProperty("--ui-tab-active",f),v.style.setProperty("--ui-tab-inactive",b),v.setAttribute("id",`tab-${v.value}`),v.setAttribute("aria-controls",`panel-${v.value}`)}),c.forEach(v=>{v.setAttribute("id",`panel-${v.value}`),v.setAttribute("aria-labelledby",`tab-${v.value}`),v.value===u?v.removeAttribute("hidden"):v.setAttribute("hidden","")}),requestAnimationFrame(()=>l?.syncIndicator())}updated(l){["value","orientation","variant","centered","scrollButtons","textColor","indicatorColor"].some(c=>l.has(c))&&this._syncAll()}render(){return $`
            <div class="root">
                <slot @slotchange=${()=>this._syncAll()}></slot>
            </div>`}};ya.styles=ee`
        :host { display: block; font-family: var(--ui-font-family,'Inter',sans-serif);
                background: var(--ui-surface-background, #fff); }
        /* Vertical: stretch the root div so panels fill available height */
        :host([orientation="vertical"]) .root {
            display: flex; flex-direction: row;
            height: 100%; min-height: inherit;
        }
        .root { display: block; }
    `;at([E({reflect:!0})],ya.prototype,"value",2);at([E({reflect:!0})],ya.prototype,"orientation",2);at([E()],ya.prototype,"variant",2);at([E({type:Boolean})],ya.prototype,"centered",2);at([E({attribute:"scroll-buttons"})],ya.prototype,"scrollButtons",2);at([E({attribute:"text-color"})],ya.prototype,"textColor",2);at([E({attribute:"indicator-color"})],ya.prototype,"indicatorColor",2);ya=at([te("ui-tabs")],ya);const s_=R.forwardRef(function({value:l,orientation:r,variant:c,centered:u,scrollButtons:f,textColor:b,indicatorColor:v,onUiTabChange:N,children:O,...z},A){const x=R.useRef(null),C=A??x;return R.useEffect(()=>{const B=C.current;B&&(l!==void 0&&(B.value=l),r!==void 0&&(B.orientation=r),c!==void 0&&(B.variant=c),u!==void 0&&(B.centered=u),f!==void 0&&(B.scrollButtons=f),b!==void 0&&(B.textColor=b),v!==void 0&&(B.indicatorColor=v))},[l,r,c,u,f,b,v]),R.useEffect(()=>{const B=C.current;if(!B||!N)return;const G=N;return B.addEventListener(UE.TAB_CHANGE,G),()=>B.removeEventListener(UE.TAB_CHANGE,G)},[N]),h.jsxDEV("ui-tabs",{ref:C,...z,children:O},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiTabs.tsx",lineNumber:50,columnNumber:13},this)});s_.displayName="UiTabs";const TE={CLICK:"ui-tab-click"},hp=R.forwardRef(function({value:l,disabled:r,selected:c,iconPosition:u,href:f,fullWidth:b,onUiTabClick:v,children:N,...O},z){const A=R.useRef(null),x=z??A;return R.useEffect(()=>{const C=x.current;C&&(l!==void 0&&(C.value=l),r!==void 0&&(C.disabled=r),c!==void 0&&(C.selected=c),u!==void 0&&(C.iconPosition=u),f!==void 0&&(C.href=f),b!==void 0&&(C.fullWidth=b))},[l,r,c,u,f,b]),R.useEffect(()=>{const C=x.current;if(!C||!v)return;const B=v;return C.addEventListener(TE.CLICK,B),()=>C.removeEventListener(TE.CLICK,B)},[v]),h.jsxDEV("ui-tab",{ref:x,...O,children:N},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiTab.tsx",lineNumber:48,columnNumber:13},this)});hp.displayName="UiTab";const RE={TAB_CLICK:"ui-tab-click"},r_=R.forwardRef(function({orientation:l,variant:r,centered:c,scrollButtons:u,onUiTabClick:f,children:b,...v},N){const O=R.useRef(null),z=N??O;return R.useEffect(()=>{const A=z.current;A&&(l!==void 0&&(A.orientation=l),r!==void 0&&(A.variant=r),c!==void 0&&(A.centered=c),u!==void 0&&(A.scrollButtons=u))},[l,r,c,u]),R.useEffect(()=>{const A=z.current;if(!A||!f)return;const x=f;return A.addEventListener(RE.TAB_CLICK,x),()=>A.removeEventListener(RE.TAB_CLICK,x)},[f]),h.jsxDEV("ui-tab-list",{ref:z,...v,children:b},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiTabList.tsx",lineNumber:44,columnNumber:13},this)});r_.displayName="UiTabList";const mp=R.forwardRef(function({value:l,children:r,...c},u){const f=R.useRef(null),b=u??f;return R.useEffect(()=>{const v=b.current;v&&l!==void 0&&(v.value=l)},[l]),h.jsxDEV("ui-tab-panel",{ref:b,...c,children:r},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiTabPanel.tsx",lineNumber:28,columnNumber:13},this)});mp.displayName="UiTabPanel";var Z3=Object.defineProperty,P3=Object.getOwnPropertyDescriptor,Hr=(p,l,r,c)=>{for(var u=c>1?void 0:c?P3(l,r):l,f=p.length-1,b;f>=0;f--)(b=p[f])&&(u=(c?b(l,r,u):b(u))||u);return c&&u&&Z3(l,r,u),u};let Vn=class extends W{constructor(){super(...arguments),this.variant="indeterminate",this.value=0,this.height=4,this.color="primary",this.label=""}get _safeValue(){return Math.min(100,Math.max(0,this.value))}render(){const l=this.variant==="determinate",r=Vn._colorMap[this.color]??Vn._colorMap.primary,c=[`--ui-linear-progress-height: ${this.height}px`,`--ui-linear-progress-color: ${r}`].join("; ");return $`
      <div
        class="root ${qe({determinate:l,indeterminate:!l})}"
        role="progressbar"
        aria-valuenow="${l?this._safeValue:pe}"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="${this.label||pe}"
        style="${c}"
      >
        ${l?$`
          <div class="bar" style="transform: scaleX(${this._safeValue/100})"></div>
        `:$`
          <div class="bar bar1"></div>
          <div class="bar bar2"></div>
        `}
      </div>
    `}};Vn.styles=ee`
    :host {
      display: block;
      width: 100%;
      --ui-linear-progress-height: 4px;
      --ui-linear-progress-color: var(--ui-primary-color, #3b82f6);
      --ui-linear-progress-bg: rgba(59, 130, 246, 0.15);
    }

    .root {
      position: relative;
      overflow: hidden;
      height: var(--ui-linear-progress-height);
      background-color: var(--ui-linear-progress-bg);
      border-radius: calc(var(--ui-linear-progress-height) / 2);
    }

    .bar {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      top: 0;
      transition: transform 0.4s linear;
      transform-origin: left;
      background-color: var(--ui-linear-progress-color);
      border-radius: inherit;
    }

    .indeterminate .bar1 {
      width: auto;
      animation: indeterminate1 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    }

    .indeterminate .bar2 {
      width: auto;
      animation: indeterminate2 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
      animation-delay: 1.15s;
    }

    @keyframes indeterminate1 {
      0% {
        left: -35%;
        right: 100%;
      }
      60% {
        left: 100%;
        right: -90%;
      }
      100% {
        left: 100%;
        right: -90%;
      }
    }

    @keyframes indeterminate2 {
      0% {
        left: -200%;
        right: 100%;
      }
      60% {
        left: 107%;
        right: -8%;
      }
      100% {
        left: 107%;
        right: -8%;
      }
    }
  `;Vn._colorMap={primary:"#3b82f6",success:"#22c55e",error:"#ef4444",warning:"#f59e0b"};Hr([E({type:String,reflect:!0})],Vn.prototype,"variant",2);Hr([E({type:Number,reflect:!0})],Vn.prototype,"value",2);Hr([E({type:Number})],Vn.prototype,"height",2);Hr([E({type:String,reflect:!0})],Vn.prototype,"color",2);Hr([E({type:String})],Vn.prototype,"label",2);Vn=Hr([te("ui-linear-progress")],Vn);const Tr=R.forwardRef(function({variant:l,value:r,height:c,color:u,label:f,children:b,...v},N){const O=R.useRef(null),z=N??O;return R.useEffect(()=>{const A=z.current;A&&(l!==void 0&&(A.variant=l),r!==void 0&&(A.value=r),c!==void 0&&(A.height=c),u!==void 0&&(A.color=u),f!==void 0&&(A.label=f))},[l,r,c,u,f]),h.jsxDEV("ui-linear-progress",{ref:z,...v,children:b},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiLinearProgress.tsx",lineNumber:36,columnNumber:13},this)});Tr.displayName="UiLinearProgress";var J3=Object.defineProperty,I3=Object.getOwnPropertyDescriptor,bs=(p,l,r,c)=>{for(var u=c>1?void 0:c?I3(l,r):l,f=p.length-1,b;f>=0;f--)(b=p[f])&&(u=(c?b(l,r,u):b(u))||u);return c&&u&&J3(l,r,u),u};let yn=class extends W{constructor(){super(...arguments),this.variant="indeterminate",this.value=0,this.size=40,this.thickness=3.6,this.color="primary",this.label=""}get _safeValue(){return Math.min(100,Math.max(0,this.value))}render(){const l=this.variant==="determinate",r=20-this.thickness/2,c=2*Math.PI*r,u=c-this._safeValue/100*c,f=yn._colorMap[this.color]??yn._colorMap.primary;return $`
      <div
        class="circular-root ${qe({determinate:l,indeterminate:!l})}"
        style="--ui-circular-progress-size: ${this.size}px; --ui-circular-progress-thickness: ${this.thickness}; --ui-circular-progress-color: ${f}"
        role="progressbar"
        aria-valuenow="${l?this._safeValue:pe}"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="${this.label||pe}"
      >
        <svg viewBox="22 22 44 44">
          <circle
            class="circle"
            cx="44"
            cy="44"
            r="${r}"
            fill="none"
            stroke-width="${this.thickness}"
            style="${l?`stroke-dasharray: ${c}; stroke-dashoffset: ${u}px`:""}"
          ></circle>
        </svg>
      </div>
    `}};yn.styles=ee`
    :host {
      display: inline-block;
      --ui-circular-progress-size: 40px;
      --ui-circular-progress-color: var(--ui-primary-color, #3b82f6);
      --ui-circular-progress-thickness: 3.6;
    }

    .circular-root {
      width: var(--ui-circular-progress-size);
      height: var(--ui-circular-progress-size);
      display: inline-block;
      animation: rotate 1.4s linear infinite;
    }

    .circular-root.determinate {
      animation: none;
      transform: rotate(-90deg);
    }

    svg {
      display: block;
    }

    circle {
      stroke: var(--ui-circular-progress-color);
      stroke-linecap: round;
      transition: stroke-dashoffset 0.3s ease;
    }

    .indeterminate circle {
      animation: dash 1.4s ease-in-out infinite;
      stroke-dasharray: 80, 200;
      stroke-dashoffset: 0;
    }

    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes dash {
      0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35px;
      }
      100% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124px;
      }
    }
  `;yn._colorMap={primary:"#3b82f6",success:"#22c55e",error:"#ef4444",warning:"#f59e0b"};bs([E({type:String,reflect:!0})],yn.prototype,"variant",2);bs([E({type:Number,reflect:!0})],yn.prototype,"value",2);bs([E({type:Number})],yn.prototype,"size",2);bs([E({type:Number})],yn.prototype,"thickness",2);bs([E({type:String,reflect:!0})],yn.prototype,"color",2);bs([E({type:String})],yn.prototype,"label",2);yn=bs([te("ui-circular-progress")],yn);const bp=R.forwardRef(function({variant:l,value:r,size:c,thickness:u,color:f,label:b,children:v,...N},O){const z=R.useRef(null),A=O??z;return R.useEffect(()=>{const x=A.current;x&&(l!==void 0&&(x.variant=l),r!==void 0&&(x.value=r),c!==void 0&&(x.size=c),u!==void 0&&(x.thickness=u),f!==void 0&&(x.color=f),b!==void 0&&(x.label=b))},[l,r,c,u,f,b]),h.jsxDEV("ui-circular-progress",{ref:A,...N,children:v},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiCircularProgress.tsx",lineNumber:38,columnNumber:13},this)});bp.displayName="UiCircularProgress";var K3=Object.defineProperty,W3=Object.getOwnPropertyDescriptor,pl=(p,l,r,c)=>{for(var u=c>1?void 0:c?W3(l,r):l,f=p.length-1,b;f>=0;f--)(b=p[f])&&(u=(c?b(l,r,u):b(u))||u);return c&&u&&K3(l,r,u),u};let va=class extends W{constructor(){super(...arguments),this.maxItems=8,this.itemsBefore=1,this.itemsAfter=1,this.separator="/",this._expanded=!1,this._itemsCount=0,this._separatorNode=null}_handleSlotChange(){const r=Array.from(this.children).filter(c=>!c.slot||c.slot.startsWith("breadcrumb-item-"));r.forEach((c,u)=>{const f=`breadcrumb-item-${u}`;c.getAttribute("slot")!==f&&c.setAttribute("slot",f)}),this._itemsCount=r.length}_handleSeparatorSlotChange(l){const c=l.target.assignedNodes({flatten:!0});this._separatorNode=c.length>0?c[0].cloneNode(!0):null}_renderSeparator(){return $`
            <span class="separator" aria-hidden="true">
                ${this._separatorNode?this._separatorNode.cloneNode(!0):this.separator}
            </span>
        `}_renderItem(l,r){return $`
            <li class="breadcrumb-li">
                <slot name="breadcrumb-item-${l}"></slot>
                ${r?"":this._renderSeparator()}
            </li>
        `}_renderCollapsed(){const l=this._itemsCount;if(l===0)return $``;if(l<=this.maxItems||this._expanded)return Array.from({length:l}).map((b,v)=>this._renderItem(v,v===l-1));const r=Math.min(this.itemsBefore,l),c=Math.min(this.itemsAfter,l-r);if(r+c>=l)return Array.from({length:l}).map((b,v)=>this._renderItem(v,v===l-1));const u=Array.from({length:r}).map((b,v)=>v),f=Array.from({length:c}).map((b,v)=>l-c+v);return $`
            ${u.map(b=>this._renderItem(b,!1))}
            <li class="breadcrumb-li">
                <button class="collapsed-button" @click=${()=>this._expanded=!0} aria-label="Show all breadcrumbs">
                    ...
                </button>
                ${this._renderSeparator()}
            </li>
            ${f.map((b,v)=>this._renderItem(b,v===f.length-1))}
        `}render(){return $`
            <nav aria-label="breadcrumb">
                <ol class="breadcrumbs-ol">
                    ${this._renderCollapsed()}
                </ol>
            </nav>
            <div style="display: none" aria-hidden="true">
                <slot @slotchange=${this._handleSlotChange}></slot>
                <slot name="separator" @slotchange=${this._handleSeparatorSlotChange}></slot>
            </div>
        `}};va.styles=ee`
        :host {
            display: block;
        }

        .breadcrumbs-ol {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            padding: 0;
            margin: 0;
            list-style: none;
        }

        .breadcrumb-li {
            display: flex;
            align-items: center;
        }

        .separator {
            display: flex;
            user-select: none;
            margin-left: 8px;
            margin-right: 8px;
            color: var(--ui-text-color-muted, #6b7280);
        }

        ::slotted(*) {
            font-family: var(--ui-font-family, sans-serif);
            font-size: 0.875rem;
            color: var(--ui-text-color-muted, #6b7280);
            text-decoration: none;
            transition: color 200ms;
        }

        ::slotted(a:hover) {
            text-decoration: underline;
            color: var(--ui-text-color, #111827);
        }

        ::slotted([aria-current="page"]),
        ::slotted(.active) {
            color: var(--ui-text-color, #111827);
            font-weight: 500;
            pointer-events: none;
        }

        .collapsed-button {
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--ui-hover-color, rgba(0, 0, 0, 0.04));
            border: none;
            border-radius: 4px;
            cursor: pointer;
            padding: 4px 8px;
            font-size: 1rem;
            line-height: 1;
            color: var(--ui-text-color-muted, #6b7280);
            transition: background-color 200ms;
        }

        .collapsed-button:hover {
            background-color: var(--ui-hover-color-strong, rgba(0, 0, 0, 0.08));
        }
    `;pl([E({type:Number,attribute:"max-items"})],va.prototype,"maxItems",2);pl([E({type:Number,attribute:"items-before"})],va.prototype,"itemsBefore",2);pl([E({type:Number,attribute:"items-after"})],va.prototype,"itemsAfter",2);pl([E({type:String})],va.prototype,"separator",2);pl([si()],va.prototype,"_expanded",2);pl([si()],va.prototype,"_itemsCount",2);pl([si()],va.prototype,"_separatorNode",2);va=pl([te("ui-breadcrumbs")],va);const py=R.forwardRef(function({maxItems:l,itemsBefore:r,itemsAfter:c,separator:u,children:f,...b},v){const N=R.useRef(null),O=v??N;return R.useEffect(()=>{const z=O.current;z&&(l!==void 0&&(z.maxItems=l),r!==void 0&&(z.itemsBefore=r),c!==void 0&&(z.itemsAfter=c),u!==void 0&&(z.separator=u))},[l,r,c,u]),h.jsxDEV("ui-breadcrumbs",{ref:O,...b,children:f},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiBreadcrumbs.tsx",lineNumber:34,columnNumber:13},this)});py.displayName="UiBreadcrumbs";var F3=Object.defineProperty,eT=Object.getOwnPropertyDescriptor,qc=(p,l,r,c)=>{for(var u=c>1?void 0:c?eT(l,r):l,f=p.length-1,b;f>=0;f--)(b=p[f])&&(u=(c?b(l,r,u):b(u))||u);return c&&u&&F3(l,r,u),u};let ps=class extends W{constructor(){super(...arguments),this.orientation="horizontal",this.variant="full",this.weight="light",this.textAlign="center"}render(){return $`
      <div 
        class="divider-container ${qe({[`variant-${this.variant}`]:!0,[`weight-${this.weight}`]:!0})}"
        role="separator"
        aria-orientation="${this.orientation}"
      >
        ${this.textAlign!=="left"||this.orientation==="vertical"?$`<div class="divider-line"></div>`:""}
        
        <slot class="divider-content"></slot>
        
        ${this.textAlign!=="right"||this.orientation==="vertical"?$`<div class="divider-line"></div>`:""}
      </div>
    `}};ps.styles=ee`
    :host {
      display: block;
      --ui-divider-color: var(--ui-border-color, #e5e7eb);
      --ui-divider-margin: 16px;
      --ui-divider-thickness: 1px;
    }

    .divider-container {
      display: flex;
      align-items: center;
      width: 100%;
      box-sizing: border-box;
      margin: var(--ui-divider-margin) 0;
    }

    .divider-line {
      flex-grow: 1;
      height: var(--ui-divider-thickness);
      background-color: var(--ui-divider-color);
      border: none;
    }

    .divider-content {
      padding: 0 16px;
      font-family: var(--ui-font-family, sans-serif);
      font-size: 0.875rem;
      color: var(--ui-text-color-muted, #6b7280);
      white-space: nowrap;
    }

    /* Vertical Orientation */
    :host([orientation="vertical"]) {
      display: flex;
      align-self: stretch;
      margin: 0;
      width: auto;
      min-width: var(--ui-divider-thickness);
    }

    :host([orientation="vertical"]) .divider-container {
      flex-direction: column;
      height: 100%;
      width: auto;        /* override the default width: 100% */
      min-width: var(--ui-divider-thickness);
      margin: 0;
    }

    :host([orientation="vertical"]) .divider-line {
      width: var(--ui-divider-thickness);
      height: auto;
      flex: 1;            /* stretch to fill the full height of the row */
      min-height: 24px;
    }

    /* Variants */
    .variant-middle {
      margin-left: 32px;
      margin-right: 32px;
      width: auto;
    }

    .variant-inset {
      margin-left: 72px;
    }

    /* Thickness weights */
    .weight-light { --ui-divider-thickness: 1px; }
    .weight-medium { --ui-divider-thickness: 2px; }
    .weight-heavy { --ui-divider-thickness: 4px; }
  `;qc([E({type:String,reflect:!0})],ps.prototype,"orientation",2);qc([E({type:String})],ps.prototype,"variant",2);qc([E({type:String})],ps.prototype,"weight",2);qc([E({type:String})],ps.prototype,"textAlign",2);ps=qc([te("ui-divider")],ps);const Qi=R.forwardRef(function({orientation:l,variant:r,weight:c,textAlign:u,children:f,...b},v){const N=R.useRef(null),O=v??N;return R.useEffect(()=>{const z=O.current;z&&(l!==void 0&&(z.orientation=l),r!==void 0&&(z.variant=r),c!==void 0&&(z.weight=c),u!==void 0&&(z.textAlign=u))},[l,r,c,u]),h.jsxDEV("ui-divider",{ref:O,...b,children:f},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiDivider.tsx",lineNumber:34,columnNumber:13},this)});Qi.displayName="UiDivider";const u_=Symbol.for(""),tT=p=>{if(p?.r===u_)return p?._$litStatic$},iT=p=>{if(p._$litStatic$!==void 0)return p._$litStatic$;throw new Error(`Value passed to 'literal' function must be a 'literal' result: ${p}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)},bt=(p,...l)=>({_$litStatic$:l.reduce((r,c,u)=>r+iT(c)+p[u+1],p[0]),r:u_}),CE=new Map,nT=p=>(l,...r)=>{const c=r.length;let u,f;const b=[],v=[];let N=0,O=!1,z;for(;N<c;){for(z=l[N];N<c&&(f=r[N],(u=tT(f))!==void 0);)z+=u+l[++N],O=!0;N!==c&&v.push(f),b.push(z),N++}if(N===c&&b.push(l[c]),O){const A=b.join("$$lit$$");l=CE.get(A),l===void 0&&(b.raw=b,CE.set(A,l=b)),r=v}return p(l,...r)},aT=nT($);var oT=Object.defineProperty,lT=Object.getOwnPropertyDescriptor,hl=(p,l,r,c)=>{for(var u=c>1?void 0:c?lT(l,r):l,f=p.length-1,b;f>=0;f--)(b=p[f])&&(u=(c?b(l,r,u):b(u))||u);return c&&u&&oT(l,r,u),u};let xa=class extends W{constructor(){super(...arguments),this.variant="body1",this.color="textPrimary",this.align="left",this.noWrap=!1,this.gutterBottom=!1,this.paragraph=!1}_literalTag(){const l=this.component;return l?{h1:bt`h1`,h2:bt`h2`,h3:bt`h3`,h4:bt`h4`,h5:bt`h5`,h6:bt`h6`,p:bt`p`,span:bt`span`,div:bt`div`}[l]??bt`p`:{h1:bt`h1`,h2:bt`h2`,h3:bt`h3`,h4:bt`h4`,h5:bt`h5`,h6:bt`h6`,subtitle1:bt`h6`,subtitle2:bt`h6`,body1:bt`p`,body2:bt`p`,caption:bt`span`,overline:bt`span`,inherit:bt`p`}[this.variant]??bt`p`}render(){const l=this._literalTag(),r=`typography ${this.variant!=="inherit"?this.variant:""}`;return aT`<${l} class="${r}"><slot></slot></${l}>`}};xa.styles=ee`
        :host {
            display: block;
            font-family: var(--ui-font-family, 'Inter', sans-serif);
            color: var(--ui-text-color, #111827);
        }

        .typography {
            margin: 0;
            padding: 0;
        }

        /* Variants */
        .h1 { font-size: 6rem;    font-weight: 300; letter-spacing: -1.5px; line-height: 1.167; }
        .h2 { font-size: 3.75rem; font-weight: 300; letter-spacing: -0.5px; line-height: 1.2;   }
        .h3 { font-size: 3rem;    font-weight: 400; line-height: 1.167; }
        .h4 { font-size: 2.125rem; font-weight: 400; letter-spacing: 0.25px; line-height: 1.235; }
        .h5 { font-size: 1.5rem;  font-weight: 400; line-height: 1.334; }
        .h6 { font-size: 1.25rem; font-weight: 500; letter-spacing: 0.15px; line-height: 1.6;   }
        .subtitle1 { font-size: 1rem;    font-weight: 400; letter-spacing: 0.15px; line-height: 1.75; }
        .subtitle2 { font-size: 0.875rem; font-weight: 500; letter-spacing: 0.1px;  line-height: 1.57; }
        .body1 { font-size: 1rem;    font-weight: 400; letter-spacing: 0.15px; line-height: 1.5;  }
        .body2 { font-size: 0.875rem; font-weight: 400; letter-spacing: 0.15px; line-height: 1.43; }
        .caption  { font-size: 0.75rem; font-weight: 400; letter-spacing: 0.4px; line-height: 1.66; }
        .overline { font-size: 0.75rem; font-weight: 400; letter-spacing: 1px;   line-height: 2.66; text-transform: uppercase; }

        /* Colors */
        :host([color="primary"])       .typography { color: var(--ui-primary-color, #3b82f6); }
        :host([color="secondary"])     .typography { color: var(--ui-secondary-color, #7c3aed); }
        :host([color="success"])       .typography { color: var(--ui-success-color, #16a34a); }
        :host([color="error"])         .typography { color: var(--ui-error-color, #dc2626); }
        :host([color="warning"])       .typography { color: var(--ui-warning-color, #d97706); }
        :host([color="info"])          .typography { color: var(--ui-info-color, #0891b2); }
        :host([color="textPrimary"])   .typography { color: var(--ui-text-color, #111827); }
        :host([color="textSecondary"]) .typography { color: var(--ui-text-color-muted, #6b7280); }
        :host([color="inherit"])       .typography { color: inherit; }

        /* Alignment */
        :host([align="left"])    .typography { text-align: left; }
        :host([align="center"])  .typography { text-align: center; }
        :host([align="right"])   .typography { text-align: right; }
        :host([align="justify"]) .typography { text-align: justify; }

        /* No wrapping */
        :host([noWrap]) .typography {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        /* Gutter bottom — matches MUI spacing */
        :host([gutterBottom]) .typography { margin-bottom: 0.35em; }

        /* Paragraph adds bottom margin */
        :host([paragraph]) .typography { margin-bottom: 16px; }
    `;hl([E({type:String,reflect:!0})],xa.prototype,"variant",2);hl([E({type:String,reflect:!0})],xa.prototype,"color",2);hl([E({type:String})],xa.prototype,"component",2);hl([E({type:String,reflect:!0})],xa.prototype,"align",2);hl([E({type:Boolean,reflect:!0})],xa.prototype,"noWrap",2);hl([E({type:Boolean,reflect:!0})],xa.prototype,"gutterBottom",2);hl([E({type:Boolean,reflect:!0})],xa.prototype,"paragraph",2);xa=hl([te("ui-typography")],xa);const gp=R.forwardRef(function({variant:l,color:r,component:c,align:u,noWrap:f,gutterBottom:b,paragraph:v,children:N,...O},z){const A=R.useRef(null),x=z??A;return R.useEffect(()=>{const C=x.current;C&&(l!==void 0&&(C.variant=l),r!==void 0&&(C.color=r),c!==void 0&&(C.component=c),u!==void 0&&(C.align=u),f!==void 0&&(C.noWrap=f),b!==void 0&&(C.gutterBottom=b),v!==void 0&&(C.paragraph=v))},[l,r,c,u,f,b,v]),h.jsxDEV("ui-typography",{ref:x,...O,children:N},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiTypography.tsx",lineNumber:45,columnNumber:13},this)});gp.displayName="UiTypography";const kE={CHANGE:"ui-pagination-change"};var sT=Object.defineProperty,rT=Object.getOwnPropertyDescriptor,ri=(p,l,r,c)=>{for(var u=c>1?void 0:c?rT(l,r):l,f=p.length-1,b;f>=0;f--)(b=p[f])&&(u=(c?b(l,r,u):b(u))||u);return c&&u&&sT(l,r,u),u};const uT=$`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"/></svg>`,cT=$`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"/></svg>`,dT=$`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>`,fT=$`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>`,pT=$`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>`;function kg(p,l){return Array.from({length:l-p+1},(r,c)=>p+c)}function hT(p,l,r,c){const u=kg(1,Math.min(c,p)),f=kg(Math.max(p-c+1,c+1),p),b=Math.max(Math.min(l-r,p-c-r*2-1),c+2),v=Math.min(Math.max(l+r,c+r*2+2),f.length>0?f[0]-2:p-1),N=[...u,...b>c+2?["start-ellipsis"]:c+1<p-c?[c+1]:[],...kg(b,v),...v<p-c-1?["end-ellipsis"]:p-c>c?[p-c]:[],...f],O=new Set;return N.filter(z=>{const A=String(z);return O.has(A)?!1:(O.add(A),!0)})}let Qt=class extends W{constructor(){super(...arguments),this.count=1,this.page=1,this.defaultPage=1,this.label="",this.variant="text",this.shape="circular",this.size="medium",this.color="primary",this.showFirstButton=!1,this.showLastButton=!1,this.hidePrevButton=!1,this.hideNextButton=!1,this.siblingCount=1,this.boundaryCount=1,this.disabled=!1,this._firstUpdate=!0}willUpdate(){this._firstUpdate&&this.defaultPage!==1&&(this.page=this.defaultPage),this._firstUpdate=!1}get _safeCount(){return Math.max(1,this.count)}get _safePage(){return Math.min(Math.max(1,this.page),this._safeCount)}_emit(l){this.dispatchEvent(new CustomEvent("ui-pagination-change",{detail:{page:l},bubbles:!0,composed:!0}))}_go(l){const r=this._safeCount,c=this._safePage;l<1||l>r||l===c||(this.page=l,this._emit(l))}_renderNavBtn(l,r,c,u,f,b){return b?pe:$`
            <li>
                <button
                    class="page-btn"
                    aria-label=${l}
                    ?disabled=${f||this.disabled}
                    @click=${u}
                ><slot name=${r}>${c}</slot></button>
            </li>
        `}render(){const l=this._safeCount,r=this._safePage,c=hT(l,r,this.siblingCount,this.boundaryCount),u=this.label||"pagination navigation";return $`
            <nav aria-label=${u}>
                <ol>
                    ${this._renderNavBtn("Go to first page","first-icon",uT,()=>this._go(1),r===1,!this.showFirstButton)}
                    ${this._renderNavBtn("Go to previous page","prev-icon",dT,()=>this._go(r-1),r===1,this.hidePrevButton)}

                    ${c.map(f=>{if(f==="start-ellipsis"||f==="end-ellipsis")return $`
                            <li>
                                <button class="page-btn ellipsis" tabindex="-1" aria-hidden="true">
                                    <slot name="ellipsis-icon">${pT}</slot>
                                </button>
                            </li>`;const b=f===r;return $`
                        <li>
                            <button
                                class=${qe({"page-btn":!0,active:b})}
                                aria-label=${"Page "+f}
                                aria-current=${b?"page":pe}
                                ?disabled=${this.disabled}
                                @click=${()=>this._go(f)}
                            >${f}</button>
                        </li>
                    `})}

                    ${this._renderNavBtn("Go to next page","next-icon",fT,()=>this._go(r+1),r===l,this.hideNextButton)}
                    ${this._renderNavBtn("Go to last page","last-icon",cT,()=>this._go(l),r===l,!this.showLastButton)}
                </ol>
            </nav>
        `}};Qt.styles=ee`
        :host {
            display: inline-flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 4px;
            font-family: var(--ui-font-family, 'Inter', sans-serif);
        }

        /* Transparent layout wrappers */
        nav, ol, li { display: contents; }

        /* ── Base button ── */
        .page-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 36px;
            height: 36px;
            padding: 0 6px;
            border-radius: 4px;
            border: none;
            background: transparent;
            color: var(--ui-text-color, #111827);
            font-family: inherit;
            font-size: 0.875rem;
            font-weight: 400;
            cursor: pointer;
            transition: background 0.15s, color 0.15s, border-color 0.15s;
            user-select: none;
            box-sizing: border-box;
            outline: none;
            text-decoration: none;
        }
        .page-btn:hover:not(:disabled) {
            background: rgba(0,0,0,.06);
        }
        .page-btn:focus-visible {
            outline: 2px solid var(--ui-primary-color, #3b82f6);
            outline-offset: 2px;
        }
        .page-btn.active {
            background: var(--ui-primary-color, #3b82f6);
            color: #fff;
            font-weight: 600;
        }
        .page-btn:disabled {
            opacity: 0.38;
            cursor: default;
            pointer-events: none;
        }
        .page-btn.ellipsis {
            cursor: default;
            pointer-events: none;
            color: var(--ui-text-color-muted, #6b7280);
        }

        /* ── Variants ── */
        :host([variant="outlined"]) .page-btn {
            border: 1px solid var(--ui-border-color, #e5e7eb);
        }
        :host([variant="outlined"]) .page-btn.active {
            border-color: var(--ui-primary-color, #3b82f6);
            background: var(--ui-primary-color, #3b82f6);
            color: #fff;
        }
        :host([variant="outlined"]) .page-btn:hover:not(:disabled):not(.active) {
            background: rgba(59,130,246,.06);
            border-color: var(--ui-primary-color, #3b82f6);
        }

        /* ── Color: secondary ── */
        :host([color="secondary"]) .page-btn.active {
            background: var(--ui-secondary-color, #7c3aed);
        }
        :host([color="secondary"][variant="outlined"]) .page-btn.active {
            background: var(--ui-secondary-color, #7c3aed);
            border-color: var(--ui-secondary-color, #7c3aed);
        }
        :host([color="standard"]) .page-btn.active {
            background: var(--ui-text-color, #111827);
            color: #fff;
        }

        /* ── Shape ── */
        :host([shape="rounded"]) .page-btn  { border-radius: 8px; }
        :host([shape="circular"]) .page-btn { border-radius: 50%; min-width: 36px; aspect-ratio: 1; }

        /* ── Size ── */
        :host([size="small"]) .page-btn    { min-width: 28px; height: 28px; font-size: 0.8125rem; }
        :host([size="small"][shape="circular"]) .page-btn { min-width: 28px; }
        :host([size="large"]) .page-btn    { min-width: 44px; height: 44px; font-size: 0.9375rem; }

        /* ── Disabled host ── */
        :host([disabled]) .page-btn {
            opacity: 0.38;
            pointer-events: none;
        }

        /* ── Nav icon size ── */
        svg { display: block; }
    `;ri([E({type:Number})],Qt.prototype,"count",2);ri([E({type:Number})],Qt.prototype,"page",2);ri([E({type:Number,attribute:"default-page"})],Qt.prototype,"defaultPage",2);ri([E({type:String})],Qt.prototype,"label",2);ri([E({type:String,reflect:!0})],Qt.prototype,"variant",2);ri([E({type:String,reflect:!0})],Qt.prototype,"shape",2);ri([E({type:String,reflect:!0})],Qt.prototype,"size",2);ri([E({type:String,reflect:!0})],Qt.prototype,"color",2);ri([E({type:Boolean,reflect:!0,attribute:"show-first-button"})],Qt.prototype,"showFirstButton",2);ri([E({type:Boolean,reflect:!0,attribute:"show-last-button"})],Qt.prototype,"showLastButton",2);ri([E({type:Boolean,reflect:!0,attribute:"hide-prev-button"})],Qt.prototype,"hidePrevButton",2);ri([E({type:Boolean,reflect:!0,attribute:"hide-next-button"})],Qt.prototype,"hideNextButton",2);ri([E({type:Number,attribute:"sibling-count"})],Qt.prototype,"siblingCount",2);ri([E({type:Number,attribute:"boundary-count"})],Qt.prototype,"boundaryCount",2);ri([E({type:Boolean,reflect:!0})],Qt.prototype,"disabled",2);Qt=ri([te("ui-pagination")],Qt);const hy=R.forwardRef(function({count:l,page:r,defaultPage:c,label:u,variant:f,shape:b,size:v,color:N,showFirstButton:O,showLastButton:z,hidePrevButton:A,hideNextButton:x,siblingCount:C,boundaryCount:B,disabled:G,onUiPaginationChange:J,children:I,...$e},ce){const Te=R.useRef(null),St=ce??Te;return R.useEffect(()=>{const Ie=St.current;Ie&&(l!==void 0&&(Ie.count=l),r!==void 0&&(Ie.page=r),c!==void 0&&(Ie.defaultPage=c),u!==void 0&&(Ie.label=u),f!==void 0&&(Ie.variant=f),b!==void 0&&(Ie.shape=b),v!==void 0&&(Ie.size=v),N!==void 0&&(Ie.color=N),O!==void 0&&(Ie.showFirstButton=O),z!==void 0&&(Ie.showLastButton=z),A!==void 0&&(Ie.hidePrevButton=A),x!==void 0&&(Ie.hideNextButton=x),C!==void 0&&(Ie.siblingCount=C),B!==void 0&&(Ie.boundaryCount=B),G!==void 0&&(Ie.disabled=G))},[l,r,c,u,f,b,v,N,O,z,A,x,C,B,G]),R.useEffect(()=>{const Ie=St.current;if(!Ie||!J)return;const jt=J;return Ie.addEventListener(kE.CHANGE,jt),()=>Ie.removeEventListener(kE.CHANGE,jt)},[J]),h.jsxDEV("ui-pagination",{ref:St,...$e,children:I},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiPagination.tsx",lineNumber:66,columnNumber:13},this)});hy.displayName="UiPagination";const up={INPUT:"input",CHANGE:"change"};var mT=Object.defineProperty,bT=Object.getOwnPropertyDescriptor,Mn=(p,l,r,c)=>{for(var u=c>1?void 0:c?bT(l,r):l,f=p.length-1,b;f>=0;f--)(b=p[f])&&(u=(c?b(l,r,u):b(u))||u);return c&&u&&mT(l,r,u),u};let Ii=class extends W{constructor(){super(...arguments),this.label="",this.value="",this.placeholder="",this.type="text",this.variant="outlined",this.disabled=!1,this.error=!1,this.helperText="",this.errorMessage="",this._focused=!1}_handleInput(l){this.value=l.target.value,this.dispatchEvent(new CustomEvent("input",{detail:{value:this.value},bubbles:!0,composed:!0}))}_handleChange(l){this.value=l.target.value,this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value},bubbles:!0,composed:!0}))}_handleFocus(){this._focused=!0}_handleBlur(){this._focused=!1}render(){const l=this.error||!!this.errorMessage;return $`
      <div class=${qe({"field-container":!0,filled:this.variant==="filled"})}>
        ${this.label?$`<label class="label">${this.label}</label>`:""}
        
        <div class=${qe({"input-wrapper":!0,focused:this._focused,error:l,disabled:this.disabled})}>
          <div class="icon-leading" part="leading-icon">
            <slot name="leading"></slot>
          </div>

          <input
            .type=${this.type}
            .value=${this.value}
            .placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            @input=${this._handleInput}
            @change=${this._handleChange}
            @focus=${this._handleFocus}
            @blur=${this._handleBlur}
            aria-invalid=${l?"true":"false"}
          />

          <div class="icon-trailing" part="trailing-icon">
            <slot name="trailing"></slot>
          </div>
        </div>

        ${l&&this.errorMessage?$`<span class="helper-text error-text">${this.errorMessage}</span>`:this.helperText?$`<span class="helper-text">${this.helperText}</span>`:""}
      </div>
    `}};Ii.styles=ee`
    :host {
      display: block;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      margin-bottom: 1rem;
    }

    .field-container {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--ui-text-color, #111827);
      transition: color 0.2s;
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      background-color: var(--ui-surface-background, white);
      border: 1px solid var(--ui-input-border-color, #d1d5db);
      border-radius: var(--ui-input-border-radius, 6px);
      transition: all 0.2s ease;
      overflow: hidden;
    }

    .input-wrapper:hover:not(.disabled):not(.error) {
      border-color: var(--ui-text-color-muted, #6b7280);
    }

    .input-wrapper.focused:not(.error) {
      border-color: var(--ui-primary-color, #3b82f6);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
    }

    .input-wrapper.error {
      border-color: #ef4444;
    }

    .input-wrapper.error.focused {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
    }

    .input-wrapper.disabled {
      background-color: var(--ui-surface-background-flat, #f3f4f6);
      cursor: not-allowed;
      opacity: 0.7;
    }

    input {
      flex: 1;
      width: 100%;
      padding: 0.625rem 0.875rem;
      font-size: 1rem;
      font-family: inherit;
      color: inherit;
      background: transparent;
      border: none;
      outline: none;
    }

    input:disabled {
      cursor: not-allowed;
    }

    input::placeholder {
      color: var(--ui-text-color-muted, #9ca3af);
    }

    .icon-leading, .icon-trailing {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--ui-text-color-muted, #6b7280);
      padding: 0 0.75rem;
    }

    .icon-leading {
      padding-right: 0;
    }

    .icon-trailing {
      padding-left: 0;
    }

    .helper-text {
      font-size: 0.75rem;
      color: var(--ui-text-color-muted, #6b7280);
    }

    .error-text {
      color: #ef4444;
    }

    /* Outlined variant (default) */
    /* Filled variant */
    .filled .input-wrapper {
      background-color: var(--ui-surface-background-flat, #f3f4f6);
      border-bottom: 2px solid var(--ui-input-border-color, #d1d5db);
      border-top: none;
      border-left: none;
      border-right: none;
      border-radius: 4px 4px 0 0;
    }

    .filled .input-wrapper.focused {
      border-bottom-color: var(--ui-primary-color, #3b82f6);
      background-color: var(--ui-hover-color, rgba(0,0,0,0.02));
    }
  `;Mn([E({type:String})],Ii.prototype,"label",2);Mn([E({type:String})],Ii.prototype,"value",2);Mn([E({type:String})],Ii.prototype,"placeholder",2);Mn([E({type:String})],Ii.prototype,"type",2);Mn([E({type:String})],Ii.prototype,"variant",2);Mn([E({type:Boolean})],Ii.prototype,"disabled",2);Mn([E({type:Boolean})],Ii.prototype,"error",2);Mn([E({type:String})],Ii.prototype,"helperText",2);Mn([E({type:String})],Ii.prototype,"errorMessage",2);Mn([si()],Ii.prototype,"_focused",2);Ii=Mn([te("ui-text-field")],Ii);const Wa=R.forwardRef(function({label:l,value:r,placeholder:c,type:u,variant:f,disabled:b,error:v,helperText:N,errorMessage:O,onInput:z,onChange:A,children:x,...C},B){const G=R.useRef(null),J=B??G;return R.useEffect(()=>{const I=J.current;I&&(l!==void 0&&(I.label=l),r!==void 0&&(I.value=r),c!==void 0&&(I.placeholder=c),u!==void 0&&(I.type=u),f!==void 0&&(I.variant=f),b!==void 0&&(I.disabled=b),v!==void 0&&(I.error=v),N!==void 0&&(I.helperText=N),O!==void 0&&(I.errorMessage=O))},[l,r,c,u,f,b,v,N,O]),R.useEffect(()=>{const I=J.current;if(!I||!z)return;const $e=z;return I.addEventListener(up.INPUT,$e),()=>I.removeEventListener(up.INPUT,$e)},[z]),R.useEffect(()=>{const I=J.current;if(!I||!A)return;const $e=A;return I.addEventListener(up.CHANGE,$e),()=>I.removeEventListener(up.CHANGE,$e)},[A]),h.jsxDEV("ui-text-field",{ref:J,...C,children:x},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiTextField.tsx",lineNumber:63,columnNumber:13},this)});Wa.displayName="UiTextField";const OE={CHANGE:"change"};const{_ChildPart:gT}=c3,Dr=window.ShadyDOM?.inUse&&window.ShadyDOM?.noPatch===!0?window.ShadyDOM.wrap:p=>p,zE=()=>document.createComment(""),_c=(p,l,r)=>{const c=Dr(p._$startNode).parentNode,u=l===void 0?p._$endNode:l._$startNode;if(r===void 0){const f=Dr(c).insertBefore(zE(),u),b=Dr(c).insertBefore(zE(),u);r=new gT(f,b,p,p.options)}else{const f=Dr(r._$endNode).nextSibling,b=r._$parent,v=b!==p;if(v){r._$reparentDisconnectables?.(p),r._$parent=p;let N;r._$notifyConnectionChanged!==void 0&&(N=p._$isConnected)!==b._$isConnected&&r._$notifyConnectionChanged(N)}if(f!==u||v){let N=r._$startNode;for(;N!==f;){const O=Dr(N).nextSibling;Dr(c).insertBefore(N,u),N=O}}}return r},ss=(p,l,r=p)=>(p._$setValue(l,r),p),yT={},vT=(p,l=yT)=>p._$committedValue=l,xT=p=>p._$committedValue,Og=p=>{p._$clear(),p._$startNode.remove()};const jE=(p,l,r)=>{const c=new Map;for(let u=l;u<=r;u++)c.set(p[u],u);return c};class NT extends cy{constructor(l){if(super(l),l.type!==ry.CHILD)throw new Error("repeat() can only be used in text expressions")}_getValuesAndKeys(l,r,c){let u;c===void 0?c=r:r!==void 0&&(u=r);const f=[],b=[];let v=0;for(const N of l)f[v]=u?u(N,v):v,b[v]=c(N,v),v++;return{values:b,keys:f}}render(l,r,c){return this._getValuesAndKeys(l,r,c).values}update(l,[r,c,u]){const f=xT(l),{values:b,keys:v}=this._getValuesAndKeys(r,c,u);if(!Array.isArray(f))return this._itemKeys=v,b;const N=this._itemKeys??=[],O=[];let z,A,x=0,C=f.length-1,B=0,G=b.length-1;for(;x<=C&&B<=G;)if(f[x]===null)x++;else if(f[C]===null)C--;else if(N[x]===v[B])O[B]=ss(f[x],b[B]),x++,B++;else if(N[C]===v[G])O[G]=ss(f[C],b[G]),C--,G--;else if(N[x]===v[G])O[G]=ss(f[x],b[G]),_c(l,O[G+1],f[x]),x++,G--;else if(N[C]===v[B])O[B]=ss(f[C],b[B]),_c(l,f[x],f[C]),C--,B++;else if(z===void 0&&(z=jE(v,B,G),A=jE(N,x,C)),!z.has(N[x]))Og(f[x]),x++;else if(!z.has(N[C]))Og(f[C]),C--;else{const J=A.get(v[B]),I=J!==void 0?f[J]:null;if(I===null){const $e=_c(l,f[x]);ss($e,b[B]),O[B]=$e}else O[B]=ss(I,b[B]),_c(l,f[x],I),f[J]=null;B++}for(;B<=G;){const J=_c(l,O[G+1]);ss(J,b[B]),O[B++]=J}for(;x<=C;){const J=f[x++];J!==null&&Og(J)}return this._itemKeys=v,vT(l,O),lo}}const VE=uy(NT);var ST=Object.defineProperty,ET=Object.getOwnPropertyDescriptor,Zt=(p,l,r,c)=>{for(var u=c>1?void 0:c?ET(l,r):l,f=p.length-1,b;f>=0;f--)(b=p[f])&&(u=(c?b(l,r,u):b(u))||u);return c&&u&&ST(l,r,u),u};let _T=0,wt=class extends W{constructor(){super(),this.label="",this.options=[],this.value=[],this.multiple=!1,this.placeholder="Select an option",this.disabled=!1,this.readonly=!1,this.required=!1,this.error=!1,this.errorMessage="",this.name="",this.size="md",this.defaultValue="",this._isOpen=!1,this._highlightedIndex=-1,this._isFocused=!1,this._opensUp=!1,this._uid=`ui-select-${++_T}`,this._firstUpdate=!0,this._handleOutsideClick=l=>{if(!this._isOpen)return;const r=l.composedPath();(r.length>0?r.includes(this):this.contains(l.target))||(this._isOpen=!1,this._highlightedIndex=-1)},this._handleKeydown=l=>{const r=this.options.map((c,u)=>({o:c,i:u})).filter(({o:c})=>!c.disabled);switch(l.key){case"ArrowDown":{if(l.preventDefault(),!this._isOpen)this._toggleDropdown(),this._highlightedIndex===-1&&r.length>0&&(this._highlightedIndex=r[0].i);else{const c=r.findIndex(({i:f})=>f===this._highlightedIndex),u=r[c+1];u&&(this._highlightedIndex=u.i,this._scrollOptionIntoView(u.i))}break}case"ArrowUp":{if(l.preventDefault(),this._isOpen){const c=r.findIndex(({i:f})=>f===this._highlightedIndex),u=c>0?r[c-1]:null;u&&(this._highlightedIndex=u.i,this._scrollOptionIntoView(u.i))}break}case"Enter":case" ":{l.preventDefault(),this._isOpen?this._highlightedIndex>=0&&this._handleOptionClick(this.options[this._highlightedIndex],l):this._toggleDropdown();break}case"Escape":{this._isOpen&&(l.preventDefault(),this._isOpen=!1,this._highlightedIndex=-1);break}case"Tab":{this._isOpen&&(this._isOpen=!1,this._highlightedIndex=-1);break}}};try{this._internals=this.attachInternals()}catch{}}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._handleOutsideClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._handleOutsideClick)}willUpdate(l){this._firstUpdate&&(this._firstUpdate=!1,this.defaultValue&&this.value.length===0&&(this.value=[this.defaultValue])),(l.has("value")||l.has("name")||l.has("required"))&&this._updateFormValue()}_updateFormValue(){if(!(!this._internals||typeof this._internals.setFormValue!="function")){if(this.multiple){const l=new FormData;this.value.forEach(r=>l.append(this.name||"select",r)),this._internals.setFormValue(l)}else this._internals.setFormValue(this.value[0]??"");this.required&&this.value.length===0?this._internals.setValidity({valueMissing:!0},"Please select an option"):this._internals.setValidity({})}}_toggleDropdown(){if(!(this.disabled||this.readonly)){if(this._isOpen)this._highlightedIndex=-1;else{const l=this.getBoundingClientRect();this._opensUp=window.innerHeight-l.bottom<280,this._highlightedIndex=this.value.length>0?this.options.findIndex(r=>r.value===this.value[0]):-1}this._isOpen=!this._isOpen}}_handleOptionClick(l,r){if(!l.disabled){if(r.stopPropagation(),this.multiple){const c=[...this.value],u=c.indexOf(l.value);u>-1?c.splice(u,1):c.push(l.value),this.value=c}else this.value=[l.value],this._isOpen=!1,this._highlightedIndex=-1;this._dispatchChange()}}_removeValue(l,r){r.stopPropagation(),this.value=this.value.filter(c=>c!==l),this._dispatchChange(),this.shadowRoot?.querySelector(".select-trigger")?.focus()}_dispatchChange(){this.dispatchEvent(new CustomEvent("change",{detail:{value:this.multiple?this.value:this.value[0]??null},bubbles:!0,composed:!0}))}_scrollOptionIntoView(l){this.updateComplete.then(()=>{const r=this.shadowRoot?.querySelector(`#${this._uid}-opt-${l}`);r&&typeof r.scrollIntoView=="function"&&r.scrollIntoView({block:"nearest"})})}render(){const l=this.options.filter(f=>this.value.includes(f.value)),r=`${this._uid}-label`,c=`${this._uid}-listbox`,u=this._highlightedIndex>=0?`${this._uid}-opt-${this._highlightedIndex}`:"";return $`
      <div class="wrapper">
        ${this.label?$`<label id=${r}>${this.label}</label>`:pe}

        <div
          class=${qe({"select-trigger":!0,focused:this._isOpen||this._isFocused,open:this._isOpen,disabled:this.disabled,readonly:this.readonly,"has-value":l.length>0})}
          tabindex=${this.disabled?"-1":"0"}
          role="combobox"
          aria-expanded=${this._isOpen?"true":"false"}
          aria-haspopup="listbox"
          aria-controls=${c}
          aria-labelledby=${this.label?r:pe}
          aria-activedescendant=${u||pe}
          aria-disabled=${this.disabled?"true":pe}
          aria-required=${this.required?"true":pe}
          @click=${this._toggleDropdown}
          @keydown=${this._handleKeydown}
          @focus=${()=>{this._isFocused=!0}}
          @blur=${()=>{this._isFocused=!1}}
        >
          <slot name="icon"></slot>

          <div class="value-container">
            ${l.length===0?$`
              <span class="placeholder">${this.placeholder}</span>
            `:pe}

            ${this.multiple?VE(l,f=>f.value,f=>$`
                  <span class="chip">
                    ${f.label}
                    <button
                      type="button"
                      class="chip-remove"
                      aria-label="Remove ${f.label}"
                      @click=${b=>this._removeValue(f.value,b)}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                        <path d="M18 6L6 18M6 6l12 12"></path>
                      </svg>
                    </button>
                  </span>
                `):l[0]?$`
                  <span class="single-value">${l[0].label}</span>
                `:pe}
          </div>

          <div class="arrow">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>

        <div
          id=${c}
          class=${qe({dropdown:!0,open:this._isOpen,above:this._opensUp,below:!this._opensUp})}
          role="listbox"
          aria-multiselectable=${this.multiple?"true":"false"}
        >
          ${this.options.length===0?$`<div class="no-options">No options available</div>`:VE(this.options,f=>f.value,(f,b)=>{const v=this.value.includes(f.value);return $`
                  <div
                    id=${`${this._uid}-opt-${b}`}
                    class=${qe({option:!0,selected:v,highlighted:b===this._highlightedIndex,"option-disabled":!!f.disabled})}
                    @click=${N=>this._handleOptionClick(f,N)}
                    @mouseenter=${()=>{f.disabled||(this._highlightedIndex=b)}}
                    role="option"
                    aria-selected=${v?"true":"false"}
                    aria-disabled=${f.disabled?"true":pe}
                  >
                    <span>${f.label}</span>
                    <div class="check-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  </div>
                `})}
        </div>

        ${this.error&&this.errorMessage?$`
          <span class="error-message" role="alert">${this.errorMessage}</span>
        `:pe}
      </div>
    `}};wt.formAssociated=!0;wt.styles=ee`
    :host {
      display: block;
      /* Size tokens — override per [size] attribute */
      --_h: 40px;
      --_px: 12px;
      --_font: 0.875rem;

      --ui-select-bg: var(--ui-surface-background, #ffffff);
      --ui-select-border: var(--ui-input-border-color, #d1d5db);
      --ui-select-radius: var(--ui-input-border-radius, 8px);
      --ui-select-focus-color: var(--ui-primary-color, #3b82f6);
      --ui-select-error-color: #ef4444;

      font-family: var(--ui-font-family, sans-serif);
    }

    :host([size='sm']) { --_h: 32px; --_px: 8px;  --_font: 0.8125rem; }
    :host([size='md']) { --_h: 40px; --_px: 12px; --_font: 0.875rem;  }
    :host([size='lg']) { --_h: 48px; --_px: 16px; --_font: 0.9375rem; }

    .wrapper {
      display: flex;
      flex-direction: column;
      gap: 6px;
      position: relative;
    }

    label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--ui-text-color, #111827);
      margin-left: 2px;
    }

    .select-trigger {
      display: flex;
      align-items: center;
      min-height: var(--_h);
      padding: 0 var(--_px);
      background-color: var(--ui-select-bg);
      border: 1.5px solid var(--ui-select-border);
      border-radius: var(--ui-select-radius);
      cursor: pointer;
      transition: border-color 0.2s, box-shadow 0.2s;
      position: relative;
      gap: 10px;
      user-select: none;
      outline: none;
    }

    .select-trigger:hover:not(.disabled):not(.readonly) {
      border-color: var(--ui-secondary-color, #6b7280);
    }

    .select-trigger.focused {
      border-color: var(--ui-select-focus-color);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
    }

    :host([error]) .select-trigger {
      border-color: var(--ui-select-error-color);
    }

    :host([error]) .select-trigger.focused {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
    }

    .select-trigger.disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background-color: var(--ui-surface-background-flat, #f3f4f6);
    }

    .select-trigger.readonly {
      cursor: default;
      background-color: var(--ui-surface-background-flat, #f3f4f6);
    }

    .value-container {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      padding: 6px 0;
      min-height: 24px;
      align-items: center;
      overflow: hidden;
    }

    .placeholder {
      color: var(--ui-text-color-muted, #6b7280);
      font-size: var(--_font);
    }

    .single-value {
      color: var(--ui-text-color, #111827);
      font-size: var(--_font);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .chip {
      background-color: var(--ui-primary-color, #3b82f6);
      color: #ffffff;
      padding: 2px 8px 2px 10px;
      border-radius: 16px;
      font-size: 0.75rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 4px;
      animation: chip-in 0.2s ease-out;
    }

    @keyframes chip-in {
      from { transform: scale(0.8); opacity: 0; }
      to   { transform: scale(1);   opacity: 1; }
    }

    .chip-remove {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      opacity: 0.8;
      transition: opacity 0.2s;
      background: none;
      border: none;
      padding: 0;
      color: inherit;
      line-height: 0;
    }

    .chip-remove:hover { opacity: 1; }

    .arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s ease;
      color: var(--ui-text-color-muted, #6b7280);
      flex-shrink: 0;
    }

    .select-trigger.open .arrow {
      transform: rotate(180deg);
      color: var(--ui-select-focus-color);
    }

    /* Dropdown */
    .dropdown {
      position: absolute;
      left: 0;
      right: 0;
      background-color: var(--ui-select-bg);
      border-radius: var(--ui-select-radius);
      box-shadow: var(--ui-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
      border: 1px solid var(--ui-border-color, #e5e7eb);
      z-index: 1000;
      max-height: 260px;
      overflow-y: auto;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.15s, transform 0.15s;
    }

    .dropdown.below {
      top: calc(100% + 6px);
      transform: translateY(-8px);
    }

    .dropdown.above {
      bottom: calc(100% + 6px);
      transform: translateY(8px);
    }

    .dropdown.open {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }

    /* Options */
    .option {
      padding: 10px 14px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--ui-text-color, #111827);
      transition: background-color 0.15s;
      font-size: var(--_font);
    }

    .option.highlighted {
      background-color: var(--ui-hover-color, rgba(0, 0, 0, 0.05));
    }

    .option.selected {
      background-color: rgba(59, 130, 246, 0.08);
      color: var(--ui-primary-color, #3b82f6);
      font-weight: 600;
    }

    .option.option-disabled {
      opacity: 0.4;
      cursor: not-allowed;
      pointer-events: none;
    }

    .check-icon {
      color: var(--ui-primary-color, #3b82f6);
      opacity: 0;
      transition: opacity 0.15s;
      flex-shrink: 0;
    }

    .option.selected .check-icon { opacity: 1; }

    .no-options {
      padding: 12px 16px;
      color: var(--ui-text-color-muted, #6b7280);
      font-size: 0.875rem;
      cursor: default;
    }

    .error-message {
      font-size: 0.75rem;
      color: var(--ui-select-error-color);
      margin-left: 2px;
    }

    /* Scrollbar */
    .dropdown::-webkit-scrollbar { width: 6px; }
    .dropdown::-webkit-scrollbar-track { background: transparent; }
    .dropdown::-webkit-scrollbar-thumb {
      background: var(--ui-border-color, #e5e7eb);
      border-radius: 3px;
    }
  `;Zt([E({type:String})],wt.prototype,"label",2);Zt([E({type:Array})],wt.prototype,"options",2);Zt([E({type:Array})],wt.prototype,"value",2);Zt([E({type:Boolean})],wt.prototype,"multiple",2);Zt([E({type:String})],wt.prototype,"placeholder",2);Zt([E({type:Boolean,reflect:!0})],wt.prototype,"disabled",2);Zt([E({type:Boolean,reflect:!0})],wt.prototype,"readonly",2);Zt([E({type:Boolean,reflect:!0})],wt.prototype,"required",2);Zt([E({type:Boolean,reflect:!0})],wt.prototype,"error",2);Zt([E({type:String,attribute:"error-message"})],wt.prototype,"errorMessage",2);Zt([E({type:String})],wt.prototype,"name",2);Zt([E({type:String,reflect:!0})],wt.prototype,"size",2);Zt([E({type:String,attribute:"default-value"})],wt.prototype,"defaultValue",2);Zt([si()],wt.prototype,"_isOpen",2);Zt([si()],wt.prototype,"_highlightedIndex",2);Zt([si()],wt.prototype,"_isFocused",2);Zt([si()],wt.prototype,"_opensUp",2);wt=Zt([te("ui-select")],wt);const c_=R.forwardRef(function({label:l,options:r,value:c,multiple:u,placeholder:f,disabled:b,readonly:v,required:N,error:O,errorMessage:z,name:A,size:x,defaultValue:C,onChange:B,children:G,...J},I){const $e=R.useRef(null),ce=I??$e;return R.useEffect(()=>{const Te=ce.current;Te&&(l!==void 0&&(Te.label=l),r!==void 0&&(Te.options=r),c!==void 0&&(Te.value=c),u!==void 0&&(Te.multiple=u),f!==void 0&&(Te.placeholder=f),b!==void 0&&(Te.disabled=b),v!==void 0&&(Te.readonly=v),N!==void 0&&(Te.required=N),O!==void 0&&(Te.error=O),z!==void 0&&(Te.errorMessage=z),A!==void 0&&(Te.name=A),x!==void 0&&(Te.size=x),C!==void 0&&(Te.defaultValue=C))},[l,r,c,u,f,b,v,N,O,z,A,x,C]),R.useEffect(()=>{const Te=ce.current;if(!Te||!B)return;const St=B;return Te.addEventListener(OE.CHANGE,St),()=>Te.removeEventListener(OE.CHANGE,St)},[B]),h.jsxDEV("ui-select",{ref:ce,...J,children:G},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiSelect.tsx",lineNumber:62,columnNumber:13},this)});c_.displayName="UiSelect";const $E={CHANGE:"change"};var wT=Object.defineProperty,AT=Object.getOwnPropertyDescriptor,ml=(p,l,r,c)=>{for(var u=c>1?void 0:c?AT(l,r):l,f=p.length-1,b;f>=0;f--)(b=p[f])&&(u=(c?b(l,r,u):b(u))||u);return c&&u&&wT(l,r,u),u};let Na=class extends W{constructor(){super(...arguments),this.checked=!1,this.indeterminate=!1,this.disabled=!1,this.required=!1,this.label="",this.name="",this.value=""}_handleChange(l){if(this.disabled)return;const r=l.target;this.checked=r.checked,this.indeterminate=!1,this.dispatchEvent(new CustomEvent("change",{detail:{checked:this.checked,value:this.value,indeterminate:!1},bubbles:!0,composed:!0}))}render(){return $`
      <label class=${qe({wrapper:!0,disabled:this.disabled})}>
        <input
          type="checkbox"
          .checked=${this.checked}
          .indeterminate=${this.indeterminate}
          ?disabled=${this.disabled}
          ?required=${this.required}
          name=${this.name||pe}
          .value=${this.value}
          @change=${this._handleChange}
        >
        <div class=${qe({checkbox:!0,checked:this.checked,indeterminate:this.indeterminate})}>
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
            ${this.indeterminate?$`<line x1="4" y1="12" x2="20" y2="12"></line>`:$`<polyline points="20 6 9 17 4 12"></polyline>`}
          </svg>
        </div>
        ${this.label?$`<span class="label">${this.label}</span>`:$`<slot class="label"></slot>`}
      </label>
    `}};Na.styles=ee`
    :host {
      display: inline-block;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      color: var(--ui-text-color, #111827);
    }

    .wrapper {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
    }

    .wrapper.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .checkbox {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      border: 2px solid var(--ui-input-border-color, #d1d5db);
      border-radius: var(--ui-border-radius-sm, 4px);
      background-color: var(--ui-surface-background, white);
      transition: all 0.2s ease;
      margin-right: 8px;
    }

    .wrapper:hover:not(.disabled) .checkbox {
      border-color: var(--ui-primary-color, #3b82f6);
    }

    .checkbox.checked, .checkbox.indeterminate {
      background-color: var(--ui-primary-color, #3b82f6);
      border-color: var(--ui-primary-color, #3b82f6);
    }

    .icon {
      fill: none;
      stroke: var(--ui-text-color-on-primary, white);
      stroke-width: 3;
      stroke-linecap: round;
      stroke-linejoin: round;
      width: 12px;
      height: 12px;
      opacity: 0;
      transform: scale(0.5);
      transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .checked .icon, .indeterminate .icon {
      opacity: 1;
      transform: scale(1);
    }

    input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      margin: 0;
    }

    /* Focus ring for accessibility */
    input:focus-visible + .checkbox {
      outline: 2px solid var(--ui-primary-color, #3b82f6);
      outline-offset: 2px;
    }

    .label {
      font-size: 14px;
      line-height: 1.5;
      user-select: none;
    }

    /* Style when no label and no slot text is passed */
    ::slotted(*), .label {
      cursor: inherit;
    }
  `;ml([E({type:Boolean,reflect:!0})],Na.prototype,"checked",2);ml([E({type:Boolean})],Na.prototype,"indeterminate",2);ml([E({type:Boolean,reflect:!0})],Na.prototype,"disabled",2);ml([E({type:Boolean})],Na.prototype,"required",2);ml([E({type:String})],Na.prototype,"label",2);ml([E({type:String})],Na.prototype,"name",2);ml([E({type:String})],Na.prototype,"value",2);Na=ml([te("ui-checkbox")],Na);const rs=R.forwardRef(function({checked:l,indeterminate:r,disabled:c,required:u,label:f,name:b,value:v,onChange:N,children:O,...z},A){const x=R.useRef(null),C=A??x;return R.useEffect(()=>{const B=C.current;B&&(l!==void 0&&(B.checked=l),r!==void 0&&(B.indeterminate=r),c!==void 0&&(B.disabled=c),u!==void 0&&(B.required=u),f!==void 0&&(B.label=f),b!==void 0&&(B.name=b),v!==void 0&&(B.value=v))},[l,r,c,u,f,b,v]),R.useEffect(()=>{const B=C.current;if(!B||!N)return;const G=N;return B.addEventListener($E.CHANGE,G),()=>B.removeEventListener($E.CHANGE,G)},[N]),h.jsxDEV("ui-checkbox",{ref:C,...z,children:O},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiCheckbox.tsx",lineNumber:50,columnNumber:13},this)});rs.displayName="UiCheckbox";const ME={CHANGE:"ui-slider-change"};const d_="important",f_=" !"+d_,DT=0-f_.length;class UT extends cy{constructor(l){if(super(l),l.type!==ry.ATTRIBUTE||l.name!=="style"||l.strings?.length>2)throw new Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(l){return Object.keys(l).reduce((r,c)=>{const u=l[c];return u==null?r:(c=c.includes("-")?c:c.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase(),r+`${c}:${u};`)},"")}update(l,[r]){const{style:c}=l.element;if(this._previousStyleProperties===void 0)return this._previousStyleProperties=new Set(Object.keys(r)),this.render(r);for(const u of this._previousStyleProperties)r[u]==null&&(this._previousStyleProperties.delete(u),u.includes("-")?c.removeProperty(u):c[u]=null);for(const u in r){const f=r[u];if(f!=null){this._previousStyleProperties.add(u);const b=typeof f=="string"&&f.endsWith(f_);u.includes("-")||b?c.setProperty(u,b?f.slice(0,DT):f,b?d_:""):c[u]=f}}return lo}}const p_=uy(UT);var TT=Object.defineProperty,RT=Object.getOwnPropertyDescriptor,Ki=(p,l,r,c)=>{for(var u=c>1?void 0:c?RT(l,r):l,f=p.length-1,b;f>=0;f--)(b=p[f])&&(u=(c?b(l,r,u):b(u))||u);return c&&u&&TT(l,r,u),u};let li=class extends W{constructor(){super(),this._internals=null,this.value=50,this.defaultValue=void 0,this.min=0,this.max=100,this.step=1,this.disabled=!1,this.label="",this.showValue=!1,this.vertical=!1,this.size="md",this.name="",this.formatValue=void 0,this._firstUpdate=!0,typeof this.attachInternals=="function"&&(this._internals=this.attachInternals())}get _safeMin(){return this.min<this.max?this.min:0}get _safeMax(){return this.max>this.min?this.max:this._safeMin+100}get _safeValue(){return Math.min(this._safeMax,Math.max(this._safeMin,this.value))}willUpdate(l){this._firstUpdate&&this.defaultValue!==void 0&&(this.value=this.defaultValue),this._firstUpdate=!1,(l.has("value")||l.has("name"))&&typeof this._internals?.setFormValue=="function"&&this._internals.setFormValue(this._safeValue.toString())}_handleInput(l){const r=l.target;this.value=Number(r.value),this.dispatchEvent(new CustomEvent("ui-slider-change",{detail:{value:this.value},bubbles:!0,composed:!0}))}render(){const l=this._safeValue,r=this._safeMin,c=this._safeMax,u=(l-r)/(c-r)*100,f=this.formatValue?this.formatValue(l):String(l),b=this.vertical?{background:`linear-gradient(to left, var(--ui-primary-color, #3b82f6) 0%, var(--ui-primary-color, #3b82f6) ${u}%, var(--ui-input-border-color, #d1d5db) ${u}%, var(--ui-input-border-color, #d1d5db) 100%)`}:{background:`linear-gradient(to right, var(--ui-primary-color, #3b82f6) 0%, var(--ui-primary-color, #3b82f6) ${u}%, var(--ui-input-border-color, #d1d5db) ${u}%, var(--ui-input-border-color, #d1d5db) 100%)`},v={"slider-wrapper":!0,vertical:this.vertical},N={"label-row":!0,vertical:this.vertical},O={"track-container":!0,vertical:this.vertical},z={vertical:this.vertical},A="slider-input";return $`
      <div class=${qe(v)}>
        <div class=${qe(N)}>
          ${this.label?$`<label
                for=${A}
                class=${qe({"disabled-label":this.disabled})}
              >${this.label}</label>`:""}
          ${this.showValue?$`<span class="value-display">${f}</span>`:""}
        </div>
        <div class=${qe(O)}>
          <input
            id=${A}
            type="range"
            class=${qe(z)}
            .min=${r.toString()}
            .max=${c.toString()}
            .step=${this.step.toString()}
            .value=${l.toString()}
            ?disabled=${this.disabled}
            @input=${this._handleInput}
            style=${p_(b)}
            aria-label=${this.label||"Slider"}
            aria-orientation=${this.vertical?"vertical":"horizontal"}
            aria-valuetext=${this.formatValue?f:""}
          >
        </div>
      </div>
    `}};li.formAssociated=!0;li.styles=ee`
    :host {
      display: block;
      padding: 12px 0;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      color: var(--ui-text-color, #111827);

      /* Size tokens — overridden per size below */
      --_track-height: 6px;
      --_thumb-size: 20px;
      --_font-size: 14px;
    }

    :host([size='sm']) {
      --_track-height: 4px;
      --_thumb-size: 14px;
      --_font-size: 12px;
    }

    :host([size='lg']) {
      --_track-height: 8px;
      --_thumb-size: 24px;
      --_font-size: 16px;
    }

    :host([vertical]) {
      padding: 0 12px;
      display: inline-flex;
      height: var(--ui-slider-vertical-height, 200px);
    }

    .slider-wrapper {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .slider-wrapper.vertical {
      flex-direction: column-reverse;
      align-items: center;
      gap: 12px;
      width: 100%;
      height: 100%;
      justify-content: flex-end;
    }

    .label-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: var(--_font-size);
      font-weight: 500;
    }

    .label-row.vertical {
      flex-direction: column;
      align-items: center;
      gap: 2px;
      flex-shrink: 0;
    }

    .value-display {
      font-weight: 600;
      color: var(--ui-primary-color, #3b82f6);
    }

    .track-container {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }

    .track-container.vertical {
      flex: 1;
      min-height: 0;
      width: auto;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    input[type='range'] {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: var(--_track-height);
      background: var(--ui-input-border-color, #d1d5db);
      border-radius: 3px;
      outline: none;
      margin: 10px 0;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    input[type='range'].vertical {
      writing-mode: vertical-lr;
      direction: rtl;
      width: var(--_track-height);
      height: 100%;
      margin: 0;
      appearance: slider-vertical;
      -webkit-appearance: slider-vertical;
    }

    @supports not (appearance: slider-vertical) {
      input[type='range'].vertical {
        writing-mode: vertical-lr;
        direction: rtl;
        width: var(--_track-height);
        height: 100%;
        margin: 0;
      }
    }

    input[type='range']:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    /* Thumb — WebKit */
    input[type='range']::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: var(--_thumb-size);
      height: var(--_thumb-size);
      border-radius: 50%;
      background: var(--ui-surface-background, white);
      border: 2px solid var(--ui-primary-color, #3b82f6);
      box-shadow: var(--ui-shadow-sm);
      cursor: pointer;
      transition: transform 0.1s ease, box-shadow 0.1s ease;
    }

    /* Thumb — Firefox */
    input[type='range']::-moz-range-thumb {
      width: calc(var(--_thumb-size) - 2px);
      height: calc(var(--_thumb-size) - 2px);
      border-radius: 50%;
      background: var(--ui-surface-background, white);
      border: 2px solid var(--ui-primary-color, #3b82f6);
      box-shadow: var(--ui-shadow-sm);
      cursor: pointer;
    }

    /* Firefox fill track */
    input[type='range']::-moz-range-progress {
      background: var(--ui-primary-color, #3b82f6);
      height: var(--_track-height);
      border-radius: 3px;
    }

    input[type='range']:focus-visible::-webkit-slider-thumb {
      outline: 2px solid var(--ui-primary-color, #3b82f6);
      outline-offset: 4px;
    }

    input[type='range']:not(:disabled):hover::-webkit-slider-thumb {
      transform: scale(1.1);
      box-shadow: var(--ui-shadow-md);
    }

    input[type='range']:active::-webkit-slider-thumb {
      transform: scale(0.95);
    }

    .disabled-label {
      color: var(--ui-text-color-muted);
    }
  `;Ki([E({type:Number})],li.prototype,"value",2);Ki([E({type:Number,attribute:"default-value"})],li.prototype,"defaultValue",2);Ki([E({type:Number})],li.prototype,"min",2);Ki([E({type:Number})],li.prototype,"max",2);Ki([E({type:Number})],li.prototype,"step",2);Ki([E({type:Boolean,reflect:!0})],li.prototype,"disabled",2);Ki([E({type:String})],li.prototype,"label",2);Ki([E({type:Boolean,attribute:"show-value"})],li.prototype,"showValue",2);Ki([E({type:Boolean,reflect:!0})],li.prototype,"vertical",2);Ki([E({type:String,reflect:!0})],li.prototype,"size",2);Ki([E({type:String})],li.prototype,"name",2);Ki([E({attribute:!1})],li.prototype,"formatValue",2);li=Ki([te("ui-slider")],li);const Ep=R.forwardRef(function({value:l,defaultValue:r,min:c,max:u,step:f,disabled:b,label:v,showValue:N,vertical:O,size:z,name:A,formatValue:x,onUiSliderChange:C,children:B,...G},J){const I=R.useRef(null),$e=J??I;return R.useEffect(()=>{const ce=$e.current;ce&&(l!==void 0&&(ce.value=l),r!==void 0&&(ce.defaultValue=r),c!==void 0&&(ce.min=c),u!==void 0&&(ce.max=u),f!==void 0&&(ce.step=f),b!==void 0&&(ce.disabled=b),v!==void 0&&(ce.label=v),N!==void 0&&(ce.showValue=N),O!==void 0&&(ce.vertical=O),z!==void 0&&(ce.size=z),A!==void 0&&(ce.name=A),x!==void 0&&(ce.formatValue=x))},[l,r,c,u,f,b,v,N,O,z,A,x]),R.useEffect(()=>{const ce=$e.current;if(!ce||!C)return;const Te=C;return ce.addEventListener(ME.CHANGE,Te),()=>ce.removeEventListener(ME.CHANGE,Te)},[C]),h.jsxDEV("ui-slider",{ref:$e,...G,children:B},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiSlider.tsx",lineNumber:60,columnNumber:13},this)});Ep.displayName="UiSlider";const BE={CHANGE:"ui-rating-change"};var CT=Object.defineProperty,kT=Object.getOwnPropertyDescriptor,xn=(p,l,r,c)=>{for(var u=c>1?void 0:c?kT(l,r):l,f=p.length-1,b;f>=0;f--)(b=p[f])&&(u=(c?b(l,r,u):b(u))||u);return c&&u&&CT(l,r,u),u};let Ti=class extends W{constructor(){super(...arguments),this.value=0,this.max=5,this.readonly=!1,this.disabled=!1,this.clearable=!1,this.defaultValue=0,this.size="md",this.name="",this.label="Rating",this.precision=1,this._hoverValue=-1,this._firstUpdate=!0}willUpdate(l){this._firstUpdate&&this.defaultValue!==0&&(this.value=this.defaultValue),this._firstUpdate=!1,(l.has("value")||l.has("name"))&&this._syncHiddenInput()}_syncHiddenInput(){const l=this.shadowRoot?.querySelector(".hidden-input");l&&(l.name=this.name,l.value=String(this.value))}firstUpdated(){this._syncHiddenInput()}_isInteractive(){return!this.readonly&&!this.disabled}_handleMouseEnter(l){this._isInteractive()&&(this._hoverValue=l)}_handleMouseLeave(){this._isInteractive()&&(this._hoverValue=-1)}_handleMouseMove(l,r){if(!this._isInteractive()||this.precision!==.5)return;const c=l.currentTarget,{left:u,width:f}=c.getBoundingClientRect(),b=l.clientX-u<f/2;this._hoverValue=b?r-.5:r}_handleClick(l){if(!this._isInteractive())return;const r=this.clearable&&this.value===l?0:l;this.value=r,this.dispatchEvent(new CustomEvent("ui-rating-change",{detail:{value:this.value},bubbles:!0,composed:!0}))}_handleKeydown(l,r){if(!this._isInteractive())return;const c=this.precision===.5?.5:1;let u=this.value;switch(l.key){case"ArrowRight":case"ArrowUp":l.preventDefault(),u=Math.min(this.max,this.value+c);break;case"ArrowLeft":case"ArrowDown":l.preventDefault(),u=Math.max(0,this.value-c);break;case"Home":l.preventDefault(),u=0;break;case"End":l.preventDefault(),u=this.max;break;case" ":case"Enter":l.preventDefault(),this._handleClick(r);return;default:return}u!==this.value&&(this.value=u,this.dispatchEvent(new CustomEvent("ui-rating-change",{detail:{value:this.value},bubbles:!0,composed:!0})))}_starSvg(l){const r="ui-rating-half";return Cg`
            <svg viewBox="0 0 24 24" aria-hidden="true">
                ${l==="half"?Cg`
                    <defs>
                        <linearGradient id="${r}">
                            <stop offset="50%" stop-color="var(--ui-rating-color)"></stop>
                            <stop offset="50%" stop-color="var(--ui-rating-empty-color)"></stop>
                        </linearGradient>
                    </defs>
                    <path fill="url(#${r})" stroke="var(--ui-rating-color)" stroke-width="1"
                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                `:Cg`
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                `}
            </svg>
        `}render(){const l=Math.ceil(this.value)||1,r=[];for(let c=1;c<=this.max;c++){const u=this._hoverValue!==-1?this._hoverValue:this.value,f=this.precision===.5&&u>=c-.5&&u<c,b=u>=c,v=this._hoverValue!==-1;let N;f?N="half":b?N="full":N="empty";const O={"star-wrapper":!0,active:N==="full"&&!v,hover:N==="full"&&v,half:N==="half",readonly:this.readonly,disabled:this.disabled};r.push($`
                <span
                    class=${qe(O)}
                    role="radio"
                    aria-label="${c} ${c===1?"star":"stars"}"
                    aria-checked=${this.value>=c?"true":"false"}
                    tabindex=${c===l&&!this.disabled?"0":"-1"}
                    @mouseenter=${()=>this._handleMouseEnter(c)}
                    @mousemove=${z=>this._handleMouseMove(z,c)}
                    @click=${()=>this._handleClick(this._hoverValue!==-1?this._hoverValue:c)}
                    @keydown=${z=>this._handleKeydown(z,c)}
                >
                    ${this._starSvg(N)}
                </span>
            `)}return $`
            <input class="hidden-input" type="hidden" .name=${this.name} .value=${String(this.value)}>
            <div
                class="rating-container"
                role="radiogroup"
                aria-label=${this.label}
                aria-disabled=${this.disabled?"true":"false"}
                aria-readonly=${this.readonly?"true":"false"}
                @mouseleave=${this._handleMouseLeave}
            >
                ${r}
            </div>
        `}};Ti.styles=ee`
    :host {
      display: inline-block;
      font-family: var(--ui-font-family, system-ui, sans-serif);
      --ui-rating-color: #ffb400;
      --ui-rating-empty-color: #faaf0033;
      --ui-rating-size: 2rem;
      font-size: var(--ui-rating-size);
    }

    :host([size="sm"]) { --ui-rating-size: 1.25rem; }
    :host([size="md"]) { --ui-rating-size: 2rem; }
    :host([size="lg"]) { --ui-rating-size: 2.75rem; }

    :host([disabled]) {
      opacity: 0.4;
      cursor: not-allowed;
    }

    :host([readonly]) .rating-container {
      cursor: default;
    }

    .rating-container {
      display: inline-flex;
      position: relative;
      cursor: pointer;
      font-size: 1em;
      line-height: 1;
      gap: 0.1em;
    }

    .rating-container:focus {
      outline: none;
    }

    .star-wrapper {
      position: relative;
      display: inline-flex;
      transition: transform 0.1s ease;
      outline: none;
    }

    .star-wrapper:focus-visible {
      border-radius: 2px;
      box-shadow: 0 0 0 2px var(--ui-rating-color);
    }

    .star-wrapper:not(.readonly):not(.disabled):hover {
      transform: scale(1.1);
    }

    svg {
      width: 1em;
      height: 1em;
      fill: var(--ui-rating-empty-color);
      stroke: var(--ui-rating-color);
      stroke-width: 1;
      transition: fill 0.2s ease, stroke 0.2s ease;
      overflow: visible;
    }

    .active svg {
      fill: var(--ui-rating-color);
    }

    .hover svg {
      fill: var(--ui-rating-color);
      opacity: 0.7;
    }

    .half svg .star-full {
      display: none;
    }

    .half svg .star-half {
      display: block;
    }

    .star-half {
      display: none;
    }

    .hidden-input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      margin: 0;
      pointer-events: none;
    }
  `;xn([E({type:Number})],Ti.prototype,"value",2);xn([E({type:Number})],Ti.prototype,"max",2);xn([E({type:Boolean,reflect:!0})],Ti.prototype,"readonly",2);xn([E({type:Boolean,reflect:!0})],Ti.prototype,"disabled",2);xn([E({type:Boolean})],Ti.prototype,"clearable",2);xn([E({type:Number})],Ti.prototype,"defaultValue",2);xn([E({type:String,reflect:!0})],Ti.prototype,"size",2);xn([E({type:String})],Ti.prototype,"name",2);xn([E({type:String})],Ti.prototype,"label",2);xn([E({type:Number})],Ti.prototype,"precision",2);xn([si()],Ti.prototype,"_hoverValue",2);Ti=xn([te("ui-rating")],Ti);const Vp=R.forwardRef(function({value:l,max:r,readonly:c,disabled:u,clearable:f,defaultValue:b,size:v,name:N,label:O,precision:z,onUiRatingChange:A,children:x,...C},B){const G=R.useRef(null),J=B??G;return R.useEffect(()=>{const I=J.current;I&&(l!==void 0&&(I.value=l),r!==void 0&&(I.max=r),c!==void 0&&(I.readonly=c),u!==void 0&&(I.disabled=u),f!==void 0&&(I.clearable=f),b!==void 0&&(I.defaultValue=b),v!==void 0&&(I.size=v),N!==void 0&&(I.name=N),O!==void 0&&(I.label=O),z!==void 0&&(I.precision=z))},[l,r,c,u,f,b,v,N,O,z]),R.useEffect(()=>{const I=J.current;if(!I||!A)return;const $e=A;return I.addEventListener(BE.CHANGE,$e),()=>I.removeEventListener(BE.CHANGE,$e)},[A]),h.jsxDEV("ui-rating",{ref:J,...C,children:x},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiRating.tsx",lineNumber:56,columnNumber:13},this)});Vp.displayName="UiRating";var OT=Object.defineProperty,zT=Object.getOwnPropertyDescriptor,Bn=(p,l,r,c)=>{for(var u=c>1?void 0:c?zT(l,r):l,f=p.length-1,b;f>=0;f--)(b=p[f])&&(u=(c?b(l,r,u):b(u))||u);return c&&u&&OT(l,r,u),u};let _p=class extends W{constructor(){super(...arguments),this.shadow=!1}render(){return $`<slot></slot>`}};_p.styles=ee`
    :host {
      display: block;
      width: 100%;
      overflow-x: auto;
      background-color: var(--ui-surface-background, white);
      border-radius: var(--ui-border-radius-lg, 8px);
      box-shadow: var(--ui-shadow-sm, 0 1px 3px rgba(0,0,0,0.1));
    }
    :host([shadow]) {
      box-shadow: var(--ui-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06));
    }
  `;Bn([E({type:Boolean,reflect:!0})],_p.prototype,"shadow",2);_p=Bn([te("ui-table-container")],_p);let Hg=class extends W{render(){return $`<slot></slot>`}};Hg.styles=ee`
    :host {
      display: table;
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      color: var(--ui-text-color, #111827);
    }
  `;Hg=Bn([te("ui-table")],Hg);let qg=class extends W{render(){return $`<slot></slot>`}};qg.styles=ee`
    :host {
      display: table-header-group;
    }
  `;qg=Bn([te("ui-table-head")],qg);let Yg=class extends W{render(){return $`<slot></slot>`}};Yg.styles=ee`
    :host {
      display: table-row-group;
    }
  `;Yg=Bn([te("ui-table-body")],Yg);let wp=class extends W{constructor(){super(...arguments),this.selected=!1}render(){return $`<slot></slot>`}};wp.styles=ee`
    :host {
      display: table-row;
      vertical-align: middle;
      outline: 0;
      transition: background-color 0.2s ease;
    }
    :host(:hover) {
      background-color: var(--ui-hover-color, rgba(0, 0, 0, 0.04));
    }
    :host([selected]) {
      background-color: var(--ui-active-color, rgba(59, 130, 246, 0.08));
    }
  `;Bn([E({type:Boolean,reflect:!0})],wp.prototype,"selected",2);wp=Bn([te("ui-table-row")],wp);let zc=class extends W{constructor(){super(...arguments),this.header=!1,this.align="left"}render(){return $`<slot></slot>`}};zc.styles=ee`
    :host {
      display: table-cell;
      padding: 16px;
      font-size: 0.875rem;
      text-align: left;
      border-bottom: 1px solid var(--ui-border-color, #e5e7eb);
    }
    :host([header]) {
      color: var(--ui-text-color-muted, #6b7280);
      font-weight: 600;
      line-height: 1.5rem;
    }
    :host([align="right"]) { text-align: right; }
    :host([align="center"]) { text-align: center; }
    :host([padding="checkbox"]) { width: 48px; padding: 0 0 0 4px; }
  `;Bn([E({type:Boolean,reflect:!0})],zc.prototype,"header",2);Bn([E({type:String,reflect:!0})],zc.prototype,"align",2);zc=Bn([te("ui-table-cell")],zc);let Gg=class extends W{render(){return $`<slot></slot>`}};Gg.styles=ee`
    :host {
      display: table-footer-group;
    }
  `;Gg=Bn([te("ui-table-footer")],Gg);const h_=R.forwardRef(function({children:l,...r},c){const u=R.useRef(null),f=c??u;return h.jsxDEV("ui-table",{ref:f,...r,children:l},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiTable.tsx",lineNumber:20,columnNumber:13},this)});h_.displayName="UiTable";const m_=R.forwardRef(function({shadow:l,children:r,...c},u){const f=R.useRef(null),b=u??f;return R.useEffect(()=>{const v=b.current;v&&l!==void 0&&(v.shadow=l)},[l]),h.jsxDEV("ui-table-container",{ref:b,...c,children:r},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiTableContainer.tsx",lineNumber:28,columnNumber:13},this)});m_.displayName="UiTableContainer";const b_=R.forwardRef(function({children:l,...r},c){const u=R.useRef(null),f=c??u;return h.jsxDEV("ui-table-head",{ref:f,...r,children:l},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiTableHead.tsx",lineNumber:20,columnNumber:13},this)});b_.displayName="UiTableHead";const g_=R.forwardRef(function({children:l,...r},c){const u=R.useRef(null),f=c??u;return h.jsxDEV("ui-table-body",{ref:f,...r,children:l},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiTableBody.tsx",lineNumber:20,columnNumber:13},this)});g_.displayName="UiTableBody";const Xg=R.forwardRef(function({selected:l,children:r,...c},u){const f=R.useRef(null),b=u??f;return R.useEffect(()=>{const v=b.current;v&&l!==void 0&&(v.selected=l)},[l]),h.jsxDEV("ui-table-row",{ref:b,...c,children:r},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiTableRow.tsx",lineNumber:28,columnNumber:13},this)});Xg.displayName="UiTableRow";const Fa=R.forwardRef(function({header:l,align:r,children:c,...u},f){const b=R.useRef(null),v=f??b;return R.useEffect(()=>{const N=v.current;N&&(l!==void 0&&(N.header=l),r!==void 0&&(N.align=r))},[l,r]),h.jsxDEV("ui-table-cell",{ref:v,...u,children:c},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiTableCell.tsx",lineNumber:30,columnNumber:13},this)});Fa.displayName="UiTableCell";var jT=Object.defineProperty,VT=Object.getOwnPropertyDescriptor,Ri=(p,l,r,c)=>{for(var u=c>1?void 0:c?VT(l,r):l,f=p.length-1,b;f>=0;f--)(b=p[f])&&(u=(c?b(l,r,u):b(u))||u);return c&&u&&jT(l,r,u),u};let jc=class extends W{constructor(){super(...arguments),this.disablePadding=!1,this.dense=!1}render(){return $`<ul role="list" style="margin: 0; padding: 0; list-style: none;"><slot></slot></ul>`}};jc.styles=ee`
    :host {
      display: block;
      padding: 8px 0;
      margin: 0;
      list-style: none;
      background-color: var(--ui-surface-background, white);
    }
    :host([disable-padding]) {
      padding: 0;
    }
    :host([dense]) {
      --ui-list-item-padding: 4px 16px;
      --ui-list-item-gap: 8px;
    }
  `;Ri([E({type:Boolean,reflect:!0,attribute:"disable-padding"})],jc.prototype,"disablePadding",2);Ri([E({type:Boolean,reflect:!0})],jc.prototype,"dense",2);jc=Ri([te("ui-list")],jc);let Qg=class extends W{render(){return $`<li role="listitem"><slot></slot></li>`}};Qg.styles=ee`
    :host {
      display: block;
      box-sizing: border-box;
    }
    li {
      display: flex;
      align-items: center;
      padding: var(--ui-list-item-padding, 8px 16px);
      gap: var(--ui-list-item-gap, 16px);
      list-style: none;
    }
  `;Qg=Ri([te("ui-list-item")],Qg);let Vc=class extends W{constructor(){super(...arguments),this.disabled=!1,this.selected=!1,this._handleKeydown=l=>{this.disabled||(l.key==="Enter"||l.key===" ")&&(l.preventDefault(),this.click())}}render(){return $`
      <li
        role="button"
        tabindex=${this.disabled?"-1":"0"}
        aria-disabled=${this.disabled?"true":pe}
        aria-current=${this.selected?"true":pe}
        @keydown=${this._handleKeydown}
      ><slot></slot></li>
    `}};Vc.styles=ee`
    :host {
      display: block;
      box-sizing: border-box;
    }
    li {
      display: flex;
      align-items: center;
      padding: var(--ui-list-item-padding, 8px 16px);
      gap: var(--ui-list-item-gap, 16px);
      cursor: pointer;
      transition: background-color 0.2s ease;
      user-select: none;
      list-style: none;
      outline: none;
    }
    li:hover {
      background-color: var(--ui-hover-color, rgba(0, 0, 0, 0.04));
    }
    li:active {
      background-color: var(--ui-active-color, rgba(0, 0, 0, 0.08));
    }
    li:focus-visible {
      background-color: var(--ui-hover-color, rgba(0, 0, 0, 0.04));
      box-shadow: inset 0 0 0 2px var(--ui-primary-color, #3b82f6);
    }
    :host([selected]) li {
      background-color: var(--ui-selected-color, rgba(59, 130, 246, 0.1));
      color: var(--ui-primary-color, #3b82f6);
    }
    :host([disabled]) li {
      opacity: 0.5;
      cursor: default;
      pointer-events: none;
    }
  `;Ri([E({type:Boolean,reflect:!0})],Vc.prototype,"disabled",2);Ri([E({type:Boolean,reflect:!0})],Vc.prototype,"selected",2);Vc=Ri([te("ui-list-item-button")],Vc);let Zg=class extends W{render(){return $`<slot></slot>`}};Zg.styles=ee`
    :host {
      display: inline-flex;
      min-width: 40px;
      color: var(--ui-text-color-muted, #6b7280);
      flex-shrink: 0;
    }
    ::slotted(*) {
        width: 24px;
        height: 24px;
    }
  `;Zg=Ri([te("ui-list-item-icon")],Zg);let Pg=class extends W{render(){return $`<slot></slot>`}};Pg.styles=ee`
    :host {
      display: inline-flex;
      min-width: 56px;
      flex-shrink: 0;
    }
  `;Pg=Ri([te("ui-list-item-avatar")],Pg);let Or=class extends W{constructor(){super(...arguments),this.primary="",this.secondary="",this._hasSecondarySlot=!1}_onSecondarySlotChange(l){const r=l.target;this._hasSecondarySlot=r.assignedNodes({flatten:!0}).length>0}render(){const l=!!this.secondary||this._hasSecondarySlot;return $`
      <span class="primary">${this.primary}<slot name="primary"></slot></span>
      <span class="secondary" style=${l?"":"display:none"}>
        ${this.secondary}<slot name="secondary" @slotchange=${this._onSecondarySlotChange}></slot>
      </span>
    `}};Or.styles=ee`
    :host {
      flex: 1 1 auto;
      margin-top: 4px;
      margin-bottom: 4px;
    }
    .primary {
      display: block;
      font-family: var(--ui-font-family, sans-serif);
      font-size: 1rem;
      color: var(--ui-text-color, #111827);
      line-height: 1.5;
    }
    .secondary {
      display: block;
      font-family: var(--ui-font-family, sans-serif);
      font-size: 0.875rem;
      color: var(--ui-text-color-muted, #6b7280);
      line-height: 1.43;
    }
  `;Ri([E({type:String})],Or.prototype,"primary",2);Ri([E({type:String})],Or.prototype,"secondary",2);Ri([si()],Or.prototype,"_hasSecondarySlot",2);Or=Ri([te("ui-list-item-text")],Or);let Jg=class extends W{render(){return $`<slot></slot>`}};Jg.styles=ee`
    :host {
      display: block;
      padding: 16px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--ui-text-color-muted, #6b7280);
      font-family: var(--ui-font-family, sans-serif);
      line-height: 1;
    }
  `;Jg=Ri([te("ui-list-subheader")],Jg);const y_=R.forwardRef(function({disablePadding:l,dense:r,children:c,...u},f){const b=R.useRef(null),v=f??b;return R.useEffect(()=>{const N=v.current;N&&(l!==void 0&&(N.disablePadding=l),r!==void 0&&(N.dense=r))},[l,r]),h.jsxDEV("ui-list",{ref:v,...u,children:c},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiList.tsx",lineNumber:30,columnNumber:13},this)});y_.displayName="UiList";const v_=R.forwardRef(function({children:l,...r},c){const u=R.useRef(null),f=c??u;return h.jsxDEV("ui-list-item",{ref:f,...r,children:l},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiListItem.tsx",lineNumber:20,columnNumber:13},this)});v_.displayName="UiListItem";const x_=R.forwardRef(function({disabled:l,selected:r,children:c,...u},f){const b=R.useRef(null),v=f??b;return R.useEffect(()=>{const N=v.current;N&&(l!==void 0&&(N.disabled=l),r!==void 0&&(N.selected=r))},[l,r]),h.jsxDEV("ui-list-item-button",{ref:v,...u,children:c},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiListItemButton.tsx",lineNumber:30,columnNumber:13},this)});x_.displayName="UiListItemButton";const N_=R.forwardRef(function({primary:l,secondary:r,children:c,...u},f){const b=R.useRef(null),v=f??b;return R.useEffect(()=>{const N=v.current;N&&(l!==void 0&&(N.primary=l),r!==void 0&&(N.secondary=r))},[l,r]),h.jsxDEV("ui-list-item-text",{ref:v,...u,children:c},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiListItemText.tsx",lineNumber:30,columnNumber:13},this)});N_.displayName="UiListItemText";const S_=R.forwardRef(function({children:l,...r},c){const u=R.useRef(null),f=c??u;return h.jsxDEV("ui-list-item-icon",{ref:f,...r,children:l},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiListItemIcon.tsx",lineNumber:20,columnNumber:13},this)});S_.displayName="UiListItemIcon";var $T=Object.defineProperty,MT=Object.getOwnPropertyDescriptor,gs=(p,l,r,c)=>{for(var u=c>1?void 0:c?MT(l,r):l,f=p.length-1,b;f>=0;f--)(b=p[f])&&(u=(c?b(l,r,u):b(u))||u);return c&&u&&$T(l,r,u),u};let uo=class extends W{constructor(){super(...arguments),this.dark=!1,this.animation="pulse",this.variant="text",this.width="",this.height="",this.label="Loading..."}connectedCallback(){super.connectedCallback(),this.hasAttribute("role")||this.setAttribute("role","status"),this._syncLabel()}updated(l){l.has("label")&&this._syncLabel()}_syncLabel(){this.label?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label")}render(){const l=this.variant==="text",r=this.animation!=="none"?this.animation:"",c={width:this.width||(l?"100%":""),height:this.height||(l?"0.8em":""),marginTop:l?"0.3em":"",marginBottom:l?"0.3em":""};return $`
            <span
                part="skeleton"
                class="skeleton ${r} ${this.variant}"
                style=${p_(c)}
                aria-hidden="true"
            ></span>
        `}};uo.styles=ee`
        :host {
            display: block;
        }

        .skeleton {
            display: block;
            background-color: var(--ui-skeleton-bg, #e0e0e0);
            position: relative;
            overflow: hidden;
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
            .skeleton {
                background-color: var(--ui-skeleton-bg-dark, rgba(255, 255, 255, 0.13));
            }
        }

        /* Explicit dark attribute support */
        :host([dark]) .skeleton {
            background-color: var(--ui-skeleton-bg-dark, rgba(255, 255, 255, 0.13));
        }

        .skeleton.pulse {
            animation: pulse var(--ui-skeleton-animation-duration, 1.5s) ease-in-out 0.5s infinite;
        }

        .skeleton.wave::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(
                90deg,
                transparent,
                var(--ui-skeleton-wave-color, rgba(255, 255, 255, 0.4)),
                transparent
            );
            animation: wave var(--ui-skeleton-animation-duration, 1.6s) linear infinite;
            transform: translateX(-100%);
        }

        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.4; }
            100% { opacity: 1; }
        }

        @keyframes wave {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }

        .text {
            border-radius: var(--ui-border-radius-sm, 3px);
        }

        .circular {
            border-radius: 50%;
        }

        .rectangular {
            border-radius: var(--ui-border-radius-md, 4px);
        }

        .rounded {
            border-radius: var(--ui-border-radius-lg, 8px);
        }

        /* Respect user reduced-motion preference */
        @media (prefers-reduced-motion: reduce) {
            .skeleton.pulse {
                animation: none;
            }

            .skeleton.wave::after {
                display: none;
            }
        }
    `;gs([E({type:Boolean,reflect:!0})],uo.prototype,"dark",2);gs([E({type:String,reflect:!0})],uo.prototype,"animation",2);gs([E({type:String,reflect:!0})],uo.prototype,"variant",2);gs([E({type:String})],uo.prototype,"width",2);gs([E({type:String})],uo.prototype,"height",2);gs([E({type:String})],uo.prototype,"label",2);uo=gs([te("ui-skeleton")],uo);const Ui=R.forwardRef(function({dark:l,animation:r,variant:c,width:u,height:f,label:b,children:v,...N},O){const z=R.useRef(null),A=O??z;return R.useEffect(()=>{const x=A.current;x&&(l!==void 0&&(x.dark=l),r!==void 0&&(x.animation=r),c!==void 0&&(x.variant=c),u!==void 0&&(x.width=u),f!==void 0&&(x.height=f),b!==void 0&&(x.label=b))},[l,r,c,u,f,b]),h.jsxDEV("ui-skeleton",{ref:A,...N,children:v},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiSkeleton.tsx",lineNumber:38,columnNumber:13},this)});Ui.displayName="UiSkeleton";const LE={CLOSE:"close"};var BT=Object.defineProperty,LT=Object.getOwnPropertyDescriptor,$p=(p,l,r,c)=>{for(var u=c>1?void 0:c?LT(l,r):l,f=p.length-1,b;f>=0;f--)(b=p[f])&&(u=(c?b(l,r,u):b(u))||u);return c&&u&&BT(l,r,u),u};let zr=class extends W{constructor(){super(...arguments),this.open=!1,this.invisible=!1,this.container=!1}_handleClick(p){p.target===p.currentTarget&&this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}render(){return $`
      <div 
        class="${qe({backdrop:!0,open:this.open,invisible:this.invisible})}" 
        @click="${this._handleClick}"
        aria-hidden="${this.open?pe:"true"}"
      >
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `}};zr.styles=ee`
    :host {
      display: block;
      --ui-backdrop-color: rgba(0, 0, 0, 0.5);
      --ui-backdrop-z-index: 1200;
    }

    .backdrop {
      position: var(--ui-backdrop-position, fixed);
      display: flex;
      align-items: center;
      justify-content: center;
      inset: 0;
      background-color: var(--ui-backdrop-color);
      z-index: var(--ui-backdrop-z-index);
      -webkit-tap-highlight-color: transparent;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.3s;
    }

    :host([container]) {
      --ui-backdrop-position: absolute;
    }

    .backdrop.open {
      opacity: 1;
      visibility: visible;
    }

    .backdrop.invisible {
      background-color: transparent;
    }

    .content {
      z-index: calc(var(--ui-backdrop-z-index) + 1);
    }
  `;$p([E({type:Boolean,reflect:!0})],zr.prototype,"open",2);$p([E({type:Boolean})],zr.prototype,"invisible",2);$p([E({type:Boolean,reflect:!0})],zr.prototype,"container",2);zr=$p([te("ui-backdrop")],zr);var HT=Object.defineProperty,qT=Object.getOwnPropertyDescriptor,po=(p,l,r,c)=>{for(var u=c>1?void 0:c?qT(l,r):l,f=p.length-1,b;f>=0;f--)(b=p[f])&&(u=(c?b(l,r,u):b(u))||u);return c&&u&&HT(l,r,u),u};const sl=[];let jr=class extends W{constructor(){super(...arguments),this.open=!1,this.transition="scale",this.disableBackdropClose=!1,this._handleKeyDown=l=>{l.key==="Escape"&&this.open&&sl[sl.length-1]===this&&this.requestClose()}}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this._handleKeyDown)}updated(l){if(super.updated(l),l.has("open"))if(this.open)sl.includes(this)||sl.push(this);else{const r=sl.indexOf(this);r!==-1&&sl.splice(r,1)}}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this._handleKeyDown);const l=sl.indexOf(this);l!==-1&&sl.splice(l,1)}requestClose(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}_handleBackdropClose(l){l.stopPropagation(),this.disableBackdropClose||this.requestClose()}render(){const l=qe({"dialog-panel":!0,open:this.open,[`transition-${this.transition}`]:this.transition!=="scale"});return $`
      <ui-backdrop .open=${this.open} @close=${this._handleBackdropClose}>
        <div
          class=${l}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          @click=${r=>r.stopPropagation()}
        >
          <slot></slot>
        </div>
      </ui-backdrop>
    `}};jr.styles=ee`
    :host {
      display: block;
    }

    .dialog-panel {
      position: relative;
      background-color: var(--ui-surface-background, white);
      border-radius: var(--ui-border-radius-xl, 12px);
      box-shadow: var(--ui-shadow-xl, 0 20px 25px -5px rgba(0, 0, 0, 0.1));
      max-width: 90vw;
      max-height: var(--ui-dialog-max-height, 90vh); /* ← bounds the panel so content scrolls */
      width: var(--ui-dialog-width, 444px);
      display: flex;
      flex-direction: column;
      overflow: hidden; /* clip panel; inner ui-dialog-content scrolls independently */

      /* Base state: hidden (scale transition) */
      opacity: 0;
      transform: scale(0.9);
      transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1),
                  transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: none;
    }

    .dialog-panel.open {
      opacity: 1;
      transform: scale(1);
      pointer-events: auto;
    }

    /* Slide-up: start below, animate to centre */
    .dialog-panel.transition-slide-up {
      transform: translateY(40px);
    }
    .dialog-panel.transition-slide-up.open {
      transform: translateY(0);
    }

    /* Slide-down: start above, animate to centre */
    .dialog-panel.transition-slide-down {
      transform: translateY(-40px);
    }
    .dialog-panel.transition-slide-down.open {
      transform: translateY(0);
    }
  `;po([E({type:Boolean,reflect:!0})],jr.prototype,"open",2);po([E({type:String})],jr.prototype,"transition",2);po([E({type:Boolean,attribute:"disable-backdrop-close"})],jr.prototype,"disableBackdropClose",2);jr=po([te("ui-dialog")],jr);let Ig=class extends W{render(){return $`<h2 id="dialog-title" style="margin:0;font-size:inherit;font-weight:inherit;"><slot></slot></h2>`}};Ig.styles=ee`
    :host {
      display: block;
      padding: 20px 24px 12px;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--ui-text-color, #111827);
    }
  `;Ig=po([te("ui-dialog-title")],Ig);let Kg=class extends W{render(){return $`<slot></slot>`}};Kg.styles=ee`
    :host {
      display: block;
      padding: 0 24px 20px 24px;
      flex: 1 1 auto;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
  `;Kg=po([te("ui-dialog-content")],Kg);let Wg=class extends W{render(){return $`<slot></slot>`}};Wg.styles=ee`
    :host {
      display: block;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      font-size: 0.9375rem;
      line-height: 1.6;
      color: var(--ui-text-color-muted, #6b7280);
      margin-bottom: 8px;
    }
  `;Wg=po([te("ui-dialog-content-text")],Wg);let Ap=class extends W{constructor(){super(...arguments),this.align="end"}render(){return $`<slot></slot>`}};Ap.styles=ee`
    :host {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 8px 16px 16px;
      gap: 8px;
      border-top: 1px solid var(--ui-border-color, #f3f4f6);
    }

    :host([align="start"]) { justify-content: flex-start; }
    :host([align="center"]) { justify-content: center; }
    :host([align="space-between"]) { justify-content: space-between; }
  `;po([E({type:String,reflect:!0})],Ap.prototype,"align",2);Ap=po([te("ui-dialog-actions")],Ap);const E_=R.forwardRef(function({open:l,transition:r,disableBackdropClose:c,onClose:u,children:f,...b},v){const N=R.useRef(null),O=v??N;return R.useEffect(()=>{const z=O.current;z&&(l!==void 0&&(z.open=l),r!==void 0&&(z.transition=r),c!==void 0&&(z.disableBackdropClose=c))},[l,r,c]),R.useEffect(()=>{const z=O.current;if(!z||!u)return;const A=u;return z.addEventListener(LE.CLOSE,A),()=>z.removeEventListener(LE.CLOSE,A)},[u]),h.jsxDEV("ui-dialog",{ref:O,...b,children:f},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiDialog.tsx",lineNumber:42,columnNumber:13},this)});E_.displayName="UiDialog";const __=R.forwardRef(function({children:l,...r},c){const u=R.useRef(null),f=c??u;return h.jsxDEV("ui-dialog-title",{ref:f,...r,children:l},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiDialogTitle.tsx",lineNumber:20,columnNumber:13},this)});__.displayName="UiDialogTitle";const w_=R.forwardRef(function({children:l,...r},c){const u=R.useRef(null),f=c??u;return h.jsxDEV("ui-dialog-content",{ref:f,...r,children:l},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiDialogContent.tsx",lineNumber:20,columnNumber:13},this)});w_.displayName="UiDialogContent";const A_=R.forwardRef(function({children:l,...r},c){const u=R.useRef(null),f=c??u;return h.jsxDEV("ui-dialog-content-text",{ref:f,...r,children:l},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiDialogContentText.tsx",lineNumber:20,columnNumber:13},this)});A_.displayName="UiDialogContentText";const D_=R.forwardRef(function({align:l,children:r,...c},u){const f=R.useRef(null),b=u??f;return R.useEffect(()=>{const v=b.current;v&&l!==void 0&&(v.align=l)},[l]),h.jsxDEV("ui-dialog-actions",{ref:b,...c,children:r},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiDialogActions.tsx",lineNumber:28,columnNumber:13},this)});D_.displayName="UiDialogActions";const cp={OPEN:"ui-snackbar-open",CLOSE:"ui-snackbar-close"};var YT=Object.defineProperty,GT=Object.getOwnPropertyDescriptor,ho=(p,l,r,c)=>{for(var u=c>1?void 0:c?GT(l,r):l,f=p.length-1,b;f>=0;f--)(b=p[f])&&(u=(c?b(l,r,u):b(u))||u);return c&&u&&YT(l,r,u),u};let $n=class extends W{constructor(){super(...arguments),this.open=!1,this.message="",this.autoHideDuration=5e3,this.anchorOrigin="bottom-center",this.pauseOnHover=!0,this.closable=!1,this.variant="default",this._hasAction=!1,this._timer=null,this._remainingTime=0,this._timerStartedAt=0}updated(l){l.has("open")&&(this.open?(this._remainingTime=this.autoHideDuration,this._startTimer(this._remainingTime),this.dispatchEvent(new CustomEvent("ui-snackbar-open",{bubbles:!0,composed:!0}))):(this._clearTimer(),this.dispatchEvent(new CustomEvent("ui-snackbar-close",{bubbles:!0,composed:!0}))))}disconnectedCallback(){super.disconnectedCallback(),this._clearTimer()}_startTimer(l){this._clearTimer(),l>0&&(this._timerStartedAt=Date.now(),this._timer=setTimeout(()=>this.close(),l))}_clearTimer(){this._timer&&(clearTimeout(this._timer),this._timer=null)}_handleMouseEnter(){if(!this.pauseOnHover||!this.open||this._timer===null)return;const l=Date.now()-this._timerStartedAt;this._remainingTime=Math.max(0,this._remainingTime-l),this._clearTimer()}_handleMouseLeave(){!this.pauseOnHover||!this.open||this._startTimer(this._remainingTime)}_handleActionSlotChange(l){const r=l.target;this._hasAction=r.assignedNodes({flatten:!0}).length>0}close(){this.open=!1}render(){const l={snackbar:!0,open:this.open},r={action:!0,hidden:!this._hasAction};return $`
            <div
                class=${qe(l)}
                part="snackbar"
                role="status"
                aria-live="polite"
                aria-atomic="true"
                @mouseenter=${this._handleMouseEnter}
                @mouseleave=${this._handleMouseLeave}
            >
                <div class="message">
                    <slot>${this.message}</slot>
                </div>
                <div class=${qe(r)}>
                    <slot name="action" @slotchange=${this._handleActionSlotChange}></slot>
                </div>
                ${this.closable?$`
                    <button class="close-btn" aria-label="Close" @click=${()=>this.close()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                `:""}
            </div>
        `}};$n.styles=ee`
        :host {
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: none;
            position: fixed;
            z-index: var(--ui-snackbar-z-index, 1400);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Positions */
        :host([anchor-origin*="bottom"]) { bottom: var(--ui-snackbar-offset, 24px); }
        :host([anchor-origin*="top"])    { top: var(--ui-snackbar-offset, 24px); }
        :host([anchor-origin*="left"])   { left: var(--ui-snackbar-offset, 24px); }
        :host([anchor-origin*="right"])  { right: var(--ui-snackbar-offset, 24px); }
        :host([anchor-origin*="center"]) {
            left: 50%;
            transform: translateX(-50%);
        }

        .snackbar {
            background-color: var(--ui-snackbar-bg, #313131);
            color: var(--ui-snackbar-color, #fff);
            font-family: var(--ui-font-family, 'Inter', sans-serif);
            font-size: 0.875rem;
            line-height: 1.43;
            letter-spacing: 0.01071em;
            display: flex;
            align-items: center;
            padding: 6px 16px;
            border-radius: var(--ui-border-radius-md, 4px);
            box-shadow: var(--ui-shadow-lg, 0 3px 5px -1px rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12));
            min-width: var(--ui-snackbar-min-width, 288px);
            max-width: var(--ui-snackbar-max-width, 560px);
            pointer-events: auto;
            opacity: 0;
            transform: scale(0.85);
            transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1), transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
            visibility: hidden;
        }

        .snackbar.open {
            opacity: 1;
            transform: scale(1);
            visibility: visible;
        }

        /* Variants */
        :host([variant="info"])    .snackbar { background-color: var(--ui-snackbar-bg-info, #0288d1); }
        :host([variant="success"]) .snackbar { background-color: var(--ui-snackbar-bg-success, #2e7d32); }
        :host([variant="warning"]) .snackbar { background-color: var(--ui-snackbar-bg-warning, #ed6c02); }
        :host([variant="error"])   .snackbar { background-color: var(--ui-snackbar-bg-error, #d32f2f); }

        .message {
            padding: 8px 0;
            flex-grow: 1;
        }

        .action {
            display: flex;
            align-items: center;
            margin-left: 8px;
            margin-right: -8px;
            padding-left: 16px;
        }

        .action.hidden {
            display: none;
        }

        .close-btn {
            background: none;
            border: none;
            color: inherit;
            cursor: pointer;
            padding: 4px 8px;
            margin-left: 8px;
            margin-right: -8px;
            opacity: 0.8;
            display: flex;
            align-items: center;
            border-radius: 2px;
            line-height: 0;
        }

        .close-btn:hover { opacity: 1; }

        ::slotted(ui-alert) {
            margin-bottom: 0 !important;
            width: 100%;
            min-width: 288px;
        }
    `;ho([E({type:Boolean,reflect:!0})],$n.prototype,"open",2);ho([E({type:String})],$n.prototype,"message",2);ho([E({type:Number,attribute:"auto-hide-duration"})],$n.prototype,"autoHideDuration",2);ho([E({type:String,attribute:"anchor-origin",reflect:!0})],$n.prototype,"anchorOrigin",2);ho([E({type:Boolean,attribute:"pause-on-hover"})],$n.prototype,"pauseOnHover",2);ho([E({type:Boolean,reflect:!0})],$n.prototype,"closable",2);ho([E({type:String,reflect:!0})],$n.prototype,"variant",2);ho([si()],$n.prototype,"_hasAction",2);$n=ho([te("ui-snackbar")],$n);const U_=R.forwardRef(function({open:l,message:r,autoHideDuration:c,anchorOrigin:u,pauseOnHover:f,closable:b,variant:v,onUiSnackbarOpen:N,onUiSnackbarClose:O,children:z,...A},x){const C=R.useRef(null),B=x??C;return R.useEffect(()=>{const G=B.current;G&&(l!==void 0&&(G.open=l),r!==void 0&&(G.message=r),c!==void 0&&(G.autoHideDuration=c),u!==void 0&&(G.anchorOrigin=u),f!==void 0&&(G.pauseOnHover=f),b!==void 0&&(G.closable=b),v!==void 0&&(G.variant=v))},[l,r,c,u,f,b,v]),R.useEffect(()=>{const G=B.current;if(!G||!N)return;const J=N;return G.addEventListener(cp.OPEN,J),()=>G.removeEventListener(cp.OPEN,J)},[N]),R.useEffect(()=>{const G=B.current;if(!G||!O)return;const J=O;return G.addEventListener(cp.CLOSE,J),()=>G.removeEventListener(cp.CLOSE,J)},[O]),h.jsxDEV("ui-snackbar",{ref:B,...A,children:z},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiSnackbar.tsx",lineNumber:60,columnNumber:13},this)});U_.displayName="UiSnackbar";var XT=Object.defineProperty,QT=Object.getOwnPropertyDescriptor,qr=(p,l,r,c)=>{for(var u=c>1?void 0:c?QT(l,r):l,f=p.length-1,b;f>=0;f--)(b=p[f])&&(u=(c?b(l,r,u):b(u))||u);return c&&u&&XT(l,r,u),u};let cl=class extends W{constructor(){super(...arguments),this.label="",this.placement="top",this.arrow=!1,this.disabled=!1,this._visible=!1}_show(){this.disabled||!this.label||(this._visible=!0)}_hide(){this._visible=!1}render(){return $`
      <div 
        class="tooltip-container"
        @mouseenter=${this._show}
        @mouseleave=${this._hide}
        @focusin=${this._show}
        @focusout=${this._hide}
      >
        <slot></slot>
        <div class=${qe({"tooltip-popup":!0,[this.placement]:!0,visible:this._visible})}>
          ${this.label}
          ${this.arrow?$`<div class="arrow"></div>`:""}
        </div>
      </div>
    `}};cl.styles=ee`
    :host {
      display: inline-block;
      position: relative;
    }

    .tooltip-container {
      display: inline-block;
    }

    .tooltip-popup {
      position: absolute;
      background-color: var(--ui-tooltip-bg, rgba(97, 97, 97, 0.92));
      color: var(--ui-tooltip-color, #fff);
      padding: 4px 8px;
      border-radius: var(--ui-border-radius-sm, 4px);
      font-size: 0.75rem;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      line-height: 1.4;
      white-space: nowrap;
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s, visibility 0.2s, transform 0.2s;
      pointer-events: none;
      box-shadow: var(--ui-shadow-sm, 0 2px 4px rgba(0,0,0,0.2));
    }

    /* Placements */
    .tooltip-popup.top {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%) translateY(0);
      margin-bottom: 8px;
    }
    .tooltip-popup.top.visible {
      transform: translateX(-50%) translateY(-4px);
    }

    .tooltip-popup.bottom {
      top: 100%;
      left: 50%;
      transform: translateX(-50%) translateY(0);
      margin-top: 8px;
    }
    .tooltip-popup.bottom.visible {
      transform: translateX(-50%) translateY(4px);
    }

    .tooltip-popup.left {
      right: 100%;
      top: 50%;
      transform: translateY(-50%) translateX(0);
      margin-right: 8px;
    }
    .tooltip-popup.left.visible {
      transform: translateY(-50%) translateX(-4px);
    }

    .tooltip-popup.right {
      left: 100%;
      top: 50%;
      transform: translateY(-50%) translateX(0);
      margin-left: 8px;
    }
    .tooltip-popup.right.visible {
      transform: translateY(-50%) translateX(4px);
    }

    .tooltip-popup.visible {
      opacity: 1;
      visibility: visible;
    }

    /* Arrow */
    .arrow {
      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
    }

    .tooltip-popup.top .arrow {
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-width: 5px 5px 0 5px;
      border-color: var(--ui-tooltip-bg, rgba(97, 97, 97, 0.92)) transparent transparent transparent;
    }

    .tooltip-popup.bottom .arrow {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-width: 0 5px 5px 5px;
      border-color: transparent transparent var(--ui-tooltip-bg, rgba(97, 97, 97, 0.92)) transparent;
    }

    .tooltip-popup.left .arrow {
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      border-width: 5px 0 5px 5px;
      border-color: transparent transparent transparent var(--ui-tooltip-bg, rgba(97, 97, 97, 0.92));
    }

    .tooltip-popup.right .arrow {
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      border-width: 5px 5px 5px 0;
      border-color: transparent var(--ui-tooltip-bg, rgba(97, 97, 97, 0.92)) transparent transparent;
    }
  `;qr([E({type:String})],cl.prototype,"label",2);qr([E({type:String})],cl.prototype,"placement",2);qr([E({type:Boolean})],cl.prototype,"arrow",2);qr([E({type:Boolean,reflect:!0})],cl.prototype,"disabled",2);qr([si()],cl.prototype,"_visible",2);cl=qr([te("ui-tooltip")],cl);const Ac=R.forwardRef(function({label:l,placement:r,arrow:c,disabled:u,children:f,...b},v){const N=R.useRef(null),O=v??N;return R.useEffect(()=>{const z=O.current;z&&(l!==void 0&&(z.label=l),r!==void 0&&(z.placement=r),c!==void 0&&(z.arrow=c),u!==void 0&&(z.disabled=u))},[l,r,c,u]),h.jsxDEV("ui-tooltip",{ref:O,...b,children:f},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiTooltip.tsx",lineNumber:34,columnNumber:13},this)});Ac.displayName="UiTooltip";const HE={STEP_CHANGE:"ui-step-change"};var ZT=Object.defineProperty,PT=Object.getOwnPropertyDescriptor,Ye=(p,l,r,c)=>{for(var u=c>1?void 0:c?PT(l,r):l,f=p.length-1,b;f>=0;f--)(b=p[f])&&(u=(c?b(l,r,u):b(u))||u);return c&&u&&ZT(l,r,u),u};const JT=$`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`,IT=$`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`;let $c=class extends W{constructor(){super(...arguments),this.orientation="horizontal",this.completed=!1}render(){return $`<div class="line ${qe({completed:this.completed})}"></div>`}};$c.styles=ee`
        :host { display: block; }
        .line {
            background: var(--ui-stepper-connector-color, #e5e7eb);
            border-radius: 2px;
            transition: background 0.3s;
        }
        .line.completed { background: var(--ui-primary-color, #3b82f6); }
        :host([orientation="horizontal"]) .line { height: 2px; width: 100%; }
        :host([orientation="vertical"])   .line { width: 2px; min-height: 24px; margin: 0 auto; }
    `;Ye([E({reflect:!0})],$c.prototype,"orientation",2);Ye([E({type:Boolean})],$c.prototype,"completed",2);$c=Ye([te("ui-step-connector")],$c);let Vr=class extends W{constructor(){super(...arguments),this.active=!1,this.disabled=!1,this.error=!1}render(){return $`
        <div class="label"><slot></slot></div>
        <div class="optional"><slot name="optional"></slot></div>
    `}};Vr.styles=ee`
        :host { display: block; }
        .label { font-size: .875rem; font-weight: 500; color: var(--ui-text-color, #111827); font-family: var(--ui-font-family,'Inter',sans-serif); line-height: 1.4; }
        .optional { font-size: .75rem; color: #9ca3af; font-style: italic; }
        :host([active])   .label { color: var(--ui-primary-color, #3b82f6); font-weight: 600; }
        :host([disabled]) .label { color: #9ca3af; }
        :host([error])    .label { color: var(--ui-error-color, #ef4444); }
    `;Ye([E({type:Boolean,reflect:!0})],Vr.prototype,"active",2);Ye([E({type:Boolean,reflect:!0})],Vr.prototype,"disabled",2);Ye([E({type:Boolean,reflect:!0})],Vr.prototype,"error",2);Vr=Ye([te("ui-step-label")],Vr);let Dp=class extends W{constructor(){super(...arguments),this.open=!0}render(){return $`
            <div
                class="panel ${qe({open:this.open})}"
                aria-hidden=${this.open?"false":"true"}
            >
                <div class="inner">
                    <div class="content"><slot></slot></div>
                </div>
            </div>`}};Dp.styles=ee`
        :host { display: block; overflow: hidden; }
        .panel {
            display: grid;
            grid-template-rows: 0fr;
            transition: grid-template-rows 0.25s ease;
        }
        .panel.open { grid-template-rows: 1fr; }
        .inner {
            overflow: hidden;
            padding: 0 16px;
            /* padding animates together with the grid expand */
            transition: padding 0.25s ease;
        }
        .panel.open .inner { padding: 8px 16px 16px; }
        .content {
            font-size: .875rem;
            color: var(--ui-text-color, #374151);
            font-family: var(--ui-font-family,'Inter',sans-serif);
        }
    `;Ye([E({type:Boolean,reflect:!0})],Dp.prototype,"open",2);Dp=Ye([te("ui-step-content")],Dp);let xi=class extends W{constructor(){super(...arguments),this.active=!1,this.completed=!1,this.disabled=!1,this.optional=!1,this.error=!1,this.last=!1,this.clickable=!1,this.orientation="horizontal",this.alternativeLabel=!1,this.stepIndex=0,this.optionalLabel="Optional",this.prevCompleted=!1}connectedCallback(){super.connectedCallback(),this.hasAttribute("role")||this.setAttribute("role","listitem")}_fire(){this.disabled||this.dispatchEvent(new CustomEvent("ui-step-click",{detail:{index:this.stepIndex},bubbles:!0,composed:!0}))}_icon(){const l={"icon-circle":!0,active:this.active,completed:this.completed,error:this.error},r=this.error?IT:this.completed?JT:$`<slot name="icon">${this.stepIndex+1}</slot>`;return $`<div class=${qe(l)}>${r}</div>`}_label(){return $`
            <ui-step-label ?active=${this.active} ?disabled=${this.disabled} ?error=${this.error}>
                <slot name="label"></slot>
                ${this.optional?$`<span slot="optional">${this.optionalLabel}</span>`:pe}
            </ui-step-label>`}_connector(l=!1){return $`<ui-step-connector orientation=${this.orientation} ?completed=${l}></ui-step-connector>`}render(){const l=this.stepIndex>0;if(this.orientation==="vertical"){const c=this.clickable?$`<button class="step-btn" ?disabled=${this.disabled} @click=${this._fire} aria-current=${this.active?"step":pe}>${this._icon()} ${this._label()}</button>`:$`<div class="step-header">${this._icon()} ${this._label()}</div>`;return $`
                ${c}
                <div class="v-body">
                    <div class="v-line ${qe({completed:this.completed})}"></div>
                    <div class="v-content"><slot></slot></div>
                </div>`}if(this.alternativeLabel){const c=this.clickable?$`<button class="step-btn" ?disabled=${this.disabled} @click=${this._fire} aria-current=${this.active?"step":pe}>${this._icon()}</button>`:this._icon();return $`
                <div class="alt-top">
                    <div class="conn-fill">${l?this._connector(this.prevCompleted):pe}</div>
                    ${c}
                    <div class="conn-fill"></div>
                </div>
                <div class="alt-label-row">${this._label()}</div>`}const r=this.clickable?$`<button class="step-btn" ?disabled=${this.disabled} @click=${this._fire} aria-current=${this.active?"step":pe}>${this._icon()} ${this._label()}</button>`:$`<div class="step-header">${this._icon()} ${this._label()}</div>`;return $`
            ${l?$`<div class="conn-wrap">${this._connector(this.prevCompleted)}</div>`:pe}
            ${r}`}};xi.styles=ee`
        :host {
            display: flex;
            /*
             * flex: 1 1 0  ← key for equal columns:
             * '0' flex-basis means the available space is divided equally,
             * ignoring each step's content size.  Combined with min-width:0
             * this prevents longer labels from widening their column.
             */
            flex: 1 1 0;
            min-width: 0;
            font-family: var(--ui-font-family,'Inter',sans-serif);
        }

        /* ── Horizontal ── */
        :host([orientation="horizontal"]) { align-items: flex-start; padding-top: 4px; }

        /* ── Vertical ── */
        :host([orientation="vertical"]) {
            flex-direction: column;
            flex: none;
            width: 100%;
        }

        /* ── Alternative label (horizontal) ── */
        :host([alternative-label]) {
            flex-direction: column;
            align-items: center;
            flex: 1;
            min-width: 0;
        }

        /* connector wrapper — fills the gap between steps */
        .conn-wrap {
            flex: 1 1 auto;
            min-width: 12px;
            display: flex;
            /*
             * flex-start so the connector stays anchored to the top
             * regardless of how tall a multi-line label makes the row.
             * padding-top places the 2px line exactly at the icon's center:
             *   host padding-top (4px) + half icon (16px) - 1px (half line) = 15px
             */
            align-items: flex-start;
            padding-top: 15px;
        }
        .conn-wrap ui-step-connector { flex: 1; }

        /*
         * alt-label top row: always render two symmetric fills so every
         * icon is centred in its column regardless of position.
         * First step's leading fill is empty; last step's trailing fill
         * is empty — both are rendered to keep equal column widths.
         */
        .alt-top { display: flex; align-items: center; width: 100%; }
        .alt-top .conn-fill { flex: 1; display: flex; align-items: center; }
        .alt-top .conn-fill ui-step-connector { flex: 1; }

        /* ── Step header: icon + label ── */
        .step-header {
            display: flex;
            align-items: flex-start;   /* icon aligns to first line of label */
            gap: 14px;
            min-width: 0;              /* allow label to wrap instead of overflow */
        }
        /* Optically nudge label down so its baseline sits at the icon's centre */
        .step-header ui-step-label,
        .step-btn    ui-step-label {
            padding-top: 5px;          /* (32px icon − ~22px text) / 2 ≈ 5px */
            min-width: 0;
        }

        :host([alternative-label]) .alt-label-row {
            margin-top: 8px;
            text-align: center;
            min-width: 0;
            width: 100%;
        }

        /* clickable button mode */
        .step-btn {
            background: none; border: none; padding: 0; cursor: pointer;
            font-family: inherit; border-radius: 6px; outline: none;
            display: flex; align-items: flex-start; gap: 14px;
            min-width: 0;
            text-align: left;
        }
        .step-btn:focus-visible { outline: 2px solid var(--ui-primary-color, #3b82f6); outline-offset: 3px; }
        :host([disabled]) .step-btn { cursor: default; }
        :host([alternative-label]) .step-btn { flex-direction: column; align-items: center; gap: 0; }

        /* ── Vertical body ── */
        .v-body {
            display: flex;
            margin-left: 15px;
            min-height: 16px;
        }
        .v-line {
            width: 2px;
            background: var(--ui-stepper-connector-color, #e5e7eb);
            border-radius: 2px;
            flex-shrink: 0;
            transition: background 0.3s;
            margin-right: 14px;
        }
        .v-line.completed { background: var(--ui-primary-color, #3b82f6); }
        :host([last]) .v-line { background: transparent; }
        .v-content { flex: 1; padding-bottom: 8px; min-width: 0; }

        /* ── Step icon circle ── */
        .icon-circle {
            width: var(--ui-stepper-icon-size, 32px);
            height: var(--ui-stepper-icon-size, 32px);
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            font-size: .8125rem; font-weight: 700;
            border: 2px solid #d1d5db;
            color: #9ca3af;
            background: transparent;
            transition: all .2s;
            /* Never shrink — it's a fixed-size indicator */
            flex-shrink: 0;
            box-sizing: border-box;
        }
        .icon-circle.active   { background: var(--ui-primary-color,#3b82f6); border-color: var(--ui-primary-color,#3b82f6); color:#fff; box-shadow:0 0 0 4px rgba(59,130,246,.15); }
        .icon-circle.completed{ background: var(--ui-primary-color,#3b82f6); border-color: var(--ui-primary-color,#3b82f6); color:#fff; }
        .icon-circle.error    { border-color: var(--ui-error-color,#ef4444); color: var(--ui-error-color,#ef4444); }
        :host([disabled]) .icon-circle { opacity: .4; }
    `;Ye([E({type:Boolean,reflect:!0})],xi.prototype,"active",2);Ye([E({type:Boolean,reflect:!0})],xi.prototype,"completed",2);Ye([E({type:Boolean,reflect:!0})],xi.prototype,"disabled",2);Ye([E({type:Boolean,reflect:!0})],xi.prototype,"optional",2);Ye([E({type:Boolean,reflect:!0})],xi.prototype,"error",2);Ye([E({type:Boolean,reflect:!0})],xi.prototype,"last",2);Ye([E({type:Boolean,reflect:!0})],xi.prototype,"clickable",2);Ye([E({type:String,reflect:!0})],xi.prototype,"orientation",2);Ye([E({type:Boolean,reflect:!0,attribute:"alternative-label"})],xi.prototype,"alternativeLabel",2);Ye([E({type:Number,attribute:"step-index"})],xi.prototype,"stepIndex",2);Ye([E({type:String,attribute:"optional-label"})],xi.prototype,"optionalLabel",2);Ye([E({type:Boolean,attribute:"prev-completed"})],xi.prototype,"prevCompleted",2);xi=Ye([te("ui-step")],xi);let dl=class extends W{constructor(){super(...arguments),this.activeStep=0,this.orientation="horizontal",this.alternativeLabel=!1,this.nonLinear=!1,this.label="steps",this._onStepClick=l=>{this.activeStep=l.detail.index,this.dispatchEvent(new CustomEvent("ui-step-change",{detail:{step:l.detail.index},bubbles:!0,composed:!0})),this._syncSteps()}}_syncSteps(){const l=Array.from(this.querySelectorAll(":scope > ui-step"));l.forEach((r,c)=>{r.stepIndex=c,r.last=c===l.length-1,r.orientation=this.orientation,r.alternativeLabel=this.alternativeLabel,r.active=c===this.activeStep,r.prevCompleted=c>0&&l[c-1].completed,this.nonLinear?(r.disabled=!1,r.clickable=!0):(r.completed||(r.disabled=c>this.activeStep),r.clickable=!1)})}firstUpdated(){this._syncSteps()}updated(l){(l.has("activeStep")||l.has("orientation")||l.has("alternativeLabel")||l.has("nonLinear"))&&this._syncSteps()}connectedCallback(){super.connectedCallback(),this.addEventListener("ui-step-click",this._onStepClick)}disconnectedCallback(){this.removeEventListener("ui-step-click",this._onStepClick),super.disconnectedCallback()}render(){const l=`stepper ${this.orientation}${this.alternativeLabel?" alt":""}`;return $`
            <div class=${l} role="list" aria-label=${this.label}>
                <slot @slotchange=${()=>{this._syncSteps(),this.requestUpdate()}}></slot>
            </div>`}};dl.styles=ee`
        :host { display: block; font-family: var(--ui-font-family,'Inter',sans-serif); }
        .stepper {
            display: flex;
            padding: 16px 24px;
            background: var(--ui-surface-background, #fff);
        }
        /* Horizontal: align-items:stretch lets each step be as tall as the tallest */
        .stepper.horizontal { align-items: stretch; flex-direction: row; }
        .stepper.vertical   { flex-direction: column; gap: 0; }
        /* alt-label: icons sit at the same height across all steps */
        .stepper.alt { align-items: flex-start; }

        /* Expose primary color to steps */
        ::slotted(ui-step) { /* overridden in child */ }
    `;Ye([E({type:Number,attribute:"active-step"})],dl.prototype,"activeStep",2);Ye([E({type:String,reflect:!0})],dl.prototype,"orientation",2);Ye([E({type:Boolean,attribute:"alternative-label"})],dl.prototype,"alternativeLabel",2);Ye([E({type:Boolean,attribute:"non-linear"})],dl.prototype,"nonLinear",2);Ye([E({type:String})],dl.prototype,"label",2);dl=Ye([te("ui-stepper")],dl);let co=class extends W{constructor(){super(...arguments),this.steps=0,this.activeStep=0,this.variant="dots",this.position="static",this.backLabel="Back",this.nextLabel="Next"}get _safeSteps(){return Math.max(1,this.steps)}_emit(p){this.dispatchEvent(new CustomEvent(p,{bubbles:!0,composed:!0}))}_progress(){const p=this.activeStep+1,l=this._safeSteps;if(this.variant==="text")return $`<span class="text" aria-live="polite">Step ${p} of ${l}</span>`;if(this.variant==="dots")return $`
                <div class="dots" aria-label="Step ${p} of ${l}">
                    <span class="sr-only" aria-live="polite">Step ${p} of ${l}</span>
                    ${Array.from({length:l},(c,u)=>$`<div class="dot ${u===this.activeStep?"active":""}"></div>`)}
                </div>`;const r=l>1?this.activeStep/(l-1)*100:100;return $`
            <div
                class="bar-track"
                role="progressbar"
                aria-valuenow=${p}
                aria-valuemin="1"
                aria-valuemax=${l}
                aria-label="Step ${p} of ${l}"
            >
                <div class="bar-fill" style="width:${r}%"></div>
            </div>`}render(){return $`
            <slot name="back-button">
                <button
                    class="nav-btn back"
                    ?disabled=${this.activeStep===0}
                    aria-label="Go to previous step"
                    @click=${()=>this._emit("ui-mobile-step-back")}
                >${this.backLabel}</button>
            </slot>
            <div class="progress">${this._progress()}</div>
            <slot name="next-button">
                <button
                    class="nav-btn next"
                    ?disabled=${this.activeStep>=this._safeSteps-1}
                    aria-label="Go to next step"
                    @click=${()=>this._emit("ui-mobile-step-next")}
                >${this.nextLabel}</button>
            </slot>`}};co.styles=ee`
        :host {
            display: flex; align-items: center; justify-content: space-between;
            padding: 8px 12px; gap: 8px;
            background: var(--ui-surface-background,#fff);
            font-family: var(--ui-font-family,'Inter',sans-serif);
        }
        :host([position="static"]) { border:1px solid var(--ui-border-color,#e5e7eb); border-radius:8px; }
        :host([position="bottom"]) { border-top:1px solid var(--ui-border-color,#e5e7eb); }
        :host([position="top"])    { border-bottom:1px solid var(--ui-border-color,#e5e7eb); }

        .progress { display:flex; align-items:center; justify-content:center; flex:1; gap:0; }

        /* text */
        .text { font-size:.8rem; color:#6b7280; }

        /* dots */
        .dots { display:flex; gap:6px; }
        .dot  { width:10px; height:10px; border-radius:50%; background:#d1d5db; transition:background .2s; }
        .dot.active { background:var(--ui-primary-color,#3b82f6); }

        /* progress bar */
        .bar-track { flex:1; height:4px; background:#e5e7eb; border-radius:2px; overflow:hidden; }
        .bar-fill   { height:100%; background:var(--ui-primary-color,#3b82f6); border-radius:2px; transition:width .3s; }

        /* screen-reader-only utility */
        .sr-only {
            position: absolute; width: 1px; height: 1px;
            padding: 0; margin: -1px; overflow: hidden;
            clip: rect(0,0,0,0); white-space: nowrap; border: 0;
        }

        /* default nav buttons */
        .nav-btn {
            padding:6px 14px; border-radius:6px; font-size:.8rem; font-family:inherit; cursor:pointer;
            transition: opacity .15s;
        }
        .nav-btn:disabled { opacity:.38; cursor:default; }
        .nav-btn.back { background:#fff; color:#374151; border:1px solid #e2e8f0; }
        .nav-btn.next { background:var(--ui-primary-color,#3b82f6); color:#fff; border:none; }
    `;Ye([E({type:Number})],co.prototype,"steps",2);Ye([E({type:Number,attribute:"active-step"})],co.prototype,"activeStep",2);Ye([E({type:String})],co.prototype,"variant",2);Ye([E({type:String,reflect:!0})],co.prototype,"position",2);Ye([E({type:String,attribute:"back-label"})],co.prototype,"backLabel",2);Ye([E({type:String,attribute:"next-label"})],co.prototype,"nextLabel",2);co=Ye([te("ui-mobile-stepper")],co);const T_=R.forwardRef(function({activeStep:l,orientation:r,alternativeLabel:c,nonLinear:u,label:f,onUiStepChange:b,children:v,...N},O){const z=R.useRef(null),A=O??z;return R.useEffect(()=>{const x=A.current;x&&(l!==void 0&&(x.activeStep=l),r!==void 0&&(x.orientation=r),c!==void 0&&(x.alternativeLabel=c),u!==void 0&&(x.nonLinear=u),f!==void 0&&(x.label=f))},[l,r,c,u,f]),R.useEffect(()=>{const x=A.current;if(!x||!b)return;const C=b;return x.addEventListener(HE.STEP_CHANGE,C),()=>x.removeEventListener(HE.STEP_CHANGE,C)},[b]),h.jsxDEV("ui-stepper",{ref:A,...N,children:v},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiStepper.tsx",lineNumber:46,columnNumber:13},this)});T_.displayName="UiStepper";const qE={CLICK:"ui-step-click"},R_=R.forwardRef(function({active:l,completed:r,disabled:c,optional:u,error:f,last:b,clickable:v,orientation:N,alternativeLabel:O,stepIndex:z,optionalLabel:A,prevCompleted:x,onUiStepClick:C,children:B,...G},J){const I=R.useRef(null),$e=J??I;return R.useEffect(()=>{const ce=$e.current;ce&&(l!==void 0&&(ce.active=l),r!==void 0&&(ce.completed=r),c!==void 0&&(ce.disabled=c),u!==void 0&&(ce.optional=u),f!==void 0&&(ce.error=f),b!==void 0&&(ce.last=b),v!==void 0&&(ce.clickable=v),N!==void 0&&(ce.orientation=N),O!==void 0&&(ce.alternativeLabel=O),z!==void 0&&(ce.stepIndex=z),A!==void 0&&(ce.optionalLabel=A),x!==void 0&&(ce.prevCompleted=x))},[l,r,c,u,f,b,v,N,O,z,A,x]),R.useEffect(()=>{const ce=$e.current;if(!ce||!C)return;const Te=C;return ce.addEventListener(qE.CLICK,Te),()=>ce.removeEventListener(qE.CLICK,Te)},[C]),h.jsxDEV("ui-step",{ref:$e,...G,children:B},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiStep.tsx",lineNumber:60,columnNumber:13},this)});R_.displayName="UiStep";const C_=R.forwardRef(function({active:l,disabled:r,error:c,children:u,...f},b){const v=R.useRef(null),N=b??v;return R.useEffect(()=>{const O=N.current;O&&(l!==void 0&&(O.active=l),r!==void 0&&(O.disabled=r),c!==void 0&&(O.error=c))},[l,r,c]),h.jsxDEV("ui-step-label",{ref:N,...f,children:u},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiStepLabel.tsx",lineNumber:32,columnNumber:13},this)});C_.displayName="UiStepLabel";const k_=R.forwardRef(function({open:l,children:r,...c},u){const f=R.useRef(null),b=u??f;return R.useEffect(()=>{const v=b.current;v&&l!==void 0&&(v.open=l)},[l]),h.jsxDEV("ui-step-content",{ref:b,...c,children:r},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiStepContent.tsx",lineNumber:28,columnNumber:13},this)});k_.displayName="UiStepContent";const YE={CHANGE:"ui-collapsible-change"};var KT=Object.defineProperty,WT=Object.getOwnPropertyDescriptor,mo=(p,l,r,c)=>{for(var u=c>1?void 0:c?WT(l,r):l,f=p.length-1,b;f>=0;f--)(b=p[f])&&(u=(c?b(l,r,u):b(u))||u);return c&&u&&KT(l,r,u),u};let Mc=class extends W{constructor(){super(...arguments),this.expanded=!1,this.disabled=!1}_handleClick(){if(this.disabled)return;this.closest("ui-collapsible")?.toggle()}render(){return $`
            <button
                class="trigger"
                aria-expanded=${this.expanded}
                ?disabled=${this.disabled}
                @click=${this._handleClick}
            >
                <slot></slot>
            </button>
        `}};Mc.styles=ee`
        :host { display: block; }

        .trigger {
            display: flex;
            align-items: center;
            width: 100%;
            background: none;
            border: none;
            padding: 0;
            margin: 0;
            cursor: pointer;
            font: inherit;
            color: inherit;
            text-align: left;
        }

        :host([disabled]) .trigger {
            cursor: not-allowed;
            opacity: 0.5;
        }
    `;mo([E({type:Boolean,reflect:!0})],Mc.prototype,"expanded",2);mo([E({type:Boolean,reflect:!0})],Mc.prototype,"disabled",2);Mc=mo([te("ui-collapsible-trigger")],Mc);let Up=class extends W{constructor(){super(...arguments),this.open=!1}render(){return $`
            <div class="panel" aria-hidden=${!this.open}>
                <div class="panel-inner">
                    <slot></slot>
                </div>
            </div>
        `}};Up.styles=ee`
        :host { display: block; }

        .panel {
            display: grid;
            grid-template-rows: 0fr;
            overflow: hidden;
            transition:
                grid-template-rows var(--ui-collapsible-duration, 200ms) var(--ui-collapsible-easing, ease);
        }

        :host([open]) .panel {
            grid-template-rows: 1fr;
        }

        .panel-inner {
            overflow: hidden;
        }
    `;mo([E({type:Boolean,reflect:!0})],Up.prototype,"open",2);Up=mo([te("ui-collapsible-content")],Up);let $r=class extends W{constructor(){super(...arguments),this.open=!1,this.defaultOpen=!1,this.disabled=!1,this._firstUpdate=!0}willUpdate(l){this._firstUpdate&&(this._firstUpdate=!1,this.defaultOpen&&!this.open&&(this.open=!0))}updated(l){(l.has("open")||l.has("disabled"))&&this._syncChildren()}toggle(){this.disabled||(this.open=!this.open,this.dispatchEvent(new CustomEvent("ui-collapsible-change",{detail:{open:this.open},bubbles:!0,composed:!0})))}_syncChildren(){this.querySelectorAll("ui-collapsible-content").forEach(l=>{l.closest("ui-collapsible")===this&&(l.open=this.open)}),this.querySelectorAll("ui-collapsible-trigger").forEach(l=>{l.closest("ui-collapsible")===this&&(l.expanded=this.open,l.disabled=this.disabled)})}render(){return $`<slot @slotchange=${()=>this._syncChildren()}></slot>`}};$r.styles=ee`
        :host { display: block; }
    `;mo([E({type:Boolean,reflect:!0})],$r.prototype,"open",2);mo([E({type:Boolean,attribute:"default-open"})],$r.prototype,"defaultOpen",2);mo([E({type:Boolean,reflect:!0})],$r.prototype,"disabled",2);$r=mo([te("ui-collapsible")],$r);const O_=R.forwardRef(function({open:l,defaultOpen:r,disabled:c,onUiCollapsibleChange:u,children:f,...b},v){const N=R.useRef(null),O=v??N;return R.useEffect(()=>{const z=O.current;z&&(l!==void 0&&(z.open=l),r!==void 0&&(z.defaultOpen=r),c!==void 0&&(z.disabled=c))},[l,r,c]),R.useEffect(()=>{const z=O.current;if(!z||!u)return;const A=u;return z.addEventListener(YE.CHANGE,A),()=>z.removeEventListener(YE.CHANGE,A)},[u]),h.jsxDEV("ui-collapsible",{ref:O,...b,children:f},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiCollapsible.tsx",lineNumber:42,columnNumber:13},this)});O_.displayName="UiCollapsible";const z_=R.forwardRef(function({expanded:l,disabled:r,children:c,...u},f){const b=R.useRef(null),v=f??b;return R.useEffect(()=>{const N=v.current;N&&(l!==void 0&&(N.expanded=l),r!==void 0&&(N.disabled=r))},[l,r]),h.jsxDEV("ui-collapsible-trigger",{ref:v,...u,children:c},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiCollapsibleTrigger.tsx",lineNumber:30,columnNumber:13},this)});z_.displayName="UiCollapsibleTrigger";const j_=R.forwardRef(function({open:l,children:r,...c},u){const f=R.useRef(null),b=u??f;return R.useEffect(()=>{const v=b.current;v&&l!==void 0&&(v.open=l)},[l]),h.jsxDEV("ui-collapsible-content",{ref:b,...c,children:r},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiCollapsibleContent.tsx",lineNumber:28,columnNumber:13},this)});j_.displayName="UiCollapsibleContent";var FT=Object.defineProperty,eR=Object.getOwnPropertyDescriptor,Yc=(p,l,r,c)=>{for(var u=c>1?void 0:c?eR(l,r):l,f=p.length-1,b;f>=0;f--)(b=p[f])&&(u=(c?b(l,r,u):b(u))||u);return c&&u&&FT(l,r,u),u};let Mr=class extends W{constructor(){super(...arguments),this.size="default",this.variant="raised",this.label=""}render(){return $`
            <kbd aria-label=${this.label||pe}>
                <slot></slot>
            </kbd>
        `}};Mr.styles=ee`
        :host {
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }

        kbd {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-family: var(--ui-kbd-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace);
            font-size: 0.8125rem;
            font-weight: 500;
            line-height: 1;
            color: var(--ui-kbd-color, #374151);
            background: var(--ui-kbd-bg, #f9fafb);
            border: 1px solid var(--ui-kbd-border-color, #e5e7eb);
            border-bottom-width: 2px;
            border-radius: var(--ui-kbd-radius, 4px);
            box-shadow: 0 1px 0 0 var(--ui-kbd-shadow-color, #d1d5db);
            padding: 2px 6px;
            white-space: nowrap;
            user-select: none;
        }

        /* size variants */
        :host([size="sm"]) kbd {
            font-size: 0.6875rem;
            padding: 1px 4px;
        }

        :host([size="lg"]) kbd {
            font-size: 0.9375rem;
            padding: 4px 10px;
        }

        /* flat variant — no raised effect */
        :host([variant="flat"]) kbd {
            border-bottom-width: 1px;
            box-shadow: none;
        }
    `;Yc([E({reflect:!0})],Mr.prototype,"size",2);Yc([E({reflect:!0})],Mr.prototype,"variant",2);Yc([E({reflect:!0})],Mr.prototype,"label",2);Mr=Yc([te("ui-kbd")],Mr);let Fg=class extends W{render(){return $`<slot></slot>`}};Fg.styles=ee`
        :host {
            display: inline-flex;
            align-items: center;
            gap: var(--ui-kbd-group-gap, 4px);
        }
    `;Fg=Yc([te("ui-kbd-group")],Fg);const V_=R.forwardRef(function({size:l,variant:r,label:c,children:u,...f},b){const v=R.useRef(null),N=b??v;return R.useEffect(()=>{const O=N.current;O&&(l!==void 0&&(O.size=l),r!==void 0&&(O.variant=r),c!==void 0&&(O.label=c))},[l,r,c]),h.jsxDEV("ui-kbd",{ref:N,...f,children:u},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiKbd.tsx",lineNumber:32,columnNumber:13},this)});V_.displayName="UiKbd";var tR=Object.defineProperty,iR=Object.getOwnPropertyDescriptor,Ea=(p,l,r,c)=>{for(var u=c>1?void 0:c?iR(l,r):l,f=p.length-1,b;f>=0;f--)(b=p[f])&&(u=(c?b(l,r,u):b(u))||u);return c&&u&&tR(l,r,u),u};let vn=class extends W{constructor(){super(...arguments),this.href="",this.target="_self",this.rel="",this.color="primary",this.underline="always",this.variant="inherit",this.disabled=!1}_computedRel(){if(this.target==="_blank"){const l=this.rel||"",r=new Set(l.split(" ").filter(Boolean));return r.add("noopener"),r.add("noreferrer"),Array.from(r).join(" ")}return this.rel||void 0}_handleClick(l){this.disabled&&l.preventDefault()}render(){return $`
            <a
                class="link"
                href=${Ur(this.disabled?void 0:this.href||void 0)}
                target=${Ur(this.target!=="_self"?this.target:void 0)}
                rel=${Ur(this._computedRel())}
                aria-label=${Ur(this.label)}
                download=${Ur(this.download)}
                aria-disabled=${this.disabled}
                tabindex=${this.disabled?"-1":"0"}
                @click=${this._handleClick}
            >
                <slot></slot>
            </a>
        `}};vn.styles=ee`
        :host {
            display: inline;
            --ui-link-color: var(--ui-primary-color, #3b82f6);
            --ui-link-color-hover: var(--ui-primary-color-dark, #2563eb);
            --ui-link-color-visited: var(--ui-secondary-color, #7c3aed);
        }

        a {
            color: var(--ui-link-color);
            font-family: var(--ui-font-family, 'Inter', sans-serif);
            font-size: inherit;
            font-weight: inherit;
            line-height: inherit;
            cursor: pointer;
            display: inline;
            transition: color 0.15s ease, opacity 0.15s ease;
        }

        /* Color variants */
        :host([color="inherit"]) a { color: inherit; }
        :host([color="primary"])  a { color: var(--ui-primary-color, #3b82f6); }
        :host([color="secondary"]) a { color: var(--ui-secondary-color, #7c3aed); }
        :host([color="success"])  a { color: var(--ui-success-color, #16a34a); }
        :host([color="error"])    a { color: var(--ui-error-color, #dc2626); }
        :host([color="warning"])  a { color: var(--ui-warning-color, #d97706); }
        :host([color="info"])     a { color: var(--ui-info-color, #0891b2); }
        :host([color="textPrimary"]) a   { color: var(--ui-text-color, #111827); }
        :host([color="textSecondary"]) a { color: var(--ui-text-color-muted, #6b7280); }

        /* Underline variants */
        :host([underline="none"])   a { text-decoration: none; }
        :host([underline="hover"])  a { text-decoration: none; }
        :host([underline="hover"])  a:hover { text-decoration: underline; }
        :host([underline="always"]) a { text-decoration: underline; }
        :host([underline="always"]) a:hover { text-decoration: underline; }

        /* Default underline (always) */
        a { text-decoration: underline; }

        /* Hover states */
        a:hover { opacity: 0.8; }

        /* Visited */
        a:visited {
            color: var(--ui-link-color-visited);
        }
        :host([color="inherit"]) a:visited { color: inherit; }

        /* Typography variants */
        :host([variant="h1"]) a { font-size: 6rem;   font-weight: 300; letter-spacing: -1.5px; line-height: 1.167; }
        :host([variant="h2"]) a { font-size: 3.75rem; font-weight: 300; letter-spacing: -0.5px; line-height: 1.2; }
        :host([variant="h3"]) a { font-size: 3rem;   font-weight: 400; line-height: 1.167; }
        :host([variant="h4"]) a { font-size: 2.125rem; font-weight: 400; letter-spacing: 0.25px; line-height: 1.235; }
        :host([variant="h5"]) a { font-size: 1.5rem;  font-weight: 400; line-height: 1.334; }
        :host([variant="h6"]) a { font-size: 1.25rem; font-weight: 500; letter-spacing: 0.15px; line-height: 1.6; }
        :host([variant="subtitle1"]) a { font-size: 1rem;    font-weight: 400; letter-spacing: 0.15px; line-height: 1.75; }
        :host([variant="subtitle2"]) a { font-size: 0.875rem; font-weight: 500; letter-spacing: 0.1px;  line-height: 1.57; }
        :host([variant="body1"]) a { font-size: 1rem;    font-weight: 400; letter-spacing: 0.15px; line-height: 1.5; }
        :host([variant="body2"]) a { font-size: 0.875rem; font-weight: 400; letter-spacing: 0.15px; line-height: 1.43; }
        :host([variant="caption"]) a { font-size: 0.75rem;  font-weight: 400; letter-spacing: 0.4px;  line-height: 1.66; }
        :host([variant="overline"]) a { font-size: 0.75rem;  font-weight: 400; letter-spacing: 1px;   line-height: 2.66; text-transform: uppercase; }

        /* Disabled */
        :host([disabled]) a {
            opacity: 0.38;
            cursor: not-allowed;
            pointer-events: none;
        }
    `;Ea([E({type:String})],vn.prototype,"href",2);Ea([E({type:String})],vn.prototype,"target",2);Ea([E({type:String})],vn.prototype,"rel",2);Ea([E({type:String,reflect:!0})],vn.prototype,"color",2);Ea([E({type:String,reflect:!0})],vn.prototype,"underline",2);Ea([E({type:String,reflect:!0})],vn.prototype,"variant",2);Ea([E({type:Boolean,reflect:!0})],vn.prototype,"disabled",2);Ea([E({type:String})],vn.prototype,"download",2);Ea([E({type:String})],vn.prototype,"label",2);vn=Ea([te("ui-link")],vn);const Bc=R.forwardRef(function({href:l,target:r,rel:c,color:u,underline:f,variant:b,disabled:v,download:N,label:O,children:z,...A},x){const C=R.useRef(null),B=x??C;return R.useEffect(()=>{const G=B.current;G&&(l!==void 0&&(G.href=l),r!==void 0&&(G.target=r),c!==void 0&&(G.rel=c),u!==void 0&&(G.color=u),f!==void 0&&(G.underline=f),b!==void 0&&(G.variant=b),v!==void 0&&(G.disabled=v),N!==void 0&&(G.download=N),O!==void 0&&(G.label=O))},[l,r,c,u,f,b,v,N,O]),h.jsxDEV("ui-link",{ref:B,...A,children:z},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiLink.tsx",lineNumber:46,columnNumber:13},this)});Bc.displayName="UiLink";const dp={OTP_CHANGE:"ui-otp-change",OTP_COMPLETE:"ui-otp-complete"};var nR=Object.defineProperty,aR=Object.getOwnPropertyDescriptor,Ci=(p,l,r,c)=>{for(var u=c>1?void 0:c?aR(l,r):l,f=p.length-1,b;f>=0;f--)(b=p[f])&&(u=(c?b(l,r,u):b(u))||u);return c&&u&&nR(l,r,u),u};let ey=class extends W{render(){return $`<slot></slot>`}};ey.styles=ee`
        :host {
            display: inline-flex;
            align-items: center;
        }
    `;ey=Ci([te("ui-input-otp-group")],ey);let ty=class extends W{render(){return $`<div class="bar"></div>`}};ty.styles=ee`
        :host {
            display: inline-flex;
            align-items: center;
            padding: 0 6px;
            color: var(--ui-text-color, #111827);
        }

        .bar {
            width: 8px;
            height: 2px;
            background: currentColor;
            border-radius: 1px;
            opacity: 0.4;
        }
    `;ty=Ci([te("ui-input-otp-separator")],ty);let hs=class extends W{constructor(){super(...arguments),this.index=0,this.char="",this.active=!1,this.invalid=!1}render(){return this.char?$`${this.char}`:this.active?$`<div class="cursor"></div>`:$``}};hs.styles=ee`
        :host {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 48px;
            font-size: 1.25rem;
            font-family: var(--ui-font-family, system-ui, sans-serif);
            font-weight: 500;
            color: var(--ui-text-color, #111827);
            background: #fff;
            border: 1px solid #d1d5db;
            margin-left: -1px;
            cursor: text;
            user-select: none;
            transition: border-color 150ms ease, box-shadow 150ms ease;
        }

        :host(:first-child) {
            margin-left: 0;
            border-radius: 6px 0 0 6px;
        }

        :host(:last-child) {
            border-radius: 0 6px 6px 0;
        }

        :host([active]) {
            z-index: 1;
            border-color: var(--ui-primary-color, #3b82f6);
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        :host([invalid]) {
            border-color: #ef4444;
        }

        :host([invalid][active]) {
            border-color: #ef4444;
            box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
        }

        .cursor {
            width: 2px;
            height: 1.2em;
            background: var(--ui-text-color, #111827);
            border-radius: 1px;
            animation: otp-blink 1.2s step-end infinite;
        }

        @keyframes otp-blink {
            0%, 100% { opacity: 1; }
            50%       { opacity: 0; }
        }
    `;Ci([E({type:Number})],hs.prototype,"index",2);Ci([E()],hs.prototype,"char",2);Ci([E({type:Boolean,reflect:!0})],hs.prototype,"active",2);Ci([E({type:Boolean,reflect:!0})],hs.prototype,"invalid",2);hs=Ci([te("ui-input-otp-slot")],hs);let fo=class extends W{constructor(){super(),this.value="",this.defaultValue="",this.maxLength=6,this.pattern="",this.disabled=!1,this._internalValue="",this._focused=!1,this._cursorIndex=0,this._firstUpdate=!0,this.addEventListener("click",l=>{if(this.disabled)return;const c=l.target.closest("ui-input-otp-slot");this._hiddenInput?.focus(),c&&(this._cursorIndex=Math.min(c.index,this._internalValue.length),this._syncSlots())})}willUpdate(l){if(this._firstUpdate){this._firstUpdate=!1,this.defaultValue&&!this.value?(this._internalValue=this.defaultValue.slice(0,this.maxLength),this.value=this._internalValue):this._internalValue=this.value.slice(0,this.maxLength),this._cursorIndex=Math.min(this._internalValue.length,this.maxLength-1);return}l.has("value")&&this.value!==this._internalValue&&(this._internalValue=this.value.slice(0,this.maxLength),this._cursorIndex=Math.min(this._cursorIndex,Math.max(0,this._internalValue.length)))}updated(l){(l.has("value")||l.has("maxLength"))&&(this._syncSlots(),this._hiddenInput&&this._hiddenInput.value!==this._internalValue&&(this._hiddenInput.value=this._internalValue))}_getAllSlots(){return Array.from(this.querySelectorAll("ui-input-otp-slot"))}_syncSlots(){const l=this._getAllSlots(),r=this._internalValue.length,c=this._focused?this._cursorIndex:-1;for(const u of l){const f=u.index;u.char=f<r?this._internalValue[f]:"",u.active=f===c}}_filterByPattern(l){if(!this.pattern)return l;const r=new RegExp(this.pattern);return l.split("").filter(c=>r.test(c)).join("")}_commit(l){this._internalValue=l,this.value=l,this._hiddenInput&&(this._hiddenInput.value=l),this.dispatchEvent(new CustomEvent("ui-otp-change",{detail:{value:l},bubbles:!0,composed:!0})),l.length===this.maxLength&&this.dispatchEvent(new CustomEvent("ui-otp-complete",{detail:{value:l},bubbles:!0,composed:!0}))}_insertChar(l){if(this.pattern&&!new RegExp(this.pattern).test(l))return;const r=this._cursorIndex,c=this._internalValue;let u;if(r<c.length)u=c.slice(0,r)+l+c.slice(r+1);else if(c.length<this.maxLength)u=c+l;else return;this._commit(u),this._cursorIndex=Math.min(r+1,this.maxLength-1),this._syncSlots()}_deleteBackward(){if(this._internalValue.length===0)return;const l=this._cursorIndex;if(l===0)return;const r=this._internalValue,c=r.slice(0,l-1)+r.slice(l);this._commit(c),this._cursorIndex=l-1,this._syncSlots()}_deleteForward(){const l=this._cursorIndex,r=this._internalValue;if(l>=r.length)return;const c=r.slice(0,l)+r.slice(l+1);this._commit(c),this._syncSlots()}_moveCursor(l){const r=Math.min(this._internalValue.length,this.maxLength-1);this._cursorIndex=Math.max(0,Math.min(this._cursorIndex+l,r)),this._syncSlots()}_handleKeydown(l){if(!(l.key==="Tab"||l.metaKey||l.ctrlKey)){if(l.key==="ArrowLeft"){l.preventDefault(),this._moveCursor(-1);return}if(l.key==="ArrowRight"){l.preventDefault(),this._moveCursor(1);return}if(l.key==="Home"){l.preventDefault(),this._cursorIndex=0,this._syncSlots();return}if(l.key==="End"){l.preventDefault(),this._cursorIndex=Math.min(this._internalValue.length,this.maxLength-1),this._syncSlots();return}if(l.key==="Backspace"){l.preventDefault(),this._deleteBackward();return}if(l.key==="Delete"){l.preventDefault(),this._deleteForward();return}l.key.length===1&&(l.preventDefault(),this._insertChar(l.key))}}_handlePaste(l){l.preventDefault();const r=l.clipboardData?.getData("text")??"",c=this._filterByPattern(r).slice(0,this.maxLength);this._commit(c),this._cursorIndex=Math.min(c.length,this.maxLength-1),this._syncSlots()}_handleFocus(){this._focused=!0,this._cursorIndex=Math.min(this._internalValue.length,this.maxLength-1),this._syncSlots()}_handleBlur(){this._focused=!1,this._syncSlots()}_handleSlotChange(){this._syncSlots()}get _computedInputMode(){if(!this.pattern)return"numeric";try{return new RegExp(this.pattern).test("a")?"text":"numeric"}catch{return"text"}}render(){return $`
            <input
                class="hidden-input"
                type="text"
                autocomplete="one-time-code"
                .inputMode=${this._computedInputMode}
                .maxLength=${this.maxLength}
                .value=${this._internalValue}
                ?disabled=${this.disabled}
                @keydown=${this._handleKeydown}
                @paste=${this._handlePaste}
                @focus=${this._handleFocus}
                @blur=${this._handleBlur}
            />
            <slot @slotchange=${this._handleSlotChange}></slot>
        `}};fo.styles=ee`
        :host {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            position: relative;
            cursor: text;
            font-family: var(--ui-font-family, system-ui, sans-serif);
        }

        :host([disabled]) {
            opacity: 0.5;
            cursor: not-allowed;
            pointer-events: none;
        }

        .hidden-input {
            position: absolute;
            opacity: 0;
            pointer-events: none;
            width: 1px;
            height: 1px;
            top: 0;
            left: 0;
            border: none;
            outline: none;
            padding: 0;
            margin: 0;
        }
    `;Ci([E({reflect:!0})],fo.prototype,"value",2);Ci([E({attribute:"default-value"})],fo.prototype,"defaultValue",2);Ci([E({type:Number,attribute:"max-length"})],fo.prototype,"maxLength",2);Ci([E()],fo.prototype,"pattern",2);Ci([E({type:Boolean,reflect:!0})],fo.prototype,"disabled",2);Ci([Lc(".hidden-input")],fo.prototype,"_hiddenInput",2);fo=Ci([te("ui-input-otp")],fo);const my=R.forwardRef(function({value:l,defaultValue:r,maxLength:c,pattern:u,disabled:f,onUiOtpChange:b,onUiOtpComplete:v,children:N,...O},z){const A=R.useRef(null),x=z??A;return R.useEffect(()=>{const C=x.current;C&&(l!==void 0&&(C.value=l),r!==void 0&&(C.defaultValue=r),c!==void 0&&(C.maxLength=c),u!==void 0&&(C.pattern=u),f!==void 0&&(C.disabled=f))},[l,r,c,u,f]),R.useEffect(()=>{const C=x.current;if(!C||!b)return;const B=b;return C.addEventListener(dp.OTP_CHANGE,B),()=>C.removeEventListener(dp.OTP_CHANGE,B)},[b]),R.useEffect(()=>{const C=x.current;if(!C||!v)return;const B=v;return C.addEventListener(dp.OTP_COMPLETE,B),()=>C.removeEventListener(dp.OTP_COMPLETE,B)},[v]),h.jsxDEV("ui-input-otp",{ref:x,...O,children:N},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiInputOtp.tsx",lineNumber:55,columnNumber:13},this)});my.displayName="UiInputOtp";const Tp=R.forwardRef(function({children:l,...r},c){const u=R.useRef(null),f=c??u;return h.jsxDEV("ui-input-otp-group",{ref:f,...r,children:l},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiInputOtpGroup.tsx",lineNumber:20,columnNumber:13},this)});Tp.displayName="UiInputOtpGroup";const jn=R.forwardRef(function({index:l,char:r,active:c,invalid:u,children:f,...b},v){const N=R.useRef(null),O=v??N;return R.useEffect(()=>{const z=O.current;z&&(l!==void 0&&(z.index=l),r!==void 0&&(z.char=r),c!==void 0&&(z.active=c),u!==void 0&&(z.invalid=u))},[l,r,c,u]),h.jsxDEV("ui-input-otp-slot",{ref:O,...b,children:f},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiInputOtpSlot.tsx",lineNumber:34,columnNumber:13},this)});jn.displayName="UiInputOtpSlot";const $_=R.forwardRef(function({children:l,...r},c){const u=R.useRef(null),f=c??u;return h.jsxDEV("ui-input-otp-separator",{ref:f,...r,children:l},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/react/src/components/UiInputOtpSeparator.tsx",lineNumber:20,columnNumber:13},this)});$_.displayName="UiInputOtpSeparator";const ie={primary:"#3b82f6",primaryLight:"#eff6ff",dark:"#0f172a",text:"#0f172a",muted:"#64748b",border:"#e2e8f0",surface:"#ffffff",bg:"#f8fafc",success:"#22c55e"},He=(p=12)=>({display:"flex",alignItems:"center",gap:p,flexWrap:"wrap"}),me=(p=12)=>({display:"flex",flexDirection:"column",gap:p}),ei=(p={})=>({background:ie.surface,borderRadius:12,border:`1px solid ${ie.border}`,padding:"20px 24px",...p}),ys=(p=ie.bg)=>({padding:"80px 24px",background:p,borderTop:`1px solid ${ie.border}`}),Ln=(p={})=>({maxWidth:1200,margin:"0 auto",...p}),Mp=(p={})=>({display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20,...p}),by=(p={})=>({display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,...p});function vs({title:p,sub:l}){return h.jsxDEV("div",{style:{textAlign:"center",marginBottom:56},children:[h.jsxDEV("h2",{style:{fontSize:"clamp(1.8rem,3vw,2.4rem)",fontWeight:800,letterSpacing:"-0.5px",marginBottom:12},children:p},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:90,columnNumber:13},this),h.jsxDEV("p",{style:{fontSize:17,color:ie.muted,maxWidth:520,margin:"0 auto"},children:l},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:91,columnNumber:13},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:89,columnNumber:9},this)}function bn({title:p,desc:l,children:r,span2:c=!1}){return h.jsxDEV("div",{style:{...ei(),display:"flex",flexDirection:"column",gap:16,gridColumn:c?"span 2":void 0},children:[h.jsxDEV("div",{style:{background:ie.bg,borderRadius:8,border:`1px solid ${ie.border}`,padding:"20px 16px",minHeight:130,display:"flex",alignItems:"center",justifyContent:"center",flexWrap:"wrap",gap:10},children:r},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:99,columnNumber:13},this),h.jsxDEV("div",{children:[h.jsxDEV("p",{style:{fontWeight:600,fontSize:15,marginBottom:4},children:p},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:103,columnNumber:17},this),h.jsxDEV("p",{style:{fontSize:13,color:ie.muted,lineHeight:1.5},children:l},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:104,columnNumber:17},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:102,columnNumber:13},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:98,columnNumber:9},this)}function oR(){return h.jsxDEV("header",{style:{position:"sticky",top:0,zIndex:100,background:"rgba(255,255,255,0.88)",backdropFilter:"blur(12px)",borderBottom:`1px solid ${ie.border}`},children:h.jsxDEV("div",{style:{...Ln(),height:60,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 24px"},children:[h.jsxDEV("div",{style:He(10),children:[h.jsxDEV("svg",{width:"28",height:"28",viewBox:"0 0 28 28",fill:"none",children:[h.jsxDEV("rect",{width:"28",height:"28",rx:"6",fill:ie.primary},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:116,columnNumber:81},this),h.jsxDEV("path",{d:"M8 10l4 4-4 4M14 18h6",stroke:"white",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:116,columnNumber:136},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:116,columnNumber:21},this),h.jsxDEV("span",{style:{fontWeight:700,fontSize:16},children:"storybook-lit"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:117,columnNumber:21},this),h.jsxDEV("span",{style:{fontSize:11,fontWeight:600,background:ie.primaryLight,color:ie.primary,padding:"2px 8px",borderRadius:20},children:"v1.0"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:118,columnNumber:21},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:115,columnNumber:17},this),h.jsxDEV("nav",{style:He(4),children:[["Components","Forms","Data","Overlays","Flow"].map(p=>h.jsxDEV("a",{href:`#s-${p.toLowerCase()}`,style:{fontSize:14,fontWeight:500,color:ie.muted,textDecoration:"none",padding:"6px 12px",borderRadius:6},children:p},p,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:122,columnNumber:25},this)),h.jsxDEV(Qe,{size:"small",variant:"secondary",children:"GitHub ↗"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:124,columnNumber:21},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:120,columnNumber:17},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:114,columnNumber:13},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:113,columnNumber:9},this)}function lR(){const[p,l]=gt.useState(""),[r,c]=gt.useState(4);return h.jsxDEV("section",{style:{background:"linear-gradient(135deg,#0f172a 0%,#1a2744 55%,#0d1f3c 100%)",padding:"80px 24px 96px",position:"relative",overflow:"hidden"},children:[h.jsxDEV("div",{style:{position:"absolute",top:-100,left:"50%",transform:"translateX(-50%)",width:700,height:500,background:"radial-gradient(ellipse,#3b82f61e 0%,transparent 70%)",pointerEvents:"none"}},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:138,columnNumber:13},this),h.jsxDEV("div",{style:{...Ln(),display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"center"},children:[h.jsxDEV("div",{style:me(24),children:[h.jsxDEV("div",{style:{display:"inline-flex",alignItems:"center",gap:8,background:"#3b82f622",border:"1px solid #3b82f644",borderRadius:20,padding:"4px 14px",width:"fit-content"},children:[h.jsxDEV("span",{style:{width:6,height:6,borderRadius:"50%",background:ie.success,display:"inline-block"}},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:143,columnNumber:25},this),h.jsxDEV("span",{style:{fontSize:12,fontWeight:600,color:"#93c5fd"},children:"100+ components · Lit + React"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:144,columnNumber:25},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:142,columnNumber:21},this),h.jsxDEV("h1",{style:{fontSize:"clamp(2.2rem,4vw,3.2rem)",fontWeight:800,lineHeight:1.15,color:"#f8fafc",letterSpacing:"-1px"},children:["Build beautiful UIs with"," ",h.jsxDEV("span",{style:{color:ie.primary},children:"Web Components"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:148,columnNumber:25},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:146,columnNumber:21},this),h.jsxDEV("p",{style:{fontSize:18,color:"#94a3b8",lineHeight:1.7,maxWidth:480},children:"A comprehensive, fully typed UI library built on Lit. Use natively in any framework — or drop in the included React wrappers."},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:150,columnNumber:21},this),h.jsxDEV("div",{style:He(12),children:[h.jsxDEV(Qe,{size:"large",variant:"primary",children:"Browse Components"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:154,columnNumber:25},this),h.jsxDEV(Qe,{size:"large",variant:"secondary",children:"GitHub ↗"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:155,columnNumber:25},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:153,columnNumber:21},this),h.jsxDEV("div",{style:{...He(12),background:"#0d1117",border:"1px solid #30363d",borderRadius:8,padding:"10px 16px",width:"fit-content"},children:[h.jsxDEV("span",{style:{color:"#7ee787",fontFamily:"monospace",fontSize:13},children:"$"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:158,columnNumber:25},this),h.jsxDEV("span",{style:{color:"#e6edf3",fontFamily:"monospace",fontSize:13},children:"npm install storybook-lit"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:159,columnNumber:25},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:157,columnNumber:21},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:141,columnNumber:17},this),h.jsxDEV("div",{style:{background:"#1e293b",borderRadius:16,border:"1px solid #334155",padding:28,boxShadow:"0 25px 50px rgba(0,0,0,0.4)",...me(18)},children:[h.jsxDEV("p",{style:{fontSize:11,fontWeight:700,color:"#475569",letterSpacing:1,textTransform:"uppercase"},children:"Live Preview — all interactive"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:165,columnNumber:21},this),h.jsxDEV("div",{style:He(8),children:[h.jsxDEV(Qe,{size:"small",variant:"primary",children:"Primary"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:168,columnNumber:25},this),h.jsxDEV(Qe,{size:"small",variant:"secondary",children:"Secondary"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:169,columnNumber:25},this),h.jsxDEV(Qe,{size:"small",variant:"destructive",children:"Delete"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:170,columnNumber:25},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:167,columnNumber:21},this),h.jsxDEV(Qi,{},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:173,columnNumber:21},this),h.jsxDEV("div",{style:{...He(16),justifyContent:"space-between"},children:[h.jsxDEV(no,{label:"Dark mode",checked:!0},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:176,columnNumber:25},this),h.jsxDEV("div",{style:He(8),children:[h.jsxDEV(oo,{content:"9+",variant:"error",children:h.jsxDEV(io,{initials:"JD",size:"small"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:178,columnNumber:67},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:178,columnNumber:29},this),h.jsxDEV(oo,{dot:!0,variant:"success",children:h.jsxDEV(io,{initials:"AL",size:"small"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:179,columnNumber:60},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:179,columnNumber:29},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:177,columnNumber:25},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:175,columnNumber:21},this),h.jsxDEV(Qi,{},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:183,columnNumber:21},this),h.jsxDEV(ba,{severity:"success",title:"All systems go",children:"100+ components production-ready."},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:185,columnNumber:21},this),h.jsxDEV(Qi,{},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:187,columnNumber:21},this),h.jsxDEV("div",{style:me(6),children:[h.jsxDEV("p",{style:{fontSize:11,color:"#475569"},children:"Rating — click a star"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:190,columnNumber:25},this),h.jsxDEV(Vp,{value:r,onUiRatingChange:u=>c(u.detail.value)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:191,columnNumber:25},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:189,columnNumber:21},this),h.jsxDEV(Qi,{},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:194,columnNumber:21},this),h.jsxDEV("div",{style:me(6),children:[h.jsxDEV("p",{style:{fontSize:11,color:"#475569"},children:"OTP Input — click to type"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:197,columnNumber:25},this),h.jsxDEV(my,{maxLength:6,onUiOtpChange:u=>l(u.detail.value),children:[h.jsxDEV(Tp,{children:[h.jsxDEV(jn,{index:0},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:200,columnNumber:33},this),h.jsxDEV(jn,{index:1},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:200,columnNumber:61},this),h.jsxDEV(jn,{index:2},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:200,columnNumber:89},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:199,columnNumber:29},this),h.jsxDEV($_,{},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:202,columnNumber:29},this),h.jsxDEV(Tp,{children:[h.jsxDEV(jn,{index:3},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:204,columnNumber:33},this),h.jsxDEV(jn,{index:4},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:204,columnNumber:61},this),h.jsxDEV(jn,{index:5},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:204,columnNumber:89},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:203,columnNumber:29},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:198,columnNumber:25},this),p&&h.jsxDEV("p",{style:{fontSize:11,color:"#22c55e"},children:["Value: ",p]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:207,columnNumber:36},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:196,columnNumber:21},this),h.jsxDEV(Qi,{},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:210,columnNumber:21},this),h.jsxDEV("div",{style:He(6),children:["React","TypeScript","Lit","Vite"].map(u=>h.jsxDEV(eo,{label:u,variant:"outlined",color:"primary",clickable:!0},u,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:213,columnNumber:74},this))},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:212,columnNumber:21},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:164,columnNumber:17},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:139,columnNumber:13},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:137,columnNumber:9},this)}function sR(){const p=[{icon:"⚡",v:"100+",l:"Components"},{icon:"🔷",v:"TypeScript",l:"Fully typed"},{icon:"🌐",v:"Standards",l:"Custom Elements"},{icon:"♿",v:"Accessible",l:"ARIA compliant"},{icon:"🎨",v:"Themeable",l:"CSS custom props"},{icon:"⚛️",v:"React Ready",l:"Wrapper included"}];return h.jsxDEV("section",{style:{borderBottom:`1px solid ${ie.border}`,background:ie.surface},children:h.jsxDEV("div",{style:{...Ln(),display:"grid",gridTemplateColumns:"repeat(6,1fr)"},children:p.map((l,r)=>h.jsxDEV("div",{style:{padding:"24px 16px",textAlign:"center",borderRight:r<5?`1px solid ${ie.border}`:"none"},children:[h.jsxDEV("div",{style:{fontSize:20,marginBottom:4},children:l.icon},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:233,columnNumber:25},this),h.jsxDEV("div",{style:{fontWeight:700,fontSize:14},children:l.v},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:234,columnNumber:25},this),h.jsxDEV("div",{style:{fontSize:12,color:ie.muted},children:l.l},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:235,columnNumber:25},this)]},l.l,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:232,columnNumber:21},this))},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:230,columnNumber:13},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:229,columnNumber:9},this)}function rR(){const[p,l]=gt.useState(!1),[r,c]=gt.useState(60),[u,f]=gt.useState(3),[b,v]=gt.useState(2);return h.jsxDEV("section",{id:"s-components",style:ys(ie.bg),children:h.jsxDEV("div",{style:Ln(),children:[h.jsxDEV(vs,{title:"Everything you need",sub:"Every component is a live Lit custom element wrapped in a typed React component. Click around — they're all interactive."},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:253,columnNumber:17},this),h.jsxDEV("div",{style:Mp(),children:[h.jsxDEV(bn,{title:"Buttons",desc:"Three variants, three sizes, full-width and disabled states.",children:h.jsxDEV("div",{style:me(10),children:[h.jsxDEV("div",{style:He(8),children:[h.jsxDEV(Qe,{size:"small",variant:"primary",children:"Small"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:259,columnNumber:33},this),h.jsxDEV(Qe,{size:"medium",variant:"primary",children:"Medium"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:260,columnNumber:33},this),h.jsxDEV(Qe,{size:"large",variant:"primary",children:"Large"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:261,columnNumber:33},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:258,columnNumber:29},this),h.jsxDEV("div",{style:He(8),children:[h.jsxDEV(Qe,{variant:"secondary",children:"Secondary"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:264,columnNumber:33},this),h.jsxDEV(Qe,{variant:"destructive",children:"Delete"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:265,columnNumber:33},this),h.jsxDEV(Qe,{disabled:!0,children:"Disabled"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:266,columnNumber:33},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:263,columnNumber:29},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:257,columnNumber:25},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:256,columnNumber:21},this),h.jsxDEV(bn,{title:"Switch",desc:"Toggle control — form-associated, sizes sm/md/lg, icon slots.",children:h.jsxDEV("div",{style:me(14),children:[h.jsxDEV(no,{label:p?"Enabled":"Disabled",checked:p,onUiSwitchChange:N=>l(N.detail.checked)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:273,columnNumber:29},this),h.jsxDEV(no,{label:"Notifications",checked:!0,size:"sm"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:275,columnNumber:29},this),h.jsxDEV(no,{label:"Auto-update",checked:!0,size:"lg"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:276,columnNumber:29},this),h.jsxDEV(no,{label:"Offline mode",disabled:!0},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:277,columnNumber:29},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:272,columnNumber:25},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:271,columnNumber:21},this),h.jsxDEV(bn,{title:"Alerts",desc:"Four severity levels with optional title, icons, and dismiss button.",children:h.jsxDEV("div",{style:{...me(8),width:"100%"},children:[h.jsxDEV(ba,{severity:"info",title:"Info",children:"New version available."},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:283,columnNumber:29},this),h.jsxDEV(ba,{severity:"success",title:"Saved",children:"Changes saved successfully."},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:284,columnNumber:29},this),h.jsxDEV(ba,{severity:"warning",title:"Warning",children:"Review before publishing."},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:285,columnNumber:29},this),h.jsxDEV(ba,{severity:"error",children:"Authentication failed."},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:286,columnNumber:29},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:282,columnNumber:25},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:281,columnNumber:21},this),h.jsxDEV(bn,{title:"Avatar & Badge",desc:"Avatars with initials, images, variants — overlaid with count or dot badges.",children:h.jsxDEV("div",{style:He(20),children:[h.jsxDEV(oo,{content:"9+",variant:"error",children:h.jsxDEV(io,{initials:"JD",size:"medium"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:292,columnNumber:67},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:292,columnNumber:29},this),h.jsxDEV(oo,{content:"3",variant:"primary",children:h.jsxDEV(io,{initials:"AL",size:"medium"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:293,columnNumber:68},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:293,columnNumber:29},this),h.jsxDEV(oo,{dot:!0,variant:"success",children:h.jsxDEV(io,{initials:"MK",size:"medium"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:294,columnNumber:60},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:294,columnNumber:29},this),h.jsxDEV(io,{initials:"RB",size:"large",variant:"square"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:295,columnNumber:29},this),h.jsxDEV(io,{initials:"XL",size:"xlarge",variant:"rounded"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:296,columnNumber:29},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:291,columnNumber:25},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:290,columnNumber:21},this),h.jsxDEV(bn,{title:"Chips",desc:"Filled and outlined — clickable, deletable, colored, disabled.",children:h.jsxDEV("div",{style:me(10),children:[h.jsxDEV("div",{style:He(6),children:[h.jsxDEV(eo,{label:"React",color:"primary",clickable:!0},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:303,columnNumber:33},this),h.jsxDEV(eo,{label:"TypeScript",color:"secondary",clickable:!0},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:304,columnNumber:33},this),h.jsxDEV(eo,{label:"Lit",clickable:!0},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:305,columnNumber:33},this),h.jsxDEV(eo,{label:"Vite",clickable:!0},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:306,columnNumber:33},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:302,columnNumber:29},this),h.jsxDEV("div",{style:He(6),children:[h.jsxDEV(eo,{label:"Outlined",variant:"outlined",color:"primary",clickable:!0},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:309,columnNumber:33},this),h.jsxDEV(eo,{label:"Deletable",deletable:!0,clickable:!0},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:310,columnNumber:33},this),h.jsxDEV(eo,{label:"Disabled",disabled:!0},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:311,columnNumber:33},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:308,columnNumber:29},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:301,columnNumber:25},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:300,columnNumber:21},this),h.jsxDEV(bn,{title:"Cards",desc:"Composable card with header, content, media and action slots.",children:h.jsxDEV(e_,{style:{width:"100%",maxWidth:280},children:[h.jsxDEV(i_,{children:h.jsxDEV("div",{style:He(8),children:[h.jsxDEV(io,{initials:"SL",size:"small"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:320,columnNumber:37},this),h.jsxDEV("div",{children:[h.jsxDEV("p",{style:{fontWeight:600,fontSize:13},children:"storybook-lit"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:321,columnNumber:42},this),h.jsxDEV("p",{style:{fontSize:11,color:ie.muted},children:"2 hours ago"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:321,columnNumber:104},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:321,columnNumber:37},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:319,columnNumber:33},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:318,columnNumber:29},this),h.jsxDEV(t_,{children:h.jsxDEV("p",{style:{fontSize:13,color:ie.muted},children:"A comprehensive Lit + React component library for modern UIs."},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:324,columnNumber:44},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:324,columnNumber:29},this),h.jsxDEV(n_,{children:[h.jsxDEV(Qe,{size:"small",variant:"primary",children:"Learn more"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:326,columnNumber:33},this),h.jsxDEV(Qe,{size:"small",variant:"secondary",children:"Share"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:327,columnNumber:33},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:325,columnNumber:29},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:317,columnNumber:25},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:316,columnNumber:21},this),h.jsxDEV(bn,{title:"Accordion",desc:"Expandable panels — click each. Supports disabled and multiple open.",children:h.jsxDEV("div",{style:{width:"100%"},children:[{q:"What is Lit?",a:"A simple library for building fast, lightweight web components."},{q:"Why Web Components?",a:"Works natively in any framework — no adapters needed."},{q:"React support?",a:"Yes — every component ships with a typed React forwardRef wrapper."}].map(({q:N,a:O})=>h.jsxDEV(a_,{children:[h.jsxDEV(o_,{children:N},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:340,columnNumber:37},this),h.jsxDEV(l_,{children:h.jsxDEV("p",{style:{fontSize:13,color:ie.muted},children:O},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:341,columnNumber:57},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:341,columnNumber:37},this)]},N,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:339,columnNumber:33},this))},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:333,columnNumber:25},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:332,columnNumber:21},this),h.jsxDEV(bn,{title:"Tabs",desc:"Keyboard-navigable tabs with ARIA roles and multiple layout variants.",children:h.jsxDEV("div",{style:{width:"100%"},children:h.jsxDEV(s_,{value:"overview",children:[h.jsxDEV(r_,{children:[h.jsxDEV(hp,{value:"overview",children:"Overview"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:351,columnNumber:37},this),h.jsxDEV(hp,{value:"api",children:"API"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:352,columnNumber:37},this),h.jsxDEV(hp,{value:"examples",children:"Examples"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:353,columnNumber:37},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:350,columnNumber:33},this),h.jsxDEV(mp,{value:"overview",children:h.jsxDEV("p",{style:{fontSize:13,color:ie.muted,padding:"12px 0"},children:"Component overview and description."},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:355,columnNumber:62},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:355,columnNumber:33},this),h.jsxDEV(mp,{value:"api",children:h.jsxDEV("p",{style:{fontSize:13,color:ie.muted,padding:"12px 0"},children:"Props, events, and methods reference."},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:356,columnNumber:57},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:356,columnNumber:33},this),h.jsxDEV(mp,{value:"examples",children:h.jsxDEV("p",{style:{fontSize:13,color:ie.muted,padding:"12px 0"},children:"Live usage examples and playground."},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:357,columnNumber:62},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:357,columnNumber:33},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:349,columnNumber:29},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:348,columnNumber:25},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:347,columnNumber:21},this),h.jsxDEV(bn,{title:"Progress",desc:"Determinate and indeterminate linear bars and circular spinners.",children:h.jsxDEV("div",{style:{...me(16),width:"100%",alignItems:"center"},children:[h.jsxDEV("div",{style:{width:"100%",...me(10)},children:[h.jsxDEV(Tr,{variant:"determinate",value:72,color:"primary",label:"72%"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:365,columnNumber:33},this),h.jsxDEV(Tr,{variant:"determinate",value:45,color:"success",label:"45%"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:366,columnNumber:33},this),h.jsxDEV(Tr,{variant:"determinate",value:88,color:"warning",label:"88%"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:367,columnNumber:33},this),h.jsxDEV(Tr,{variant:"indeterminate",color:"primary"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:368,columnNumber:33},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:364,columnNumber:29},this),h.jsxDEV("div",{style:He(20),children:[h.jsxDEV(bp,{value:65},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:370,columnNumber:50},this),h.jsxDEV(bp,{value:85},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:370,columnNumber:83},this),h.jsxDEV(bp,{},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:370,columnNumber:116},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:370,columnNumber:29},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:363,columnNumber:25},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:362,columnNumber:21},this),h.jsxDEV(bn,{title:"Rating & Slider",desc:"Star rating with half-precision and slider with live value display.",children:h.jsxDEV("div",{style:{...me(16),width:"100%"},children:[h.jsxDEV("div",{style:me(6),children:[h.jsxDEV("p",{style:{fontSize:12,color:ie.muted},children:["Rating (",u,"/5) — click a star"]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:377,columnNumber:33},this),h.jsxDEV(Vp,{value:u,onUiRatingChange:N=>f(N.detail.value)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:378,columnNumber:33},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:376,columnNumber:29},this),h.jsxDEV("div",{style:me(6),children:[h.jsxDEV("p",{style:{fontSize:12,color:ie.muted},children:["Slider — ",r,"%"]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:381,columnNumber:33},this),h.jsxDEV(Ep,{value:r,showValue:!0,onUiSliderChange:N=>c(N.detail.value)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:382,columnNumber:33},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:380,columnNumber:29},this),h.jsxDEV(Ep,{value:30,disabled:!0,label:"Disabled"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:384,columnNumber:29},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:375,columnNumber:25},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:374,columnNumber:21},this),h.jsxDEV(bn,{title:"Skeleton",desc:"Animated loading placeholders in text, circular, rectangular, rounded variants.",children:h.jsxDEV("div",{style:{...me(12),width:"100%"},children:[h.jsxDEV("div",{style:He(12),children:[h.jsxDEV(Ui,{variant:"circular",width:"40px",height:"40px"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:391,columnNumber:33},this),h.jsxDEV("div",{style:{...me(6),flex:1},children:[h.jsxDEV(Ui,{variant:"text",width:"80%"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:393,columnNumber:37},this),h.jsxDEV(Ui,{variant:"text",width:"60%"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:394,columnNumber:37},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:392,columnNumber:33},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:390,columnNumber:29},this),h.jsxDEV(Ui,{variant:"rectangular",width:"100%",height:"80px"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:397,columnNumber:29},this),h.jsxDEV("div",{style:He(8),children:[h.jsxDEV(Ui,{variant:"rounded",width:"30%",height:"32px"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:399,columnNumber:33},this),h.jsxDEV(Ui,{variant:"rounded",width:"30%",height:"32px"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:400,columnNumber:33},this),h.jsxDEV(Ui,{variant:"rounded",width:"30%",height:"32px"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:401,columnNumber:33},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:398,columnNumber:29},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:389,columnNumber:25},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:388,columnNumber:21},this),h.jsxDEV(bn,{title:"Breadcrumbs & Pagination",desc:"Breadcrumb trail with separator and full-featured paginator with keyboard support.",children:h.jsxDEV("div",{style:{...me(20),width:"100%",alignItems:"center"},children:[h.jsxDEV(py,{children:[h.jsxDEV(Bc,{href:"#",color:"primary",children:"Home"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:409,columnNumber:33},this),h.jsxDEV(Bc,{href:"#",color:"primary",children:"Components"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:410,columnNumber:33},this),h.jsxDEV("span",{style:{fontSize:14},children:"Pagination"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:411,columnNumber:33},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:408,columnNumber:29},this),h.jsxDEV(hy,{count:10,page:b,onUiPaginationChange:N=>v(N.detail.page)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:413,columnNumber:29},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:407,columnNumber:25},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:406,columnNumber:21},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:254,columnNumber:17},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:252,columnNumber:13},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:251,columnNumber:9},this)}function uR(){const[p,l]=gt.useState(""),[r,c]=gt.useState(!1),[u,f]=gt.useState(50),[b,v]=gt.useState(3),[N,O]=gt.useState(!1),z=[{value:"react",label:"React"},{value:"vue",label:"Vue"},{value:"angular",label:"Angular"},{value:"svelte",label:"Svelte"}];return h.jsxDEV("section",{id:"s-forms",style:ys(ie.surface),children:h.jsxDEV("div",{style:Ln(),children:[h.jsxDEV(vs,{title:h.jsxDEV(h.Fragment,{children:"Forms & Inputs"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:439,columnNumber:33},this),sub:"TextField, Select, Checkbox, Slider, Rating — all form-associated and fully accessible."},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:439,columnNumber:17},this),h.jsxDEV("div",{style:by(),children:[h.jsxDEV("div",{style:ei({...me(20)}),children:[h.jsxDEV("div",{children:[h.jsxDEV("p",{style:{fontWeight:700,fontSize:16},children:"Create Account"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:444,columnNumber:29},this),h.jsxDEV("p",{style:{fontSize:13,color:ie.muted},children:"A fully interactive form using Lit components in React."},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:445,columnNumber:29},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:443,columnNumber:25},this),N?h.jsxDEV("div",{style:me(12),children:[h.jsxDEV(ba,{severity:"success",title:"Account created!",children:["Welcome, ",p||"friend","! Check your email to confirm."]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:449,columnNumber:33},this),h.jsxDEV(Qe,{size:"small",variant:"secondary",onClick:()=>{O(!1),l(""),c(!1)},children:"Reset form"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:450,columnNumber:33},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:448,columnNumber:29},this):h.jsxDEV("div",{style:me(16),children:[h.jsxDEV(Wa,{label:"Full name",placeholder:"Jane Doe",onInput:A=>l(A.target.value)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:454,columnNumber:33},this),h.jsxDEV(Wa,{label:"Email",type:"email",placeholder:"jane@example.com"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:455,columnNumber:33},this),h.jsxDEV(Wa,{label:"Password",type:"password",placeholder:"••••••••",helperText:"At least 8 characters."},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:456,columnNumber:33},this),h.jsxDEV(c_,{label:"Primary framework",placeholder:"Choose one",options:z},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:457,columnNumber:33},this),h.jsxDEV("div",{style:me(6),children:[h.jsxDEV("p",{style:{fontSize:13,fontWeight:500},children:["Monthly budget: $",u]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:459,columnNumber:37},this),h.jsxDEV(Ep,{value:u,min:10,max:200,step:10,showValue:!0,onUiSliderChange:A=>f(A.detail.value)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:460,columnNumber:37},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:458,columnNumber:33},this),h.jsxDEV("div",{style:me(6),children:[h.jsxDEV("p",{style:{fontSize:13,fontWeight:500},children:["Experience level (",b,"/5)"]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:464,columnNumber:37},this),h.jsxDEV(Vp,{value:b,onUiRatingChange:A=>v(A.detail.value)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:465,columnNumber:37},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:463,columnNumber:33},this),h.jsxDEV(rs,{label:"I agree to the Terms of Service and Privacy Policy",checked:r,onChange:()=>c(A=>!A)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:467,columnNumber:33},this),h.jsxDEV(Qe,{variant:"primary",disabled:!r,onClick:()=>O(!0),children:"Create Account"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:468,columnNumber:33},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:453,columnNumber:29},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:442,columnNumber:21},this),h.jsxDEV("div",{style:me(20),children:[h.jsxDEV("div",{style:ei({...me(16)}),children:[h.jsxDEV("p",{style:{fontWeight:700,fontSize:15},children:"Input States"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:476,columnNumber:29},this),h.jsxDEV(Wa,{label:"Default",placeholder:"Normal state"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:477,columnNumber:29},this),h.jsxDEV(Wa,{label:"With helper",placeholder:"Start typing…",helperText:"Provides additional context."},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:478,columnNumber:29},this),h.jsxDEV(Wa,{label:"Error state",value:"bad@email",error:!0,errorMessage:"Enter a valid email address."},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:479,columnNumber:29},this),h.jsxDEV(Wa,{label:"Disabled",value:"Cannot be edited",disabled:!0},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:480,columnNumber:29},this),h.jsxDEV(Wa,{label:"Filled variant",placeholder:"Filled style",variant:"filled"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:481,columnNumber:29},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:475,columnNumber:25},this),h.jsxDEV("div",{style:ei({...me(16)}),children:[h.jsxDEV("p",{style:{fontWeight:700,fontSize:15},children:"Checkboxes"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:484,columnNumber:29},this),h.jsxDEV("div",{style:He(24),children:[h.jsxDEV("div",{style:me(10),children:[h.jsxDEV(rs,{label:"Unchecked"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:487,columnNumber:37},this),h.jsxDEV(rs,{label:"Checked",checked:!0},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:488,columnNumber:37},this),h.jsxDEV(rs,{label:"Indeterminate",indeterminate:!0},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:489,columnNumber:37},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:486,columnNumber:33},this),h.jsxDEV("div",{style:me(10),children:[h.jsxDEV(rs,{label:"Disabled",disabled:!0},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:492,columnNumber:37},this),h.jsxDEV(rs,{label:"Disabled ✓",checked:!0,disabled:!0},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:493,columnNumber:37},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:491,columnNumber:33},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:485,columnNumber:29},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:483,columnNumber:25},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:474,columnNumber:21},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:440,columnNumber:17},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:438,columnNumber:13},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:437,columnNumber:9},this)}function cR(){const p=[{name:"UiButton",cat:"Input",status:"stable",tests:32},{name:"UiSwitch",cat:"Input",status:"stable",tests:33},{name:"UiAccordion",cat:"Layout",status:"stable",tests:28},{name:"UiDatePicker",cat:"Date",status:"stable",tests:61},{name:"UiRichTreeView",cat:"Data",status:"stable",tests:45},{name:"UiCommand",cat:"Navigation",status:"stable",tests:31}],l=r=>r==="stable"?"success":"warning";return h.jsxDEV("section",{id:"s-data",style:ys(ie.bg),children:h.jsxDEV("div",{style:Ln(),children:[h.jsxDEV(vs,{title:"Data Display",sub:"Table, List, and Skeleton components for structured data and loading states."},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:519,columnNumber:17},this),h.jsxDEV("div",{style:by(),children:[h.jsxDEV("div",{style:ei({overflow:"hidden",padding:0}),children:[h.jsxDEV("div",{style:{padding:"16px 20px",borderBottom:`1px solid ${ie.border}`,...He(8)},children:[h.jsxDEV("p",{style:{fontWeight:700,fontSize:15},children:"Component Catalog"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:523,columnNumber:29},this),h.jsxDEV(oo,{content:String(p.length),variant:"primary"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:524,columnNumber:29},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:522,columnNumber:25},this),h.jsxDEV(m_,{children:h.jsxDEV(h_,{children:[h.jsxDEV(b_,{children:h.jsxDEV(Xg,{children:[h.jsxDEV(Fa,{header:!0,children:"Component"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:530,columnNumber:41},this),h.jsxDEV(Fa,{header:!0,children:"Category"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:531,columnNumber:41},this),h.jsxDEV(Fa,{header:!0,children:"Status"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:532,columnNumber:41},this),h.jsxDEV(Fa,{header:!0,align:"right",children:"Tests"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:533,columnNumber:41},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:529,columnNumber:37},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:528,columnNumber:33},this),h.jsxDEV(g_,{children:p.map(r=>h.jsxDEV(Xg,{children:[h.jsxDEV(Fa,{children:h.jsxDEV("span",{style:{fontFamily:"monospace",fontSize:13},children:r.name},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:539,columnNumber:58},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:539,columnNumber:45},this),h.jsxDEV(Fa,{children:r.cat},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:540,columnNumber:45},this),h.jsxDEV(Fa,{children:h.jsxDEV(oo,{content:r.status,variant:l(r.status)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:541,columnNumber:58},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:541,columnNumber:45},this),h.jsxDEV(Fa,{align:"right",children:h.jsxDEV("span",{style:{fontSize:13,color:ie.muted},children:r.tests},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:542,columnNumber:72},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:542,columnNumber:45},this)]},r.name,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:538,columnNumber:41},this))},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:536,columnNumber:33},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:527,columnNumber:29},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:526,columnNumber:25},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:521,columnNumber:21},this),h.jsxDEV("div",{style:me(20),children:[h.jsxDEV("div",{style:ei({padding:0,overflow:"hidden"}),children:[h.jsxDEV("div",{style:{padding:"16px 20px",borderBottom:`1px solid ${ie.border}`},children:h.jsxDEV("p",{style:{fontWeight:700,fontSize:15},children:"List"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:553,columnNumber:33},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:552,columnNumber:29},this),h.jsxDEV(y_,{children:[{icon:"📦",p:"Components",s:"100+ ready-to-use elements"},{icon:"🎨",p:"Theming",s:"CSS custom properties"},{icon:"♿",p:"Accessibility",s:"ARIA roles & keyboard nav"},{icon:"⚛️",p:"React Wrappers",s:"Auto-generated, fully typed"},{icon:"🧪",p:"Tested",s:"1000+ unit & browser tests"}].map(({icon:r,p:c,s:u})=>h.jsxDEV(v_,{children:h.jsxDEV(x_,{children:[h.jsxDEV(S_,{children:r},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:565,columnNumber:45},this),h.jsxDEV(N_,{primary:c,secondary:u},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:566,columnNumber:45},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:564,columnNumber:41},this)},c,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:563,columnNumber:37},this))},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:555,columnNumber:29},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:551,columnNumber:25},this),h.jsxDEV("div",{style:ei({...me(16)}),children:[h.jsxDEV("p",{style:{fontWeight:700,fontSize:15},children:"Skeleton Loading"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:573,columnNumber:29},this),h.jsxDEV("div",{style:He(12),children:[h.jsxDEV(Ui,{variant:"circular",width:"48px",height:"48px"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:574,columnNumber:50},this),h.jsxDEV("div",{style:{...me(6),flex:1},children:[h.jsxDEV(Ui,{variant:"text",width:"70%"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:574,columnNumber:146},this),h.jsxDEV(Ui,{variant:"text",width:"50%"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:574,columnNumber:187},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:574,columnNumber:110},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:574,columnNumber:29},this),h.jsxDEV(Ui,{variant:"rectangular",width:"100%",height:"90px"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:575,columnNumber:29},this),h.jsxDEV("div",{style:He(8),children:[h.jsxDEV(Ui,{variant:"rounded",width:"80px",height:"30px"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:576,columnNumber:49},this),h.jsxDEV(Ui,{variant:"rounded",width:"80px",height:"30px"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:576,columnNumber:108},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:576,columnNumber:29},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:572,columnNumber:25},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:550,columnNumber:21},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:520,columnNumber:17},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:518,columnNumber:13},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:517,columnNumber:9},this)}function dR(){const[p,l]=gt.useState(!1),[r,c]=gt.useState(!1),[u,f]=gt.useState(""),[b,v]=gt.useState("success"),N=(O,z)=>{f(O),v(z),c(!0)};return h.jsxDEV("section",{id:"s-overlays",style:ys(ie.surface),children:h.jsxDEV("div",{style:Ln(),children:[h.jsxDEV(vs,{title:"Overlays & Notifications",sub:"Dialog, Snackbar, and Tooltip — accessible, keyboard-dismissable, and animated."},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:597,columnNumber:17},this),h.jsxDEV("div",{style:Mp(),children:[h.jsxDEV("div",{style:ei({...me(20)}),children:[h.jsxDEV("p",{style:{fontWeight:700,fontSize:15},children:"Dialog"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:601,columnNumber:25},this),h.jsxDEV("p",{style:{fontSize:13,color:ie.muted,lineHeight:1.5},children:"Modal dialogs with scale/slide transitions, backdrop click dismiss, and focus trap."},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:602,columnNumber:25},this),h.jsxDEV("div",{style:He(8),children:h.jsxDEV(Qe,{variant:"primary",onClick:()=>l(!0),children:"Open Dialog"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:604,columnNumber:29},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:603,columnNumber:25},this),h.jsxDEV(E_,{open:p,onClose:()=>l(!1),children:[h.jsxDEV(__,{children:"Delete component?"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:607,columnNumber:29},this),h.jsxDEV(w_,{children:h.jsxDEV(A_,{children:"This will permanently remove the component and all associated files. This action cannot be undone."},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:609,columnNumber:33},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:608,columnNumber:29},this),h.jsxDEV(D_,{children:[h.jsxDEV(Qe,{variant:"secondary",onClick:()=>l(!1),children:"Cancel"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:612,columnNumber:33},this),h.jsxDEV(Qe,{variant:"destructive",onClick:()=>l(!1),children:"Delete"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:613,columnNumber:33},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:611,columnNumber:29},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:606,columnNumber:25},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:600,columnNumber:21},this),h.jsxDEV("div",{style:ei({...me(20)}),children:[h.jsxDEV("p",{style:{fontWeight:700,fontSize:15},children:"Snackbar"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:619,columnNumber:25},this),h.jsxDEV("p",{style:{fontSize:13,color:ie.muted,lineHeight:1.5},children:"Toast notifications — auto-hide, pause-on-hover, anchor position, four variants."},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:620,columnNumber:25},this),h.jsxDEV("div",{style:me(8),children:[h.jsxDEV("div",{style:He(8),children:[h.jsxDEV(Qe,{size:"small",variant:"primary",onClick:()=>N("Changes saved!","success"),children:"Success"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:623,columnNumber:33},this),h.jsxDEV(Qe,{size:"small",variant:"destructive",onClick:()=>N("Connection failed.","error"),children:"Error"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:624,columnNumber:33},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:622,columnNumber:29},this),h.jsxDEV("div",{style:He(8),children:[h.jsxDEV(Qe,{size:"small",variant:"secondary",onClick:()=>N("Session expires in 5 min.","warning"),children:"Warning"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:627,columnNumber:33},this),h.jsxDEV(Qe,{size:"small",variant:"secondary",onClick:()=>N("New feature available!","info"),children:"Info"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:628,columnNumber:33},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:626,columnNumber:29},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:621,columnNumber:25},this),h.jsxDEV(U_,{open:r,message:u,variant:b,closable:!0,autoHideDuration:4e3,onUiSnackbarClose:()=>c(!1)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:631,columnNumber:25},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:618,columnNumber:21},this),h.jsxDEV("div",{style:ei({...me(20)}),children:[h.jsxDEV("p",{style:{fontWeight:700,fontSize:15},children:"Tooltip"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:635,columnNumber:25},this),h.jsxDEV("p",{style:{fontSize:13,color:ie.muted,lineHeight:1.5},children:"Hover tooltips — top, bottom, left, right placement with optional arrow."},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:636,columnNumber:25},this),h.jsxDEV("div",{style:me(12),children:[h.jsxDEV("div",{style:He(8),children:[h.jsxDEV(Ac,{label:"Tooltip on top",placement:"top",arrow:!0,children:h.jsxDEV(Qe,{size:"small",variant:"secondary",children:"Top ↑"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:639,columnNumber:89},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:639,columnNumber:33},this),h.jsxDEV(Ac,{label:"Tooltip on bottom",placement:"bottom",arrow:!0,children:h.jsxDEV(Qe,{size:"small",variant:"secondary",children:"Bottom ↓"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:640,columnNumber:95},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:640,columnNumber:33},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:638,columnNumber:29},this),h.jsxDEV("div",{style:He(8),children:[h.jsxDEV(Ac,{label:"Left tooltip",placement:"left",arrow:!0,children:h.jsxDEV(Qe,{size:"small",variant:"secondary",children:"Left ←"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:643,columnNumber:88},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:643,columnNumber:33},this),h.jsxDEV(Ac,{label:"Right tooltip",placement:"right",arrow:!0,children:h.jsxDEV(Qe,{size:"small",variant:"secondary",children:"Right →"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:644,columnNumber:90},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:644,columnNumber:33},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:642,columnNumber:29},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:637,columnNumber:25},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:634,columnNumber:21},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:598,columnNumber:17},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:596,columnNumber:13},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:595,columnNumber:9},this)}function fR(){const[p,l]=gt.useState(0),r=[{label:"Create account",desc:"Enter your email and choose a password."},{label:"Complete profile",desc:"Add your name, role, and preferences."},{label:"Invite team",desc:"Add colleagues — they can join immediately."},{label:"Go live 🎉",desc:"Your workspace is ready."}],c=[{q:"Is this library free?",a:"Yes — fully open source under the ISC license."},{q:"Works without React?",a:"Absolutely. Native web components work anywhere."},{q:"How do I theme it?",a:"Override any --ui-* CSS custom property on :root."},{q:"Tree-shakeable?",a:"Yes — import only what you need."}];return h.jsxDEV("section",{id:"s-flow",style:ys(ie.bg),children:h.jsxDEV("div",{style:Ln(),children:[h.jsxDEV(vs,{title:"Navigation & Flow",sub:"Stepper, Collapsible, Keyboard shortcuts — tools for multi-step flows and progressive disclosure."},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:674,columnNumber:17},this),h.jsxDEV("div",{style:by(),children:[h.jsxDEV("div",{style:ei({...me(20)}),children:[h.jsxDEV("div",{children:[h.jsxDEV("p",{style:{fontWeight:700,fontSize:15},children:"Multi-step Stepper"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:679,columnNumber:29},this),h.jsxDEV("p",{style:{fontSize:13,color:ie.muted},children:["Step ",p+1," of ",r.length,": ",r[p].label]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:680,columnNumber:29},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:678,columnNumber:25},this),h.jsxDEV(T_,{activeStep:p,orientation:"vertical",children:r.map((u,f)=>h.jsxDEV(R_,{stepIndex:f,active:f===p,completed:f<p,children:[h.jsxDEV(C_,{children:u.label},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:685,columnNumber:37},this),f===p&&h.jsxDEV(k_,{children:h.jsxDEV("p",{style:{fontSize:13,color:ie.muted,marginBottom:12},children:u.desc},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:686,columnNumber:67},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:686,columnNumber:52},this)]},u.label,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:684,columnNumber:33},this))},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:682,columnNumber:25},this),h.jsxDEV("div",{style:He(8),children:[h.jsxDEV(Qe,{variant:"secondary",disabled:p===0,onClick:()=>l(u=>u-1),children:"Back"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:691,columnNumber:29},this),h.jsxDEV(Qe,{variant:"primary",disabled:p===r.length-1,onClick:()=>l(u=>u+1),children:p===r.length-2?"Finish":"Next"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:692,columnNumber:29},this),p===r.length-1&&h.jsxDEV(Qe,{variant:"secondary",onClick:()=>l(0),children:"Reset"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:695,columnNumber:59},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:690,columnNumber:25},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:677,columnNumber:21},this),h.jsxDEV("div",{style:me(20),children:[h.jsxDEV("div",{style:ei({...me(12)}),children:[h.jsxDEV("div",{style:He(8),children:[h.jsxDEV("p",{style:{fontWeight:700,fontSize:15},children:"FAQ — Collapsible"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:702,columnNumber:33},this),h.jsxDEV(oo,{content:String(c.length),variant:"primary"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:703,columnNumber:33},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:701,columnNumber:29},this),c.map(({q:u,a:f})=>h.jsxDEV(O_,{children:[h.jsxDEV(z_,{children:h.jsxDEV("div",{style:{...He(0),cursor:"pointer",padding:"10px 0",borderTop:`1px solid ${ie.border}`,justifyContent:"space-between"},children:[h.jsxDEV("span",{style:{fontSize:14,fontWeight:500},children:u},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:709,columnNumber:45},this),h.jsxDEV("span",{style:{color:ie.muted,fontSize:18},children:"+"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:710,columnNumber:45},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:708,columnNumber:41},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:707,columnNumber:37},this),h.jsxDEV(j_,{children:h.jsxDEV("p",{style:{fontSize:13,color:ie.muted,padding:"8px 0 12px"},children:f},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:714,columnNumber:41},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:713,columnNumber:37},this)]},u,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:706,columnNumber:33},this))]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:700,columnNumber:25},this),h.jsxDEV("div",{style:ei({...me(12)}),children:[h.jsxDEV("p",{style:{fontWeight:700,fontSize:15},children:"Keyboard Shortcuts"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:721,columnNumber:29},this),h.jsxDEV("div",{style:me(8),children:[{keys:["⌘","K"],label:"Open command palette"},{keys:["⌘","S"],label:"Save changes"},{keys:["⌘","Z"],label:"Undo"},{keys:["⌘","Shift","Z"],label:"Redo"},{keys:["Esc"],label:"Dismiss dialog"}].map(({keys:u,label:f})=>h.jsxDEV("div",{style:{...He(8),justifyContent:"space-between"},children:[h.jsxDEV("span",{style:{fontSize:13,color:ie.muted},children:f},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:731,columnNumber:41},this),h.jsxDEV("div",{style:He(4),children:u.map(b=>h.jsxDEV(V_,{children:b},b,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:732,columnNumber:76},this))},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:732,columnNumber:41},this)]},f,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:730,columnNumber:37},this))},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:722,columnNumber:29},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:720,columnNumber:25},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:699,columnNumber:21},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:675,columnNumber:17},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:673,columnNumber:13},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:672,columnNumber:9},this)}function pR(){const[p,l]=gt.useState(!1),[r,c]=gt.useState(!0),[u,f]=gt.useState(!1),[b,v]=gt.useState(3),[N,O]=gt.useState(!0),[z,A]=gt.useState(68);return gt.useEffect(()=>{const x=setInterval(()=>A(C=>C>=100?0:C+2),300);return()=>clearInterval(x)},[]),h.jsxDEV("section",{style:ys(ie.surface),children:h.jsxDEV("div",{style:Ln(),children:[h.jsxDEV(vs,{title:"Fully interactive",sub:"Real Lit components rendered inside React — no mocks, no stubs."},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:761,columnNumber:17},this),h.jsxDEV("div",{style:Mp(),children:[h.jsxDEV("div",{style:ei({...me(20)}),children:[h.jsxDEV("div",{children:[h.jsxDEV("p",{style:{fontWeight:700,fontSize:15},children:"Settings Panel"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:765,columnNumber:30},this),h.jsxDEV("p",{style:{fontSize:13,color:ie.muted},children:"State reflected live below"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:765,columnNumber:93},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:765,columnNumber:25},this),h.jsxDEV(Qi,{},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:766,columnNumber:25},this),h.jsxDEV("div",{style:me(16),children:[h.jsxDEV(no,{label:"Dark mode",checked:p,onUiSwitchChange:x=>l(x.detail.checked)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:768,columnNumber:29},this),h.jsxDEV(no,{label:"Notifications",checked:r,size:"md",onUiSwitchChange:x=>c(x.detail.checked)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:769,columnNumber:29},this),h.jsxDEV(no,{label:"Auto-save",checked:u,size:"sm",onUiSwitchChange:x=>f(x.detail.checked)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:770,columnNumber:29},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:767,columnNumber:25},this),h.jsxDEV(Qi,{},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:772,columnNumber:25},this),h.jsxDEV("div",{style:me(6),children:[{l:"Dark mode",v:p,color:ie.primary},{l:"Notifications",v:r,color:ie.success},{l:"Auto-save",v:u,color:ie.success}].map(({l:x,v:C,color:B})=>h.jsxDEV("div",{style:He(6),children:[h.jsxDEV("span",{style:{width:8,height:8,borderRadius:"50%",background:C?B:ie.border,display:"inline-block"}},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:775,columnNumber:61},this),h.jsxDEV("span",{style:{fontSize:12,color:ie.muted},children:[x,": ",h.jsxDEV("b",{children:C?"on":"off"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:775,columnNumber:233},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:775,columnNumber:181},this)]},x,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:775,columnNumber:33},this))},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:773,columnNumber:25},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:764,columnNumber:21},this),h.jsxDEV("div",{style:ei({...me(20)}),children:[h.jsxDEV("div",{children:[h.jsxDEV("p",{style:{fontWeight:700,fontSize:15},children:"Navigation"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:781,columnNumber:30},this),h.jsxDEV("p",{style:{fontSize:13,color:ie.muted},children:"Breadcrumbs, Pagination & Typography"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:781,columnNumber:89},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:781,columnNumber:25},this),h.jsxDEV(Qi,{},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:782,columnNumber:25},this),h.jsxDEV(py,{children:[h.jsxDEV(Bc,{href:"#",color:"primary",children:"Home"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:783,columnNumber:40},this),h.jsxDEV(Bc,{href:"#",color:"primary",children:"Components"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:783,columnNumber:86},this),h.jsxDEV("span",{style:{fontSize:13},children:"Interactive"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:783,columnNumber:138},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:783,columnNumber:25},this),h.jsxDEV(hy,{count:10,page:b,onUiPaginationChange:x=>v(x.detail.page)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:784,columnNumber:25},this),h.jsxDEV(Qi,{},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:785,columnNumber:25},this),h.jsxDEV("div",{style:me(6),children:[h.jsxDEV("p",{style:{fontSize:12,color:ie.muted},children:["Animated progress — ",z,"%"]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:787,columnNumber:29},this),h.jsxDEV(Tr,{variant:"determinate",value:z,color:"primary"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:788,columnNumber:29},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:786,columnNumber:25},this),h.jsxDEV(Qi,{},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:790,columnNumber:25},this),h.jsxDEV("div",{style:me(6),children:[h.jsxDEV(gp,{variant:"h6",children:"Heading H6"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:792,columnNumber:29},this),h.jsxDEV(gp,{variant:"body1",children:"Body text — regular weight"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:793,columnNumber:29},this),h.jsxDEV(gp,{variant:"caption",color:"secondary",children:"Caption — muted smaller text"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:794,columnNumber:29},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:791,columnNumber:25},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:780,columnNumber:21},this),h.jsxDEV("div",{style:ei({...me(20)}),children:[h.jsxDEV("div",{children:[h.jsxDEV("p",{style:{fontWeight:700,fontSize:15},children:"Feedback"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:799,columnNumber:30},this),h.jsxDEV("p",{style:{fontSize:13,color:ie.muted},children:"Dismissible alerts & OTP input"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:799,columnNumber:87},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:799,columnNumber:25},this),h.jsxDEV(Qi,{},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:800,columnNumber:25},this),h.jsxDEV("div",{style:me(8),children:[N?h.jsxDEV(ba,{severity:"info",title:"Did you know?",dismissible:!0,onUiAlertClose:()=>O(!1),children:"Click × to dismiss. State tracked in React."},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:803,columnNumber:33},this):h.jsxDEV("div",{style:{textAlign:"center",padding:"8px 0"},children:h.jsxDEV(Qe,{size:"small",variant:"secondary",onClick:()=>O(!0),children:"Restore alert"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:805,columnNumber:88},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:805,columnNumber:33},this),h.jsxDEV(ba,{severity:"success",children:"Custom element registered ✓"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:807,columnNumber:29},this),h.jsxDEV(ba,{severity:"warning",children:"Props synced via useEffect"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:808,columnNumber:29},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:801,columnNumber:25},this),h.jsxDEV(Qi,{},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:810,columnNumber:25},this),h.jsxDEV("div",{style:me(8),children:[h.jsxDEV("p",{style:{fontSize:12,color:ie.muted},children:"OTP Input — try typing"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:812,columnNumber:29},this),h.jsxDEV(my,{maxLength:4,children:h.jsxDEV(Tp,{children:[h.jsxDEV(jn,{index:0},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:815,columnNumber:37},this),h.jsxDEV(jn,{index:1},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:815,columnNumber:65},this),h.jsxDEV(jn,{index:2},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:815,columnNumber:93},this),h.jsxDEV(jn,{index:3},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:815,columnNumber:121},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:814,columnNumber:33},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:813,columnNumber:29},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:811,columnNumber:25},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:798,columnNumber:21},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:762,columnNumber:17},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:760,columnNumber:13},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:759,columnNumber:9},this)}function hR(){const p=[{name:"Inputs & Forms",items:["Button","ButtonGroup","ToggleButton","Switch","Checkbox","TextField","Input","Select","Autocomplete","Slider","RangeSlider","Rating","Radio","InputOTP"]},{name:"Data Display",items:["Avatar","Badge","Chip","Typography","Divider","Table","Card","List","ImageList","Empty"]},{name:"Feedback",items:["Alert","Snackbar","Dialog","Tooltip","HoverCard","LinearProgress","CircularProgress","Skeleton","Backdrop"]},{name:"Navigation",items:["Tabs","Breadcrumbs","Pagination","BottomNavigation","AppBar","Drawer","Menu","Menubar","SpeedDial","Command","Link"]},{name:"Layout & Flow",items:["Box","Stack","Grid","Container","Paper","Collapsible","Accordion","Fab","Stepper"]},{name:"Date & Data",items:["SimpleTreeView","RichTreeView","TransferList","DateField","DatePicker","DateRangePicker","TimePicker","Kbd"]}];return h.jsxDEV("section",{style:ys(ie.bg),children:h.jsxDEV("div",{style:Ln(),children:[h.jsxDEV(vs,{title:h.jsxDEV(h.Fragment,{children:"100+ components across 6 categories"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:839,columnNumber:33},this),sub:"Every component ships with its own React wrapper, TypeScript types, Storybook stories, and unit tests."},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:839,columnNumber:17},this),h.jsxDEV("div",{style:Mp(),children:p.map(l=>h.jsxDEV("div",{style:ei(),children:[h.jsxDEV("div",{style:{...He(8),marginBottom:12,justifyContent:"space-between"},children:[h.jsxDEV("p",{style:{fontWeight:700,fontSize:14},children:l.name},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:844,columnNumber:33},this),h.jsxDEV("span",{style:{fontSize:11,background:ie.primaryLight,color:ie.primary,padding:"2px 8px",borderRadius:20,fontWeight:700},children:l.items.length},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:845,columnNumber:33},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:843,columnNumber:29},this),h.jsxDEV("div",{style:{display:"flex",flexWrap:"wrap",gap:6},children:l.items.map(r=>h.jsxDEV("span",{style:{fontSize:12,fontFamily:"monospace",color:ie.muted,background:ie.bg,border:`1px solid ${ie.border}`,padding:"2px 8px",borderRadius:4},children:r},r,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:848,columnNumber:54},this))},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:847,columnNumber:29},this)]},l.name,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:842,columnNumber:25},this))},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:840,columnNumber:17},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:838,columnNumber:13},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:837,columnNumber:9},this)}function mR(){return h.jsxDEV("footer",{style:{background:ie.dark,color:"#94a3b8",padding:"48px 24px"},children:h.jsxDEV("div",{style:{...Ln(),display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:24},children:[h.jsxDEV("div",{style:me(8),children:[h.jsxDEV("div",{style:He(10),children:[h.jsxDEV("svg",{width:"22",height:"22",viewBox:"0 0 28 28",fill:"none",children:[h.jsxDEV("rect",{width:"28",height:"28",rx:"6",fill:ie.primary},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:865,columnNumber:85},this),h.jsxDEV("path",{d:"M8 10l4 4-4 4M14 18h6",stroke:"white",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:865,columnNumber:140},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:865,columnNumber:25},this),h.jsxDEV("span",{style:{fontWeight:700,color:"#f1f5f9"},children:"storybook-lit"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:866,columnNumber:25},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:864,columnNumber:21},this),h.jsxDEV("p",{style:{fontSize:13},children:"Web Component UI · React wrappers · TypeScript first"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:868,columnNumber:21},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:863,columnNumber:17},this),h.jsxDEV("div",{style:He(32),children:["Components","Getting Started","Storybook","GitHub"].map(p=>h.jsxDEV("a",{href:"#",style:{color:"#94a3b8",fontSize:13,textDecoration:"none"},children:p},p,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:872,columnNumber:25},this))},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:870,columnNumber:17},this),h.jsxDEV("p",{style:{fontSize:12},children:"Built with Lit v3 · React 19 · TypeScript · Vite"},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:875,columnNumber:17},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:862,columnNumber:13},this)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:861,columnNumber:9},this)}function bR(){return h.jsxDEV("div",{style:{fontFamily:"system-ui,-apple-system,sans-serif",color:ie.text},children:[h.jsxDEV(oR,{},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:885,columnNumber:13},this),h.jsxDEV(lR,{},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:886,columnNumber:13},this),h.jsxDEV(sR,{},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:887,columnNumber:13},this),h.jsxDEV(rR,{},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:888,columnNumber:13},this),h.jsxDEV(uR,{},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:889,columnNumber:13},this),h.jsxDEV(cR,{},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:890,columnNumber:13},this),h.jsxDEV(dR,{},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:891,columnNumber:13},this),h.jsxDEV(fR,{},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:892,columnNumber:13},this),h.jsxDEV(pR,{},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:893,columnNumber:13},this),h.jsxDEV(hR,{},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:894,columnNumber:13},this),h.jsxDEV(mR,{},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:895,columnNumber:13},this)]},void 0,!0,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/App.tsx",lineNumber:884,columnNumber:9},this)}RU.createRoot(document.getElementById("root")).render(h.jsxDEV(R.StrictMode,{children:h.jsxDEV(bR,{},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/main.tsx",lineNumber:7,columnNumber:9},void 0)},void 0,!1,{fileName:"/Users/algoassasin/storybook-lit/homepage/src/main.tsx",lineNumber:6,columnNumber:5},void 0));
