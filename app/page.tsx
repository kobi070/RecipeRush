
import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="gradient_pink text-center"> Diffrent Recipes </span>
      </h1>
      <p className="desc text-center">
        Recipe Rush is an open-source Recipe sharing tool for modern world to
        discoverm create and share creative recipes
      </p>

      {/* Feed components - TODO  */}
      <Feed />
    </section>
  );
};

export default Home;
