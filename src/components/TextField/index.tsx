'use client';
import { Input, Wrap, Help, Error } from './styles';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    full?: boolean;
    error?: string;
    help?: string;
};

export default function TextField({ full = true, error, help, ...props }: Props) {
    return (
        <Wrap $full={full}>
            <Input $invalid={!!error} {...props} />
            {error ? <Error>{error}</Error> : help ? <Help>{help}</Help> : null}
        </Wrap>
    );
}
