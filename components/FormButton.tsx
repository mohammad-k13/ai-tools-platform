import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
import { useFormStatus } from "react-dom";

const FormButton = ({value}: {value: string}) => {
	const { pending } = useFormStatus();

	return (
		<Button size="md" color={"primary"} type="submit" disabled={pending} disableAnimation={pending} onClick={() => navigator.vibrate(200)}>
			{pending ? (
				<div className="flex items-center gap-3 ">
					<Spinner size="sm" color="default" />
				</div>
			) : (
				<p>{value}</p>
			)}
		</Button>
	);
};

export default FormButton;