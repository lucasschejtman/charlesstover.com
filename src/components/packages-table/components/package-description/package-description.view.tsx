import { ReactElement, ReactNode } from 'react';
import PACKAGE_DESCRIPTIONS from '../../../../constants/package-descriptions';
import Paragraph from '../../components/package-description-paragraph';
import Item from '../../types/item';

export default function PackageDescription({
  packageName,
}: Item): null | ReactElement {
  const description: ReactNode | undefined = PACKAGE_DESCRIPTIONS.get(
    packageName,
  );

  if (typeof description === 'undefined') {
    return null;
  }

  if (Array.isArray(description)) {
    return (
      <>
        {description.map(
          (paragraph: ReactNode, index: number): ReactElement => {
            return <Paragraph key={index}>{paragraph}</Paragraph>;
          },
        )}
      </>
    );
  }

  return <Paragraph>{description}</Paragraph>;
}
