import Router from "next/router";

export default (context: any, target: any) => {
	if (context.res) {
		// server
		// 303: "See other"
		context.res.writeHead(303, { Location: target });
		context.res.end();
		return { props: {} };
	} else {
		// In the browser, we just pretend like this never even happened ;)
		return Router.replace(target);
	}
};
