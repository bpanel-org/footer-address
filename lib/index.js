import { Text, widgetCreator } from '@bpanel/bpanel-ui';

export const metadata = {
  name: '@bpanel/footer-address',
  description: 'Display most recent wallet address in the footer',
  author: 'bcoin-org'
};

export const mapComponentState = {
  Footer: (state, map) => Object.assign(map, { wallets: state.wallets })
};

export const decorateFooter = (Footer, { React, PropTypes }) => {
  return class extends React.PureComponent {
    constructor(props) {
      super(props);
    }
    static displayName() {
      return 'bpanelAddressFooter';
    }

    static get propTypes() {
      return {
        wallets: PropTypes.object,
        footerWidgets: PropTypes.arrayOf(PropTypes.func)
      };
    }

    render() {
      const { wallets, footerWidgets = [] } = this.props;
      let addrText = <Text type="span">...</Text>;
      if (wallets.accountInfo && wallets.accountInfo.primary) {
        addrText = (
          <Text type="condensed" copyIcon={true} prefix={4} suffix={4}>
            {wallets.accountInfo.primary.default.receiveAddress}
          </Text>
        );
      }

      const FooterAddress = () => (
        <div className="col-md-4 d-none d-md-block d-lg-block">
          <Text type="span" className="d-none d-lg-inline-block">
            Receive Address:{' '}
          </Text>
          {addrText}
        </div>
      );
      footerWidgets.push(widgetCreator(FooterAddress)());

      return <Footer {...this.props} footerWidgets={footerWidgets} />;
    }
  };
};
