type ActionStateErrorType = {
	isInfoError: true;
	info: {
		username?: string[];
		email?: string[];
		password?: string[];
	};
};

type ActionStateNotErrorType = {
	isInfoError: false;
	info: {
		username?: string;
		email: string;
		password: string;
	};
};

export type FormActionStateType = ActionStateErrorType | ActionStateNotErrorType ;
