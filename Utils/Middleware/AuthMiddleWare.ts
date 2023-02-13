import redirect from "helpers/redirect.helpers";
import {EnumAdminUserTypes} from "Utils/Enums/UserType";
import nextCookie from "next-cookies";

type option = {
	Permission?: EnumAdminUserTypes[] | false,
	callback?:any;

}
const AuthMiddleware = async (context: any, option: option = {
	Permission: false
}) => {

  const { _jwtToken, _user } = nextCookie(context);

	if (!_jwtToken) {
		return redirect(context, "/login");
	}

	let props: any = {
    _user: _user || "",
	};

	// if (option.Permission && !accessCheck(option.Permission, <EnumAdminUserTypes>_adminUserType)) {
	// 	props.isPermit = false;
	// 	props._errors = {
	// 		errorCode: 404,
	// 		message: "Permission denied",
	// 	};
	// } else {
	// 	if (option.callback) {
	// 		let headers: any = { "Content-Type": "application/json" };
	// 		if (isLoggedIn) {
	// 			headers["Authorization"] = `bearer ${token}`;
	// 		}
	// 		const pageData = await option.callback({
	// 			...context.query,
	// 			headers: headers,
	// 		});
	// 		props = { ...props, ...pageData };
	// 	}
	// }

	return {
		props
	};

};

export default AuthMiddleware;
