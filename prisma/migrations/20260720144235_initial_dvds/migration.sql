-- CreateTable
CREATE TABLE "Dvd" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Dvd_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Dvd" ADD CONSTRAINT "Dvd_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
