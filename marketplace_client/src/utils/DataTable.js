export const customStyles = {
  table: {
    style: {
      overflow: "hidden",
    },
  },
  headRow: {
    style: {
      borderTopLeftRadius: "0.5rem",
      borderTopRightRadius: "0.5rem",
      backgroundColor: "#f9fafb",
    },
  },
  headCells: {
    style: {
      paddingLeft: "16px",
      paddingRight: "16px",
      color: "#6b7280",
      fontSize: "0.75rem",
      fontWeight: "600",
      textTransform: "uppercase",
    },
  },
  rows: {
    style: {
      fontSize: "0.875rem",
      fontWeight: "500",
      color: "#111827",
      backgroundColor: "white",
      "&:not(:last-of-type)": {
        borderBottomStyle: "solid",
        borderBottomWidth: "1px",
        borderBottomColor: "#e5e7eb",
      },
    },
    highlightOnHoverStyle: {
      backgroundColor: "#f9fafb",
      transitionDuration: "0.15s",
      transitionProperty: "background-color",
      outlineStyle: "solid",
      outlineWidth: "1px",
      outlineColor: "#e5e7eb",
    },
  },
  cells: {
    style: {
      paddingLeft: "16px",
      paddingRight: "16px",
    },
  },
};
