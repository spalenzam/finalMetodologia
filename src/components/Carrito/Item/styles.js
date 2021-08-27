import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  media: {
    height: 250,
  },
  contenido: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  acciones: {
    justifyContent: 'space-between',
  },
  botones: {
    display: 'flex',
    alignItems: 'center',
  },
}));