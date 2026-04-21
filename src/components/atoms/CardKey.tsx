interface Props {
  cardId: number;
}

export default function CardKey({ cardId }: Props) {
  return <p className="text-xs text-gray-500">BOARD-{cardId}</p>;
}
