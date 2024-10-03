import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import React, { memo } from "react";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import AuthInfo from "../../components/auth-info";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import ProfileCard from "../../components/profile-card";

function Profile() {
  const store = useStore();


  useInit(() => {
    store.actions.profile.load();
  }, []);

  const select = useSelector(state => ({
    user: state.profile.data,
    waiting: state.profile.waiting,
  }));

  const { t } = useTranslate();
  return (
    <PageLayout>
      <AuthInfo />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ProfileCard user={select.user} t={t} />
      </Spinner>
    </PageLayout>
  );
};

export default memo(Profile);
