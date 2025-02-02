/* eslint-disable @typescript-eslint/consistent-type-imports */

type TComponentPropsWithRef<Component> = import("react").ComponentProps<Component> & {
  ref?: import("react").Ref<Element>;
};

type THTMLElementPropsWithRef<Element> = import("react").HTMLAttributes<Element> & {
  ref?: import("react").Ref<Element>;
};
