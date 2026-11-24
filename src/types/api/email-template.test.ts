import { describe, expectTypeOf, it } from "vitest";
import type {
  ApiEmailTemplateContent,
  ApiEmailTemplateGet,
  ApiEmailTemplatePut,
  ApiEmailTemplateSaveError,
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

  it("tells which layouts a template may be saved in", () => {
    expectTypeOf<ApiEmailTemplateGet["allowedLayouts"]>().toEqualTypeOf<
      EmailTemplateLayout[]
    >();
  });

  it("sends back the version it was read at", () => {
    expectTypeOf<ApiEmailTemplatePut["version"]>().toEqualTypeOf<
      ApiEmailTemplateGet["version"]
    >();
  });

  it("has exactly these save error codes", () => {
    expectTypeOf<EmailTemplateSaveErrorCode>().toEqualTypeOf<
      | "not_editable"
      | "version_conflict"
      | "layout_not_allowed"
      | "missing_placeholder"
      | "unknown_placeholder"
      | "blank_field"
      | "unknown_label"
    >();
  });

  it("points errors at subject, text or one label", () => {
    expectTypeOf<"labels">().not.toExtend<
      NonNullable<ApiEmailTemplateSaveError["fields"]>[number]
    >();
    expectTypeOf<"labels.someone">().toExtend<
      NonNullable<ApiEmailTemplateSaveError["fields"]>[number]
    >();
  });
});
