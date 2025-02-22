import React from 'react';

import { renderHook } from '@testing-library/react-hooks';
import { DayPickerProps } from 'DayPicker';

import { FocusContext, FocusContextValue } from 'contexts/Focus';
import { RootProvider } from 'contexts/RootProvider';
import {
  SelectMultipleContext,
  SelectMultipleContextValue
} from 'contexts/SelectMultiple';
import {
  SelectRangeContext,
  SelectRangeContextValue
} from 'contexts/SelectRange';
import {
  SelectSingleContext,
  SelectSingleContextValue
} from 'contexts/SelectSingle';

const EmptyComponent = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

/** Render a hook wrapped with the Root Provider. */
export function customRenderHook<
  TProps extends { children?: React.ReactNode },
  TResult
>(
  callback: (props?: TProps) => TResult,
  /** The props passed to DayPicker. */
  dayPickerProps?: DayPickerProps,
  /** Override the single contexts. */
  contexts?: {
    single?: SelectSingleContextValue;
    multiple?: SelectMultipleContextValue;
    range?: SelectRangeContextValue;
    focus?: FocusContextValue;
  }
) {
  const wrapper = ({ children }: { children?: React.ReactNode }) => {
    const SelectSingleProvider = contexts?.single
      ? SelectSingleContext.Provider
      : EmptyComponent;
    const SelectMultipleProvider = contexts?.single
      ? SelectMultipleContext.Provider
      : EmptyComponent;
    const SelectRangeProvider = contexts?.single
      ? SelectRangeContext.Provider
      : EmptyComponent;
    const FocusProvider = contexts?.single
      ? FocusContext.Provider
      : EmptyComponent;
    return (
      <RootProvider {...dayPickerProps}>
        <SelectSingleProvider value={contexts?.single}>
          <SelectMultipleProvider value={contexts?.multiple}>
            <SelectRangeProvider value={contexts?.range}>
              <FocusProvider value={contexts?.focus}>{children}</FocusProvider>
            </SelectRangeProvider>
          </SelectMultipleProvider>
        </SelectSingleProvider>
      </RootProvider>
    );
  };

  return renderHook<TProps, TResult>(callback, { wrapper });
}
