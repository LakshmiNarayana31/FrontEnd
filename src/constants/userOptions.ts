export const GENDER_OPTIONS = [
  { label: "Male",   value: "Male"   },
  { label: "Female", value: "Female" },
  { label: "Other",  value: "Other"  },
] as const;

export const STATUS_OPTIONS = [
  { label: "Active",   value: "Active"   },
  { label: "Inactive", value: "Inactive" },
] as const;

export const DEPARTMENT_OPTIONS = [
  { label: "Engineering", value: "Engineering" },
  { label: "Marketing",   value: "Marketing"   },
  { label: "Sales",       value: "Sales"       },
  { label: "HR",          value: "HR"          },
  { label: "Finance",     value: "Finance"     },
] as const;

export const ROLE_OPTIONS = [
  { label: "Admin",   value: "Admin"   },
  { label: "Manager", value: "Manager" },
  { label: "User",    value: "User"    },
  { label: "Viewer",  value: "Viewer"  },
] as const;

export const COUNTRY_OPTIONS = [
  { label: "USA",       value: "USA"       },
  { label: "UK",        value: "UK"        },
  { label: "India",     value: "India"     },
  { label: "Canada",    value: "Canada"    },
  { label: "Australia", value: "Australia" },
] as const;

export const CREATED_AT_OPTIONS = [
  { label: "Last 30 days",  value: "30"  },
  { label: "Last 90 days",  value: "90"  },
  { label: "Last 180 days", value: "180" },
  { label: "Last 365 days", value: "365" },
] as const;
