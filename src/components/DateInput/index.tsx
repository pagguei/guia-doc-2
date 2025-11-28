'use client';
import * as Popover from '@radix-ui/react-popover';
import { DayPicker } from 'react-day-picker';
import { format, parse, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useMemo, useState } from 'react';
import { Wrap, Mask, IconBtn, CalendarIcon, Content, CalendarWrap } from './styles';

import 'react-day-picker/dist/style.css';

type Props = {
    /** valor controlado em "DD/MM/AAAA" */
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    error?: string;
    fromYear?: number;
    toYear?: number;
};

function parseStr(s: string) {
    const d = parse(s, 'dd/MM/yyyy', new Date());
    return isValid(d) ? d : undefined;
}

export default function DateInput({
    value,
    onChange,
    placeholder = 'DD/MM/AAAA',
    disabled,
    error,
    fromYear = 1900,
    toYear = new Date().getFullYear(),
}: Props) {
    const [open, setOpen] = useState(false);
    const date = useMemo(() => parseStr(value || ''), [value]);

    const selectDay = (d?: Date) => {
        if (!d) return;
        onChange(format(d, 'dd/MM/yyyy'));
        setOpen(false);
    };

    return (
        <Wrap>
            <Mask
                $invalid={!!error}
                mask="00/00/0000"
                placeholder={placeholder}
                inputMode="numeric"
                value={value}
                onAccept={(v) => onChange(String(v ?? ''))}
                disabled={disabled}
            />


            {/* botão que abre o calendário */}
            <Popover.Root open={open} onOpenChange={setOpen}>
                <IconBtn aria-label="Abrir calendário">
                    <CalendarIcon />
                </IconBtn>
                <Popover.Portal>
                    <Content
                        side="bottom"
                        align="start"
                        sideOffset={6}
                        collisionPadding={{ top: 12, bottom: 12 }}
                    >
                        <CalendarWrap>
                            <DayPicker
                                mode="single"
                                selected={date}
                                onSelect={selectDay}
                                locale={ptBR}
                                captionLayout="dropdown"     // mês/ano em dropdown
                                fromYear={fromYear}
                                toYear={toYear}
                                disabled={{ after: new Date() }}  // bloqueia futuro
                                showOutsideDays
                            />
                        </CalendarWrap>
                    </Content>
                </Popover.Portal>

            </Popover.Root>
        </Wrap>
    );
}
