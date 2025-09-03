import * as z from "zod";

const FIELD_DEFINITION_TYPES = [
  'keyword',
  'match_only_text',
  'long',
  'double',
  'date',
  'boolean',
  'ip',
];
export const NonEmptyString = z.string().min(1);
export const primitive = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.null(),
  z.undefined(),
]);
export const recursiveRecord = z.lazy(() =>
  z.record(z.string(), z.union([primitive, z.array(primitive), recursiveRecord]))
);

const schema = z.union([
  z.object({
    type: z.enum(FIELD_DEFINITION_TYPES),
    format: z.optional(NonEmptyString),
  }),
  // z.object({ type: z.string() }),
  recursiveRecord,
]);

const recordSchema = z.record(
  z.string().min(1),
  z.number()
);

const stringWithMinLength = z.string().min(1);
const undefinedType = z.undefined().optional();

console.log(JSON.stringify(z.toJSONSchema(undefinedType, {
  io: 'input',
  target: 'draft-7',
  unrepresentable: 'any',
  override: (ctx) => {
    // console.log(ctx.jsonSchema);
    if(ctx.jsonSchema.propertyNames) {
      delete ctx.jsonSchema.propertyNames;
    }
  },
}), null, ' '));
