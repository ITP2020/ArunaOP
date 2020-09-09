import React, {Component} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


import Grid from '@material-ui/core/Grid';



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '345px',
    maxHeight : '450px',
    padding : '20px',
    borderRadius : '5px',
    
  },
  
  


  root1: {
    flexGrow: 1,
    padding : '50px',
    backgroundColor: '#f409090d',
    
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor : 'red',
  },

 


}));

export default function ImgMediaCard() {
  const classes = useStyles();

  return (
    <div className={classes.root1}>
      <Grid container spacing={3}>

        <Grid item xs={3}>
          
          <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Order Management System"
          height="240px"
          image="https://cdn.richtabor.com/wp-content/uploads/2017/09/designing-868x621.jpg"
          title="Order Management System" 
        />

        <Button>
        <CardContent>
          <CardActions>
          <Typography gutterBottom variant="h6" component="h2">
            Order Management System 
          </Typography>
         </CardActions>
        </CardContent>
        </Button>

      </CardActionArea>
    </Card>
        </Grid>

        <Grid item xs={3}>
        <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Delivery Management System"
          height="240px"
          image="https://www.parcelpeople.co.uk/wp-content/uploads/2020/01/delivery-driver-with-face-mask-1.jpg"
          title="Delivery Management System" 
        />

        <Button>
        <CardContent>
          <CardActions>
          <Typography gutterBottom variant="h6" component="h2">
            Delivery Management System 
          </Typography>
         
         </CardActions>
        </CardContent>
        </Button>

      </CardActionArea>
    </Card>
        </Grid>

        <Grid item xs={3}>
        <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Stock Management System"
          height="240px"
          image="https://www.hoteldeskhms.com/img/features/feat_inventory.jpg"
          title="Stock Management System" 
        />
        <Button>
        <CardContent>
          <CardActions>
          <Typography gutterBottom variant="h6" component="h2">
            Stock Management System 
          </Typography>
         </CardActions>
        </CardContent>
        </Button>

      </CardActionArea>
    </Card>
        </Grid>

        <Grid item xs={3}>
        <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Equipment Management System"
          height="240px"
          image="https://thumbs.dreamstime.com/b/printing-house-equipment-printer-plotter-offset-cutting-machines-people-workers-industrial-polygraphy-isometric-printing-house-131987002.jpg"
          title="Equipment Management System" 
        />
<Button>
        <CardContent>
          <CardActions>
          <Typography gutterBottom variant="h6" component="h2">
            Equipment Management System 
          </Typography>
          
         </CardActions>
        </CardContent>
        </Button>
      </CardActionArea>
    </Card>
        </Grid>

        <Grid item xs={3}>
        <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Supply Management System"
          height="240px"
          image="https://thumbs.dreamstime.com/b/supply-chain-management-concept-vector-illustration-global-distribution-international-cargo-freight-company-logistics-operations-165680621.jpg"
          title="Supply Management System" 
        />
        <Button>
        <CardContent>
          <CardActions>
          <Typography gutterBottom variant="h6" component="h2">
            Supply Management System 
          </Typography>
         </CardActions>
        </CardContent>
        </Button>

      </CardActionArea>
    </Card>
        </Grid>

        <Grid item xs={3}>
        <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Employee Management System"
          height="240px"
          image="https://www.excelityglobal.com/themes/chocolate/assets/img/slider/casestudy-leavemanagment-banner.jpg"
          title="Employee Management System" 
        />

      <Button>
        <CardContent>
          <CardActions>
          <Typography gutterBottom variant="h6" component="h2">
            Employee Management System 
          </Typography>
         </CardActions>
        </CardContent>
        </Button>

      </CardActionArea>
    </Card>
        </Grid>

        <Grid item xs={3}>
        <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Leave & Salary Management System"
          height="207px"
          image="https://d6jxgaftxvagq.cloudfront.net/Pictures/2000x2000fit/0/6/9/11069_paycuts_72605.jpg"
          title="Leave & Salary Management System" 
        />
        <Button>
        <CardContent>
          <CardActions>
          <Typography gutterBottom variant="h6" component="h2">
            Leave & Salary Management System 
          </Typography>
         </CardActions>
        </CardContent>
        </Button>

      </CardActionArea>
    </Card>
        </Grid>

        <Grid item xs={3}>
        <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Finance Management System"
          height="240px"
          image="https://sfmagazine.com/wp-content/uploads/2015/02/3tech_practices-625x395.jpg"
          title="Finance Management System" 
        />
        <Button>
        <CardContent>
          <CardActions>
          <Typography gutterBottom variant="h6" component="h2">
            Finance Management System 
          </Typography>
         </CardActions>
        </CardContent>
        </Button>

      </CardActionArea>
    </Card>
        </Grid>
        
      </Grid>
    </div>

    

    
  );

  
}
