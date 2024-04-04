import attributes from './attributes.json';
import { StoryWrapper } from '../StoryWrapper/StoryWrapper';
import { NavbarNested } from './NavbarNested';

export default { title: 'NavbarNested' };

export function Usage() {
  return <StoryWrapper attributes={attributes} component={NavbarNested} />;
}
