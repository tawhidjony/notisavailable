import redirect from "helpers/redirect.helpers";
import nextCookie from "next-cookies";
import { EnumAdminUserTypes } from "Utils/Enums/UserType";

type option = {
	Permission?: EnumAdminUserTypes[] | false,
	callback?: any;

}
const PublicMiddleware = async (context: any, option: option = {}) => {

	const { _jwtToken, _user } = nextCookie(context);

	if (_jwtToken) {
		return redirect(context, "/admin");
	}

	let props: any = { _user: _user || "", };

	if (option.callback) {
		let headers: any = { "Content-Type": "application/json" };

		const pageData = await option.callback({
			...context.query,
			headers: headers,
		});
		props = { ...props, ...pageData };
	}

	return {
		props
	};

};

export default PublicMiddleware;
