interface Props {
  cardKey: string;
}

export default function CardKey({ cardKey }: Props) {
  return <p className="text-xs text-gray-500">{cardKey}</p>;
}
