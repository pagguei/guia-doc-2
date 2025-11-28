'use client';
import * as Popover from '@radix-ui/react-popover';
import { ptBR } from 'date-fns/locale';
import { format, parse, isValid } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useMemo } from 'react';
import { Wrap, InputButton, Content, CalendarWrap } from './styles';

type Props = {
    value: string;                        // formato "DD/MM/AAAA"
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    fromYear?: number;
    toYear?: number;
};

function parseStr(str: string) {
    const d = parse(str, 'dd/MM/yyyy', new Date());
    return isValid(d) ? d : undefined;
}

export default function DateField({
    value,
    onChange,
    placeholder = 'DD/MM/AAAA',
    disabled,
    fromYear = 1900,
    toYear = new Date().getFullYear(),
}: Props) {
    const date = useMemo(() => parseStr(value || ''), [value]);

    const handleSelect = (d?: Date) => {
        if (!d) return;
        onChange(format(d, 'dd/MM/yyyy'));
    };

    return (
        <Wrap>
            <Popover.Root>
                <InputButton disabled={disabled}>
                    {value || placeholder}
                </InputButton>
                <Popover.Portal>
                    <Content side="bottom" align="start" sideOffset={6} collisionPadding={8}>
                        <CalendarWrap>
                            <DayPicker
                                mode="single"
                                selected={date}
                                onSelect={handleSelect}
                                locale={ptBR}
                                captionLayout="dropdown"
                                fromYear={fromYear}
                                toYear={toYear}
                            />

                        </CalendarWrap>
                    </Content>
                </Popover.Portal>
            </Popover.Root>
        </Wrap>
    );
}
