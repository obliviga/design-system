import React from 'react';
import { SvgIcon, IconCommonProps } from './SvgIcon';

const defaultProps = {
  className: '',
  title: 'Pdf',
  viewBox: '0 0 17 22',
};

export function PdfIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--pdf ${props.className || ''}`;

  return (
    <SvgIcon {...defaultProps} {...props} className={iconCssClasses}>
      <g>
        <path d="M11.07 6.875h6.07v14.094c0 .571-.478 1.031-1.072 1.031H1.071C.478 22 0 21.54 0 20.969V1.03C0 .46.478 0 1.071 0h8.927v5.844c0 .567.482 1.031 1.071 1.031zm5.757-2.363L12.453.3C12.253.107 11.98 0 11.694 0h-.268v5.5h5.714v-.262c0-.27-.112-.533-.313-.726z" />
        <path
          className="ds-c-icon--pdf__text"
          d="M6.057 12.778c0 .625-.184 1.107-.552 1.448-.369.34-.892.51-1.57.51h-.424v1.855H2V11h1.935c.706 0 1.236.154 1.59.463.355.308.532.747.532 1.315zm-2.546.727h.275c.227 0 .407-.064.541-.191.134-.128.2-.304.2-.528 0-.377-.208-.566-.626-.566h-.39v1.285zm8.183.172c0 .933-.257 1.652-.77 2.157-.514.504-1.236.757-2.167.757H6.948V11h1.935c.898 0 1.59.23 2.079.688.488.46.732 1.122.732 1.989zm-1.568.053c0-.512-.101-.892-.304-1.14-.202-.246-.51-.37-.923-.37h-.44v3.132h.336c.46 0 .796-.133 1.01-.4.214-.266.321-.673.321-1.222zm4.058 2.86h-1.488V11H16v1.212h-1.816v1.067h1.675v1.212h-1.675v2.1z"
        />
      </g>
    </SvgIcon>
  );
}
