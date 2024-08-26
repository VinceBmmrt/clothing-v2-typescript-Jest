import { SpinnerContainer, SpinnerOverlay } from "./spinner.styles";

const Spinner = () => (
  //@ts-ignore
  <SpinnerOverlay data-testid="spinner">
    <SpinnerContainer />
  </SpinnerOverlay>
);

export default Spinner;
