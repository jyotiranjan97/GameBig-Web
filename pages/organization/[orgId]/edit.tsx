import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import HeaderOrg from '../../../components/Organization/HeaderOrg/HeaderOrg';
import OrganizationProfile from '../../../components/Organization/OrganizationProfile/OrganizationProfile';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { fetchOrganizationData } from '../../../lib/fetchOrganizationData';
import { OrgFormData } from '../../../utilities/organization/types';
import CreateOrganizationForm from '../../../components/Organization/CreateOrganization/CreateOrganizationForm';

interface Props {
  organizationData: OrgFormData | undefined;
}

export default function OrganizationAdmin({ organizationData }: Props) {
  console.log(organizationData);

  return (
    <Aux>
      <CreateOrganizationForm organizationData={organizationData} />
    </Aux>
  );
}

interface IParams extends ParsedUrlQuery {
  orgId: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { orgId } = context.params as IParams;
  let organizationData = undefined;
  organizationData = await fetchOrganizationData(orgId);
  return {
    props: {
      organizationData,
    },
  };
};
