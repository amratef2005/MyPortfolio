import type { ConfirmActionState } from '@shared/ui/ConfirmActionModal';

export type RequestConfirmFn = (opts: Omit<ConfirmActionState, 'isOpen'>) => void;
