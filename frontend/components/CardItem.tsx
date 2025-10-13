import Image from "next/image";
import Link from "next/link";

type CardItemProps = {
  id: number;
  title: string;
  price: number;
  image_url: string;
};

export default function CardItem({
  id,
  title,
  price,
  image_url,
}: CardItemProps) {
  
  return (
    <div className="border rounded p-4 flex flex-col items-center">
      <Image
        src={image_url}
        alt={title}
        width={128}
        height={128}
        className="w-32 h-32 object-cover mb-2"
      />
      <h3 className="font-bold text-lg">{title}</h3>
      <span className="text-green-600 font-semibold">R$ {price}</span>
      <Link href={`/products/${id}`}>
        <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded">
          Ver detalhes
        </button>
      </Link>
    </div>
  );
}
