# Cleaning Sample Output

The loader applies the same `clean_text()` function to every format after extraction.

## Before

```text
Acme Support | Home | Contact
Page 1 of 2
Acme support policy
Annual plans can be refunded within 30 days.  Refunds  â€™  return to the original payment method.
Page 2 of 2
Acme Support | Home | Contact
```

## After

```text
Acme support policy

Annual plans can be refunded within 30 days. Refunds ' return to the original payment method.
```

## Sample Run

```text
Loaded faq.html: 50 characters; before: Support FAQ Support Portal | Help | Contact Support FAQ Customers can ask for a refund within thirty days. Support Porta; after: Customers can ask for a refund within thirty days.
Loaded onboarding.md: 120 characters; before: Support Portal | Help | Contact # Support onboarding Use the account email to locate a customer record. Page 1 of 1 Esca; after: # Support onboarding Use the account email to locate a customer record. Escalate payment disputes to the billing team.
Loaded policy.txt: 114 characters; before: Acme Support | Home | Contact Page 1 of 2 Acme support policy Annual plans can be refunded within 30 days. Refunds â€™ r; after: Acme support policy Annual plans can be refunded within 30 days. Refunds ' return to the original payment method.
Loaded 3 document(s).
```