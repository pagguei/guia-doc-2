'use client';
import { Mask, Help, Error } from './styles';

type Props = Omit<React.ComponentProps<typeof Mask>, 'onAccept' | 'value'> & {
    /** ex.: "000.000.000-00", "00000-000", "(00) 00000-0000" */
    mask: any;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    help?: string;
};

export default function MaskedField({ mask, value, onChange, error, help, ...rest }: Props) {
    return (
        <div>
            <Mask
                $invalid={!!error}
                mask={mask}
                value={value}
                // onAccept dispara em cada mudança com o valor já mascarado
                onAccept={(v: unknown) => onChange(String(v ?? ''))}
                {...rest}
            />
            {error ? <Error>{error}</Error> : help ? <Help>{help}</Help> : null}
        </div>
    );
}
