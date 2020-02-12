import Adapter from "enzyme-adapter-react-16";
import chai from "chai";
import { configure as configureEnzyme } from "enzyme";
import createChaiEnzyme from "chai-enzyme";
import createChaiJestDiff from "chai-jest-diff";
import dirtyChai from "dirty-chai";
import chaiJestSnapshot from "chai-jest-snapshot";

chai
  .use(dirtyChai)
  .use(createChaiJestDiff())
  .use(createChaiEnzyme())
  .use(chaiJestSnapshot);

configureEnzyme({ adapter: new Adapter() });
