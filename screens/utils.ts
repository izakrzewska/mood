export const forFade = ({ current }: any) => ({
  //TODO: add type
  cardStyle: {
    opacity: current.progress,
    backgroundColor: 'transparent',
  },
});
