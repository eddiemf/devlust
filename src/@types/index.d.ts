declare type FluidObject = import('gatsby-image').FluidObject;
declare type FixedObject = import('gatsby-image').FixedObject;

type Post = {
  html: string;
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  image: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
  thumbnail: {
    childImageSharp: {
      fixed: FixedObject;
    };
  };
};
