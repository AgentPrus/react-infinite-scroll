import { forwardRef } from "react";

export interface UserProps {
  firstName: string;
  lastName: string;
  image: string;
  id: number;
}

const UserCard = forwardRef<HTMLDivElement, UserProps>(
  ({ firstName, lastName, id, image }, ref) => {
    return (
      <div className="group relative" ref={ref}>
        <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
          <img
            src={image}
            alt={firstName + " " + lastName}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <h3 className="mt-6 text-sm text-gray-500">{firstName}</h3>
        <p className="text-base font-semibold text-gray-900">{lastName}</p>
      </div>
    );
  }
);

export default UserCard;
