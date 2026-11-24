import { describe, expectTypeOf, it } from "vitest";
import type {
  ApiEmailTemplateContent,
  ApiEmailTemplateGet,
  ApiEmailTemplatePut,
  ApiEmailTemplateText,
  EmailTemplateSaveErrorCode,
} from "../..";
import { EmailTemplateLayout, Lang } from "../..";

describe("email template contract", () => {
  it("narrows the content by layout", () => {
    const describeContent = (template: ApiEmailTemplateContent) =>
      template.layout === EmailTemplateLayout.SINGLE
        ? template.content
        : template.content[Lang.DE];
    expectTypeOf(describeContent).returns.toEqualTypeOf<ApiEmailTemplateText>();
  });

  it("needs every language in a per-language template", () => {
    expectTypeOf<{
      layout: EmailTemplateLayout.PER_LANGUAGE;
      content: { de: ApiEmailTemplateText };
    }>().not.toExtend<ApiEmailTemplateContent>();
  });

  it("stores plain text only", () => {
    expectTypeOf<ApiEmailTemplateText>().not.toHaveProperty("html");
  });

  it("sends back the version it was read at", () => {
    expectTypeOf<ApiEmailTemplatePut["version"]>().toEqualTypeOf<
      ApiEmailTemplateGet["version"]
    >();
  });

  it("names the save errors fe shows inline", () => {
    expectTypeOf<
      "missing_placeholder" | "unknown_placeholder" | "version_conflict"
    >().toExtend<EmailTemplateSaveErrorCode>();
  });
});
