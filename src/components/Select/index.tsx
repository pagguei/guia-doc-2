'use client';
import { useMemo, useState, useEffect } from 'react';
import * as RSelect from '@radix-ui/react-select';
import {
    Trigger, Value, Icon, Content, Viewport,
    Item, ItemText, ItemIndicator, ScrollButton,
    Separator, CaretSvg, SearchWrap, SearchInput, Empty
} from './styles';

type Option = { label: string; value: string; disabled?: boolean };
type Group =
    | { label?: never; options: Option[] }
    | { label: string; options: Option[] };

type Props = {
    options: Option[] | Group[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    id?: string;
    name?: string;
    'aria-label'?: string;

    /** novo */
    searchable?: boolean;
    searchPlaceholder?: string;
};

function normalize(s: string) {
    return s
        .toLocaleLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '');
}

export default function Select({
    options,
    value,
    onChange,
    placeholder = 'Selecione…',
    disabled,
    searchable = false,
    searchPlaceholder = 'Pesquisar…',
    ...a11y
}: Props) {
    const [open, setOpen] = useState(false);
    const [q, setQ] = useState('');



    // normaliza para grupos
    const groups: Group[] = Array.isArray(options) && 'options' in (options[0] || {})
        ? (options as Group[])
        : [{ options: options as Option[] }];



    // filtra por label (case/acentos-insensitive)
    const filtered = useMemo(() => {
        if (!searchable || !q.trim()) return groups;
        const nq = normalize(q);
        return groups
            .map(g => ({
                ...g,
                options: g.options.filter(o => normalize(o.label).includes(nq)),
            }))
            .filter(g => g.options.length > 0 || g.label); // mantém grupos com título mesmo se vazios? aqui removemos vazios.
    }, [groups, q, searchable]);


    // quando abre, zera busca e foca o input
    useEffect(() => {
        if (open) setQ('');
    }, [open]);

    return (
        <div suppressHydrationWarning>
            <RSelect.Root value={value} onValueChange={onChange} disabled={disabled} open={open} onOpenChange={setOpen}>
                <Trigger {...a11y}>
                    <Value placeholder={placeholder} />
                    <Icon><CaretSvg /></Icon>
                </Trigger>

                <RSelect.Portal>
                    <Content position="popper" sideOffset={4} align="start" collisionPadding={{ top: 12, bottom: 12 }}>
                        {searchable && (
                            <SearchWrap
                                // evita que teclas de busca sejam capturadas pelo typeahead do Radix
                                onKeyDown={(e) => e.stopPropagation()}
                                onPointerDown={(e) => e.stopPropagation()}
                            >
                                <SearchInput
                                    placeholder={searchPlaceholder}
                                    value={q}
                                    onChange={(e) => setQ(e.target.value)}
                                    autoFocus
                                />
                            </SearchWrap>
                        )}

                        <RSelect.ScrollUpButton asChild>
                            <ScrollButton>▲</ScrollButton>
                        </RSelect.ScrollUpButton>

                        <Viewport>
                            {filtered.length === 0 ? (
                                <Empty>Nenhum resultado</Empty>
                            ) : (
                                filtered.map((g, gi) => (
                                    <div key={gi}>
                                        {g.label && (
                                            <div style={{ fontSize: 12, color: '#64748b', padding: '6px 10px' }}>{g.label}</div>
                                        )}
                                        {g.options.map(opt => (
                                            <Item key={opt.value} value={opt.value} disabled={opt.disabled}>
                                                <ItemIndicator>✓</ItemIndicator>
                                                <ItemText>{opt.label}</ItemText>
                                            </Item>
                                        ))}
                                        {gi < filtered.length - 1 && <Separator />}
                                    </div>
                                ))
                            )}
                        </Viewport>

                        <RSelect.ScrollDownButton asChild>
                            <ScrollButton>▼</ScrollButton>
                        </RSelect.ScrollDownButton>
                    </Content>
                </RSelect.Portal>
            </RSelect.Root>
        </div>
    );
}
