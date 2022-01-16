type MetaDataComponent = { html?: string, style?: string, properties?: Array<string> };

export function Component(meta: MetaDataComponent) {
	return (target: Function) => {
		target.prototype.srcHtml = meta?.html || '';
		target.prototype.srcStyle = meta?.style || '';
		target.prototype.properties = meta?.properties || [];

		// Ref.: https://gist.github.com/remojansen/16c661a7afd68e22ac6e

		// // save a reference to the original constructor
		// var original = target;
		//
		// // a utility function to generate instances of a class
		// const construct = (constructor: Function, args: any) => {
		//     let c : any = function () {
		//         return constructor.apply(this, args);
		//     }
		//     c.prototype = constructor.prototype;
		//     return new c();
		// }
		//
		// // the new constructor behaviour
		// var f : any = function (...args: any) {
		//     console.log("New: " + original.name);
		//     return construct(original, args);
		// }
		//
		// // copy prototype so intanceof operator still works
		// f.prototype = original.prototype;
		//
		// // return new constructor (will override original)
		// return f;
	};

}