import { useEffect } from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductDetails } from "@/components/product/ProductDetails";
import { StickyMobileBar } from "@/components/product/StickyMobileBar";
import { getProductBySlug, getCollectionBySlug } from "@/data/products";
import { quizResults } from "@/data/quiz";
import { SEO } from "@/hooks/useSEO";
import { trackEvent } from "@/lib/analytics";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || "");
  const collection = product ? getCollectionBySlug(product.collection) : null;
  const matchedIdentity = collection ? quizResults.find((r) => r.collectionSlug === collection.slug) : null;

  const [selectedVariant] = useState(product?.variants[0]?.id || "");

  // Track product view
  useEffect(() => {
    if (product) {
      trackEvent({
        event: "view_product",
        productId: product.id,
        productName: product.name,
        price: product.price,
        collection: collection?.name,
      });
    }
  }, [product?.id]);

  if (!product) {
    return (
      <Layout>
        <div className="container-wide py-20 text-center">
          <h1 className="font-serif text-3xl mb-4">Product Not Found</h1>
          <Link to="/" className="text-accent hover:underline">Return to Home</Link>
        </div>
      </Layout>
    );
  }

  const currentVariant = product.variants.find((v) => v.id === selectedVariant) || product.variants[0];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://mugsmith.lovable.app" },
      ...(collection ? [{ "@type": "ListItem", position: 2, name: collection.name, item: `https://mugsmith.lovable.app/collections/${collection.slug}` }] : []),
      { "@type": "ListItem", position: collection ? 3 : 2, name: product.name, item: `https://mugsmith.lovable.app/product/${product.slug}` },
    ],
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images?.[0] || "",
    brand: { "@type": "Brand", name: "Mugsmith" },
    url: `https://mugsmith.lovable.app/product/${product.slug}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: currentVariant.price,
      availability: "https://schema.org/InStock",
      url: `https://mugsmith.lovable.app/product/${product.slug}`,
    },
  };

  const structuredData = [breadcrumbSchema, productSchema];

  return (
    <Layout>
      <SEO
        title={`${product.name} — ${collection?.name || 'Mugsmith'} Collection`}
        description={product.description}
        keywords={`${product.name}, ceramic mug, designer mug, ${collection?.name || ''} collection`}
        url={`/product/${product.slug}`}
        type="product"
        structuredData={structuredData}
      />

      <div className="container-wide py-8 md:py-12">
        <nav className="mb-6 text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li>/</li>
            {collection && (
              <>
                <li><Link to={`/collections/${collection.slug}`} className="hover:text-foreground transition-colors">{collection.name}</Link></li>
                <li>/</li>
              </>
            )}
            <li className="text-foreground">{product.name}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
          <ProductGallery name={product.name} badge={product.badge} images={product.images} />
          <ProductInfo product={product} collection={collection} matchedIdentity={matchedIdentity} />
        </div>

        <div className="mt-16 pt-16 border-t border-border max-w-4xl mx-auto">
          <ProductDetails product={product} collection={collection} matchedIdentity={matchedIdentity} />
        </div>
      </div>

      <StickyMobileBar product={product} variantId={selectedVariant} />
    </Layout>
  );
}
