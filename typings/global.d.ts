import { RouteComponentProps, StaticContext } from 'react-router';

export interface BStaticContext extends StaticContext {
  imageSuffix: string;
}

export type RouterProps = RouteComponentProps<{}, BStaticContext, {}>;
