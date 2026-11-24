import { describe, expect, expectTypeOf, it } from "vitest";
import {
  Endpoint,
  EmailTemplateName,
  Lang,
  type ApiAdminEmailTemplateError,
  type ApiAdminEmailTemplateGet,
  type ApiAdminEmailTemplateListGet,
  type ApiAdminEmailTemplatePut,
  type ApiAdminEmailTemplatePutResponse,
  type EmailTemplateManifest,
} from "../..";

describe("admin email template contract", () => {
  it("exports the endpoint and all 17 CDN names", () => {
    expect(Endpoint.ADMIN_EMAIL_TEMPLATE).toBe("/admin/email-template");
    expect(Object.values(EmailTemplateName).sort()).toEqual([
      "accompanymatch",
      "accompanymatchvolunteer",
      "accompanynotfound",
      "cgcapplication",
      "checkup",
      "confirmation",
      "confirmationaccompanying",
      "introduction",
      "password-reset",
      "registration",
      "stale",
      "suggestion",
      "suggestion-request",
      "suggestionaccompanying",
      "tagged",
      "update",
      "verification",
    ]);
    expectTypeOf<ApiAdminEmailTemplateListGet>().toEqualTypeOf<
      EmailTemplateName[]
    >();
  });

  it("accepts flat and localized manifests without changing their shape", () => {
    expectTypeOf<{
      subject: string;
      text: string;
    }>().toExtend<EmailTemplateManifest>();
    expectTypeOf<{
      subject: string;
      html: string;
    }>().toExtend<EmailTemplateManifest>();
    expectTypeOf<{
      [Lang.EN]: { subject: string; text: string; html: string };
      [Lang.DE]: { subject: string; text: string };
    }>().toExtend<EmailTemplateManifest>();
    expectTypeOf<{
      [Lang.DE]: { subject: string; text: string; labels: { someone: string } };
    }>().toExtend<EmailTemplateManifest>();
    expectTypeOf<{}>().not.toExtend<EmailTemplateManifest>();
    expectTypeOf<{ subject: string }>().not.toExtend<EmailTemplateManifest>();
    expectTypeOf<{
      subject: string;
      text: string;
      [Lang.EN]: { subject: string; text: string };
    }>().not.toExtend<EmailTemplateManifest>();
  });

  it("supplies per-variant placeholder metadata without requiring it on PUT", () => {
    const detail: ApiAdminEmailTemplateGet = {
      name: EmailTemplateName.SUGGESTION,
      manifest: {
        subject: "Opportunity",
        text: "{{ opportunityName.en }} / {{ opportunityName.de }}",
      },
      allowedPlaceholders: [
        {
          language: null,
          placeholders: [
            {
              name: "opportunityName.en",
              allowedIn: ["subject", "text"],
              required: true,
              requiredIn: [],
            },
            {
              name: "emailNote",
              allowedIn: ["text"],
              required: false,
              requiredIn: [],
            },
          ],
        },
      ],
    };
    const update: ApiAdminEmailTemplatePut = { manifest: detail.manifest };
    expect(update.manifest).toEqual(detail.manifest);
    expectTypeOf<ApiAdminEmailTemplatePut>().not.toHaveProperty(
      "allowedPlaceholders",
    );
  });

  it("describes validation errors and cache propagation", () => {
    const error: ApiAdminEmailTemplateError = {
      code: "invalid-placeholders",
      message: "Invalid placeholder",
      errors: [
        {
          code: "missing-placeholder",
          name: "resetUrl",
          language: Lang.DE,
          field: "html",
        },
        {
          code: "unknown-placeholder",
          name: "unknown",
          language: Lang.EN,
          field: "text",
        },
      ],
    };
    expect(error.errors).toHaveLength(2);
    expectTypeOf<ApiAdminEmailTemplatePutResponse["cachePropagationSeconds"]>()
      .toEqualTypeOf<number>();
  });

  it("round-trips localized labels and distinguishes text and HTML requirements", () => {
    const manifest: EmailTemplateManifest = {
      [Lang.EN]: {
        subject: "Account",
        text: "{{ link }}",
        html: "<p>{{ link }}</p>",
        labels: { noName: "there" },
      },
      [Lang.DE]: {
        subject: "Konto",
        text: "{{ link }}",
        html: "<p>{{ link }}</p>",
        labels: { noName: "zusammen" },
      },
    };
    const detail: ApiAdminEmailTemplateGet = {
      name: EmailTemplateName.TAGGED,
      manifest,
      allowedPlaceholders: [Lang.EN, Lang.DE].map((language) => ({
        language,
        placeholders: [
          {
            name: "link",
            allowedIn: ["text", "html"],
            required: true,
            requiredIn: ["text", "html"],
          },
        ],
      })),
    };
    const update: ApiAdminEmailTemplatePut = { manifest: detail.manifest };
    expect(JSON.parse(JSON.stringify(update)).manifest).toEqual(manifest);
    expect(detail.allowedPlaceholders.map(({ language }) => language)).toEqual([
      Lang.EN,
      Lang.DE,
    ]);
  });
});
