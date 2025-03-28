// src/subpages/poems/poem-components.ts
import Philosophy from './poem-content/philosophy';
import Philosophy2 from './poem-content/philosophy2';
import Deteriorating from './poem-content/deteriorating';
import Split from './poem-content/split';
import Obscurity from './poem-content/obscurity';
import Definition from './poem-content/definition';
import Narcissism from './poem-content/narcissism';
import Unattainable from './poem-content/unattainable';
import Darkness from './poem-content/darkness';

// Define the type for our poem components object.
// Each value is a React functional component.
export const PoemComponents: { [key: string]: React.FC } = {
  Deteriorating,
  Philosophy,
  Philosophy2,
  Split,
  Definition,
  Obscurity,
  Narcissism,
  Unattainable,
  Darkness,
};
