#include <bits/stdc++.h>
#define maxn 1000003
#define maxc 1000000003

using namespace std;

int n, a[maxn], m, k, ans = 0;

int main()
{
    freopen("inp.txt", "r", stdin);
    freopen("out.txt", "w", stdout);
    int n;
    cin >> n >> k;
    for(int i=1; i<=n; i++)
        cin >> a[i];
    for(int i=1; i<=n;)
    {
        int pos = i;
        int sum = a[pos];
        while(sum <= k && pos <= n)
        {
            pos++;
            sum += a[pos];
        }
        i = pos;
        ans++;
      //  cout << pos << endl;
    }
    cout << ans;
}
