export const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
    backgroundColor: 'transparent',
  },
});
