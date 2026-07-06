import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

const FIELD_CLASSES =
  "w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text placeholder:text-text-subtle focus:border-charcoal focus:outline-none disabled:opacity-60";

interface FieldWrapperProps {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}

/** Label + control + accessible inline error, used by all form fields. */
function FieldWrapper({ id, label, error, children }: FieldWrapperProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-charcoal mb-2 block text-sm font-medium"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 text-sm text-red-600"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
}

export function TextField({ id, label, error, ...props }: TextFieldProps) {
  return (
    <FieldWrapper id={id} label={label} error={error}>
      <input
        id={id}
        className={FIELD_CLASSES}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
    </FieldWrapper>
  );
}

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  error?: string;
}

export function TextAreaField({
  id,
  label,
  error,
  ...props
}: TextAreaFieldProps) {
  return (
    <FieldWrapper id={id} label={label} error={error}>
      <textarea
        id={id}
        className={`${FIELD_CLASSES} min-h-32 resize-y`}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
    </FieldWrapper>
  );
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function SelectField({
  id,
  label,
  error,
  options,
  ...props
}: SelectFieldProps) {
  return (
    <FieldWrapper id={id} label={label} error={error}>
      <select
        id={id}
        className={FIELD_CLASSES}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}
