import React from 'react';
import CloseButton from '../CloseButton/CloseButton';
import NativeDialog from '../NativeDialog/NativeDialog';
import classNames from 'classnames';
import useDialogAnalytics from './useDialogAnalytics';
import useId from '../utilities/useId';
import { useEffect, useLayoutEffect, useRef, DialogHTMLAttributes } from 'react';
import { t } from '../i18n';
import { AnalyticsOverrideProps } from '../analytics';

export type DialogSize = 'narrow' | 'wide' | 'full';

export interface BaseDialogProps extends AnalyticsOverrideProps {
  /**
   * Buttons or other HTML to be rendered in the "actions" bar
   * at the bottom of the dialog.
   */
  actions?: React.ReactNode;
  /**
   * Additional classes to be added to the actions container.
   */
  actionsClassName?: string;
  /**
   * If `true`, the modal will receive a role of `alertdialog`, instead of its
   * default `dialog`. The `alertdialog` role should only be used when an
   * alert, error, or warning occurs.
   */
  alert?: boolean;
  /**
   * Aria label for the close button
   */
  ariaCloseLabel?: string;
  /**
   * Pass `true` to have the dialog close when its backdrop pseudo-element is clicked
   */
  backdropClickExits?: boolean;
  children?: React.ReactNode;
  /**
   * Additional classes to be added to the root dialog element.
   */
  className?: string;
  /**
   * Additional classes to be added to the header, which wraps the heading and
   * close button.
   */
  headerClassName?: string;
  /**
   * The Dialog's heading, to be rendered in the header alongside the close button.
   */
  heading?: React.ReactNode;
  /**
   * A custom `id` attribute for the dialog element
   */
  id?: string;
  /**
   * This function is called after the modal opens
   */
  onEnter?(): void;
  /**
   * Called when the user triggers an exit event, like by clicking the close
   * button or pressing the ESC key. The parent of this component is
   * responsible for showing or not showing the dialog, so you need to use this
   * callback to make that happen. The dialog does not hide or remove itself.
   */
  onExit(event: React.MouseEvent | React.KeyboardEvent): void;
  /**
   * The Dialog's size parameter.
   */
  size?: DialogSize;
}

export type DialogProps = BaseDialogProps &
  Omit<DialogHTMLAttributes<HTMLElement>, keyof BaseDialogProps>;

/**
 * For information about how and when to use this component,
 * [refer to its full documentation page](https://design.cms.gov/components/modal-dialog/).
 */
export const Dialog = (props: DialogProps) => {
  const {
    actions,
    actionsClassName,
    alert,
    analytics,
    analyticsLabelOverride,
    analyticsEventTypeOverride,
    onAnalyticsEvent,
    ariaCloseLabel,
    children,
    className,
    headerClassName,
    heading,
    id,
    onEnter,
    onExit,
    size,
    ...modalProps
  } = props;

  const rootId = useId('dialog--', id);
  const headingRef = useDialogAnalytics(props);
  const headingId = `${rootId}__heading`;

  const dialogClassNames = classNames('ds-c-dialog', className, size && `ds-c-dialog--${size}`);
  const headerClassNames = classNames('ds-c-dialog__header', headerClassName);
  const actionsClassNames = classNames('ds-c-dialog__actions', actionsClassName);

  const containerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (onEnter) onEnter();
  }, []);

  // Set initial focus
  useEffect(() => {
    containerRef.current?.focus();
  }, [containerRef]);

  // Prevent scrolling the page behind the dialog. Needs to use useLayoutEffect
  // because we need to grab the window scroll position before the dialog renders
  // and messes it up.
  useLayoutEffect(() => {
    // https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/
    const y = window.scrollY ?? 0;
    const bodyClass = 'ds--dialog-open';
    document.body.classList.add(bodyClass);
    document.body.style.setProperty('--body_top--dialog-open', `-${y}px`);
    document.documentElement.style.setProperty('scroll-behavior', 'auto');
    return () => {
      document.body.classList.remove(bodyClass);
      window.scrollTo({ top: y, behavior: 'auto' });
      document.documentElement.style.removeProperty('scroll-behavior');
    };
  }, []);

  return (
    <NativeDialog
      className={dialogClassNames}
      showModal
      exit={onExit}
      {...modalProps}
      id={rootId}
      boundingBoxRef={containerRef}
    >
      <div
        className="ds-c-dialog__window"
        role="document"
        ref={containerRef}
        tabIndex={-1}
        aria-labelledby={headingId}
      >
        <header className={headerClassNames}>
          {heading && (
            <h1 className="ds-c-dialog__heading" id={headingId} ref={headingRef}>
              {heading}
            </h1>
          )}
          <CloseButton
            aria-label={ariaCloseLabel ?? t('dialog.ariaCloseLabel')}
            className="ds-c-dialog__close"
            id={`${rootId}__close`}
            onClick={onExit}
          />
        </header>
        <main role="main" className="ds-c-dialog__body">
          <div id="dialog-content">{children}</div>
          {actions && <div className={actionsClassNames}>{actions}</div>}
        </main>
      </div>
    </NativeDialog>
  );
};

export default Dialog;
