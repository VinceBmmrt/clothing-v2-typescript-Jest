import ProductCard from "../product-card/product-card.component";

import {
  CategoryPreviewContainer,
  Preview,
  Title,
} from "./category-preview.styles";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface CategoryPreviewProps {
  title: string;
  products: Product[];
}

const CategoryPreview: React.FC<CategoryPreviewProps> = ({
  title,
  products,
}) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <Title to={title}>{title.toUpperCase()}</Title>
      </h2>
      <Preview>
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
