type Props = {
  title: string;
  description: string;
  onClick: () => void;
};

export default function SectionCard({ title, description, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: 20,
        cursor: "pointer",
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        transition: "transform .15s",
      }}
    >
      <h3 style={{ fontSize: 18 }}>{title}</h3>
      <p style={{ marginTop: 6, color: "#555" }}>{description}</p>
    </div>
  );
}
